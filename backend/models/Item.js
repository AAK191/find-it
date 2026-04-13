const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Books', 'Clothing', 'Keys', 'Wallet', 'Other']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  locationFound: {
    type: String,
    required: [true, 'Location found is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image is required']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);