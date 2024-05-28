const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const Trade = require('../models/tradeModel');

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route for CSV file upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Parse CSV file and store data in MongoDB
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', async (data) => {
                try {
                    // Extract BaseCoin and QuoteCoin from Market
                    const market = data.Market.split('/');
                    data.BaseCoin = market[0];
                    data.QuoteCoin = market[1];
                    // Convert Buy/Sell Amount to a number
                    data.Amount = parseFloat(data['Buy/Sell Amount']);
                    // Convert Price to a number
                    data.Price = parseFloat(data.Price);
                    // Remove unnecessary fields
                    delete data['Buy/Sell Amount'];
                    // Create new Trade document
                    const trade = new Trade(data);
                    // Save the trade document
                    await trade.save();
                    results.push(trade);
                } catch (error) {
                    console.error('Error saving trade:', error.message);
                    res.status(500).json({ message: 'Error saving trade' });
                }
            })
            .on('end', async () => {
                try {
                    fs.unlinkSync(req.file.path); // Remove uploaded file
                    console.log('CSV data successfully uploaded:', results);
                    res.status(200).json({ message: 'CSV data successfully uploaded' });
                } catch (error) {
                    console.error('Error deleting file:', error.message);
                    res.status(500).json({ message: 'Error deleting file' });
                }
            });
    } catch (error) {
        console.error('Error uploading CSV:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// Endpoint for balance calculation
router.post('/balance', async (req, res) => {
    try {
        const { timestamp } = req.body;

        // Query MongoDB for trades before the given timestamp
        const trades = await Trade.find({ UTC_Time: { $lt: new Date(timestamp) } });

        // Calculate asset-wise balance
        const balance = {};
        trades.forEach((trade) => {
            if (trade.Operation === 'Buy') {
                balance[trade.BaseCoin] = (balance[trade.BaseCoin] || 0) + trade.Amount;
            } else if (trade.Operation === 'Sell') {
                balance[trade.BaseCoin] = (balance[trade.BaseCoin] || 0) - trade.Amount;
            }
        });

        res.status(200).json(balance);
    } catch (error) {
        console.error('Error calculating balance:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
