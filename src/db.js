const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const username = 'piyushraivds45';
        const password = encodeURIComponent('tpWxKf7tGqO3AVFZ'); // URL encode the password
        const dbURI = `mongodb+srv://${username}:${password}@cluster0.1jwtykc.mongodb.net/`;

        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;