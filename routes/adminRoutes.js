const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getStats,
  getAllUsers,
  deleteUser,
  getAllLostItems,
  getAllFoundItems,
  deleteItem,
} = require('../controllers/adminController');

// All admin routes are protected
router.use(protect, adminOnly);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/lost', getAllLostItems);
router.get('/found', getAllFoundItems);
router.delete('/items/:type/:id', deleteItem);

module.exports = router;
