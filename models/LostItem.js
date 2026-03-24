const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Electronics', 'Wallet', 'Keys', 'Bag', 'Documents', 'Jewellery', 'Clothing', 'Other'],
      required: true,
    },
    location: { type: String, required: true },
    dateLost: { type: Date, required: true },
    image: { type: String, default: '' },
    contactInfo: { type: String, default: '' },
    status: { type: String, enum: ['lost', 'found', 'closed'], default: 'lost' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LostItem', lostItemSchema);
