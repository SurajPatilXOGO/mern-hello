const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Fetch or Create a message
router.get("/", async (req, res) => {
  let message = await Message.findOne();
  if (!message) {
    message = new Message({ text: "Hello from MongoDB!" });
    await message.save();
  }
  res.json({ message: message.text });
});

module.exports = router;
