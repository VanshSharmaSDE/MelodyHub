const express = require('express');
const { protect } = require('../middleware/auth.js');
const fileUpload = require('express-fileupload');
const {
  getUserProfile,
  updateUserProfile,
  toggleLikeSong,
  toggleSaveSong,
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  trackPlayedSong,
  getRecentlyPlayed,
  downloadSong,
  getAllSongs,
  searchSongs,
  getDefaultPlaylists,
  getDefaultPlaylistById
} = require('../controllers/userController.js');

const router = express.Router();

// Use file upload middleware
router.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max file size
}));

// All routes in this file are protected
router.use(protect);

// User profile routes
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

// Song interaction routes
router.route('/songs')
  .get(getAllSongs);

router.route('/songs/search')
  .get(searchSongs);

router.route('/songs/recently-played')
  .get(getRecentlyPlayed);

router.route('/songs/:songId/like')
  .put(toggleLikeSong);

router.route('/songs/:songId/save')
  .put(toggleSaveSong);

router.route('/songs/:songId/play')
  .post(trackPlayedSong);

router.route('/songs/:songId/download')
  .get(downloadSong);

// Playlist routes
router.route('/playlists')
  .get(getUserPlaylists)
  .post(createPlaylist);

router.route('/playlists/:playlistId')
  .get(getPlaylistById)
  .put(updatePlaylist)
  .delete(deletePlaylist);

router.route('/playlists/:playlistId/songs/:songId')
  .put(addSongToPlaylist)
  .delete(removeSongFromPlaylist);


module.exports = router;