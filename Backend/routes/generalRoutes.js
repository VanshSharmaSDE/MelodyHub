const express = require('express');
const {
  getAllSongs,
} = require('../controllers/userController.js');
const { protect, authorize } = require('../middleware/auth.js');
const { healthCheck, seedUsers, getQuickStats } = require('../controllers/generalController.js');

const router = express.Router();

// Public routes for general access
router.route('/songs')
  .get(getAllSongs);

// Public routes
router.get('/health', healthCheck);
router.get('/stats/quick', getQuickStats);

// Admin only routes - protected
router.post('/seed/users', protect, authorize('admin'), seedUsers);

module.exports = router;