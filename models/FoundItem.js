const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema(
  {
    finder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Electronics', 'Wallet', 'Keys', 'Bag', 'Documents', 'Jewellery', 'Clothing', 'Other'],
      required: true,
    },
    location: { type: String, required: true },
    dateFound: { type: Date, required: true },
    image: { type: String, default: '' },
    contactInfo: { type: String, default: '' },
    status: { type: String, enum: ['available', 'claimed', 'closed'], default: 'available' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoundItem', foundItemSchema);
