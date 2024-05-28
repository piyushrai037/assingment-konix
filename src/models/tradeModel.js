const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    User_ID: { type: String }, // Add User_ID field
    UTC_Time: { type: Date, required: true },
    Operation: { type: String, enum: ['Buy', 'Sell'], required: true },
    Market: { type: String, required: true },
    BaseCoin: { type: String, required: true },
    QuoteCoin: { type: String, required: true },
    Amount: { type: Number, required: true },
    Price: { type: Number, required: true }
});

// Pre-save hook to extract BaseCoin and QuoteCoin from Market
tradeSchema.pre('save', function(next) {
    const market = this.Market.split('/');
    this.BaseCoin = market[0];
    this.QuoteCoin = market[1];
    next();
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
