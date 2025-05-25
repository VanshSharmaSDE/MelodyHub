const express = require('express');
const {
  getAllSongs,
} = require('../controllers/userController.js');

const router = express.Router();

// Public routes for general access
router.route('/songs')
  .get(getAllSongs);

module.exports = router;