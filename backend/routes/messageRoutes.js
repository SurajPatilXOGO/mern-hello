const express = require("express");
const Message = require("../models/message"); // Ensure case matches exactly
const router = express.Router();

// Fetch or Create a message
router.get("/", async (req, res) => {
  try {
    let message = await Message.findOne();
    if (!message) {
      message = new Message({ text: "Hello from MongoDB!" });
      await message.save();
    }
    res.json({ message: message.text });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
