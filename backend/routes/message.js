const express = require('express');
const router = express.Router();
const { Message } = require('../models/message');

// GET all messages
router.get('/retrieve', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a message
router.post('/post', async (req, res) => {
	const {content, sender} = req.body;

    const newMessageData = {
        content, sender
    };
    const newMessage = await Message.create(newMessageData);
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
