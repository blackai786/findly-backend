const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// ==================== LOST ITEMS ====================

// @desc    Report a lost item
// @route   POST /api/items/lost
const reportLostItem = async (req, res) => {
  const { title, description, category, location, dateLost, contactInfo } = req.body;
  const image = req.file ? req.file.filename : '';
  try {
    const item = await LostItem.create({
      owner: req.user._id,
      title,
      description,
      category,
      location,
      dateLost,
      contactInfo,
      image,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all lost items (with filters)
// @route   GET /api/items/lost
const getLostItems = async (req, res) => {
  const { category, location, search } = req.query;
  let query = {};
  if (category) query.category = category;
  if (location) query.location = { $regex: location, $options: 'i' };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  try {
    const items = await LostItem.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lost item by ID
// @route   GET /api/items/lost/:id
const getLostItemById = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id).populate('owner', 'name email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lost item status
// @route   PUT /api/items/lost/:id
const updateLostItemStatus = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }
    item.status = req.body.status || item.status;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's lost items
// @route   GET /api/items/lost/my
const getMyLostItems = async (req, res) => {
  try {
    const items = await LostItem.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== FOUND ITEMS ====================

// @desc    Report a found item
// @route   POST /api/items/found
const reportFoundItem = async (req, res) => {
  const { title, description, category, location, dateFound, contactInfo } = req.body;
  const image = req.file ? req.file.filename : '';
  try {
    const item = await FoundItem.create({
      finder: req.user._id,
      title,
      description,
      category,
      location,
      dateFound,
      contactInfo,
      image,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all found items (with filters)
// @route   GET /api/items/found
const getFoundItems = async (req, res) => {
  const { category, location, search } = req.query;
  let query = {};
  if (category) query.category = category;
  if (location) query.location = { $regex: location, $options: 'i' };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  try {
    const items = await FoundItem.find(query)
      .populate('finder', 'name email')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single found item by ID
// @route   GET /api/items/found/:id
const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id).populate('finder', 'name email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's found items
// @route   GET /api/items/found/my
const getMyFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find({ finder: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  reportLostItem,
  getLostItems,
  getLostItemById,
  updateLostItemStatus,
  getMyLostItems,
  reportFoundItem,
  getFoundItems,
  getFoundItemById,
  getMyFoundItems,
};
