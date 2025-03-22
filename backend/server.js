const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000; // Ensure it matches frontend requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
