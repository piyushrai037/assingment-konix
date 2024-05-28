const express = require('express');
const connectDB = require('./db');
const tradeRoutes = require('./routes/tradeRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/trades', tradeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
