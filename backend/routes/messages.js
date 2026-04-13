const express = require('express');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// @route    POST /api/messages/
// @desc     Send message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { itemId, message } = req.body;

    if (!itemId || !message) {
      return res.status(400).json({ message: 'Item ID and message are required' });
    }

    const newMessage = new Message({
      itemId,
      senderId: req.user.id,
      message
    });

    await newMessage.save();
    await newMessage.populate('senderId', 'name');

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: newMessage 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route    GET /api/messages/item/:itemId
// @desc     Get all messages for an item
router.get('/item/:itemId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ itemId: req.params.itemId })
      .populate('senderId', 'name')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;