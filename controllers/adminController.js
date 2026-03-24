const User = require('../models/User');
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// @desc    Get platform statistics
// @route   GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalLost = await LostItem.countDocuments();
    const totalFound = await FoundItem.countDocuments();
    const recovered = await LostItem.countDocuments({ status: 'found' });
    res.json({ totalUsers, totalLost, totalFound, recovered });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all lost items (admin)
// @route   GET /api/admin/lost
const getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().populate('owner', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all found items (admin)
// @route   GET /api/admin/found
const getAllFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().populate('finder', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an item (lost or found)
// @route   DELETE /api/admin/items/:type/:id
const deleteItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    if (type === 'lost') {
      await LostItem.findByIdAndDelete(id);
    } else {
      await FoundItem.findByIdAndDelete(id);
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats, getAllUsers, deleteUser, getAllLostItems, getAllFoundItems, deleteItem };
