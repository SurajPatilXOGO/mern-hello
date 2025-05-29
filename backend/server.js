const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config(); // Ensure .env is loaded

const app = express();

// Connect to DB only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}
app.use(cors());
app.use(express.json());

app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 10000;
// Start server only if not in test environment or if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else {
  // If in test, we might need to load .env here if not already done
  // or ensure test setup handles env variables.
  // For now, assuming dotenv.config() at the top is sufficient.
}

module.exports = app; // Export the app
