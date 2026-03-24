const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const {
  reportLostItem,
  getLostItems,
  getLostItemById,
  updateLostItemStatus,
  getMyLostItems,
  reportFoundItem,
  getFoundItems,
  getFoundItemById,
  getMyFoundItems,
} = require('../controllers/itemController');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// ---- LOST ITEM ROUTES ----
router.get('/lost', getLostItems);
router.get('/lost/my', protect, getMyLostItems);
router.get('/lost/:id', getLostItemById);
router.post('/lost', protect, upload.single('image'), reportLostItem);
router.put('/lost/:id', protect, updateLostItemStatus);

// ---- FOUND ITEM ROUTES ----
router.get('/found', getFoundItems);
router.get('/found/my', protect, getMyFoundItems);
router.get('/found/:id', getFoundItemById);
router.post('/found', protect, upload.single('image'), reportFoundItem);

module.exports = router;
