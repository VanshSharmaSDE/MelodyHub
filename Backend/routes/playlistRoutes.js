const express = require('express');
const { protect } = require('../middleware/auth.js');
const { 
  getDefaultPlaylists,
  getDefaultPlaylistById 
} = require('../controllers/userController.js');

const router = express.Router();

// Apply authentication middleware
router.use(protect);

// Default playlist routes
router.route('/playlists/default')
  .get(getDefaultPlaylists);

router.route('/playlists/default/:id')
  .get(getDefaultPlaylistById);

module.exports = router;
