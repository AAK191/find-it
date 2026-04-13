const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Configure multer for memory storage (for cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @route    GET /api/items/
// @desc     Get all items with search
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { locationFound: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await Item.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route    POST /api/items/
// @desc     Create new item
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const item = new Item({
      ...req.body,
      imageUrl: result.secure_url,
      uploadedBy: req.user.id
    });

    const createdItem = await item.save();
    await createdItem.populate('uploadedBy', 'name');

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route    GET /api/items/:id
// @desc     Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('uploadedBy', 'name');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;