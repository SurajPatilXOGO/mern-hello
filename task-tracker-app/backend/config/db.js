const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables if not already loaded (e.g., if running this file directly)
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // Mongoose 6 and later have these as default, but including them doesn't hurt
            // useNewUrlParser: true, 
            // useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
