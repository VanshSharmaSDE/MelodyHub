const User = require('../models/User.js');
const Song = require('../models/Song.js');
const path = require('path');
const fs = require('fs');
const Playlist = require('../models/Playlist.js');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // Get user with playlists but exclude password
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'likedSongs',
        select: 'title artist album coverImage duration audioFile'
      })
      .populate({
        path: 'savedSongs',
        select: 'title artist album coverImage duration audioFile'
      });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    // Update profile data
    let profileData = { name, bio };
    
    // Handle profile image upload if provided
    if (req.files && req.files.profileImage) {
      const profileImage = req.files.profileImage;
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(profileImage.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a valid image file (JPEG, JPG or PNG)'
        });
      }
      
      // Create unique filename
      const fileName = `profile_${req.user.id}_${Date.now()}${path.parse(profileImage.name).ext}`;
      
      // Define paths for storage - directly in Backend/uploads
      const uploadsDir = path.join(__dirname, '../uploads');
      const profilesDir = path.join(uploadsDir, 'profiles');
      
      // Create directories if they don't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(profilesDir)) {
        fs.mkdirSync(profilesDir, { recursive: true });
      }
      
      const profilePath = path.join(profilesDir, fileName);
      console.log('Saving profile image to:', profilePath);
      
      // Move file
      await profileImage.mv(profilePath);
      
      // Define URL path with server URL for database
      const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
      const imageFileUrl = `${serverBaseUrl}/uploads/profiles/${fileName}`;
      
      // Update profile image path
      profileData.profileImage = imageFileUrl;
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      profileData,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Like/Unlike a song
// @route   PUT /api/user/songs/:songId/like
// @access  Private
const toggleLikeSong = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const songId = req.params.songId;
    
    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Check if song is already liked
    const songIndex = user.likedSongs.indexOf(songId);
    
    let liked = false;
    
    if (songIndex === -1) {
      // Add song to liked songs
      user.likedSongs.push(songId);
      liked = true;
      
      // Increase song likes counter
      song.likes += 1;
      await song.save();
    } else {
      // Remove song from liked songs
      user.likedSongs.splice(songIndex, 1);
      liked = false;
      
      // Decrease song likes counter
      if (song.likes > 0) {
        song.likes -= 1;
        await song.save();
      }
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      liked,
      likesCount: song.likes
    });
  } catch (error) {
    console.error('Error toggling song like:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Save/Remove song from library
// @route   PUT /api/user/songs/:songId/save
// @access  Private
const toggleSaveSong = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const songId = req.params.songId;
    
    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Check if song is already saved
    const songIndex = user.savedSongs.indexOf(songId);
    
    let saved = false;
    
    if (songIndex === -1) {
      // Add song to saved songs
      user.savedSongs.push(songId);
      saved = true;
    } else {
      // Remove song from saved songs
      user.savedSongs.splice(songIndex, 1);
      saved = false;
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      saved
    });
  } catch (error) {
    console.error('Error toggling saved song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create a playlist
// @route   POST /api/user/playlists
// @access  Private
const createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Create a new playlist
    const newPlaylist = {
      name,
      description: description || '',
      isPublic: isPublic !== undefined ? isPublic : true,
      songs: []
    };
    
    // Handle cover image upload if provided
    if (req.files && req.files.coverImage) {
      const coverImage = req.files.coverImage;
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(coverImage.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a valid image file (JPEG, JPG or PNG)'
        });
      }
      
      // Create unique filename
      const fileName = `playlist_${Date.now()}${path.parse(coverImage.name).ext}`;
      
      // Define paths for storage - directly in Backend/uploads
      const uploadsDir = path.join(__dirname, '../uploads');
      const playlistsDir = path.join(uploadsDir, 'playlists');
      
      // Create directories if they don't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(playlistsDir)) {
        fs.mkdirSync(playlistsDir, { recursive: true });
      }
      
      const imagePath = path.join(playlistsDir, fileName);
      
      // Move file
      await coverImage.mv(imagePath);
      
      // Define URL path with server URL for database
      const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
      const imageFileUrl = `${serverBaseUrl}/uploads/playlists/${fileName}`;
      
      // Set cover image path
      newPlaylist.coverImage = imageFileUrl;
    }
    
    // Add playlist to user
    user.playlists.push(newPlaylist);
    await user.save();
    
    res.status(201).json({
      success: true,
      data: user.playlists[user.playlists.length - 1]
    });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all user playlists
// @route   GET /api/user/playlists
// @access  Private
const getUserPlaylists = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('playlists');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      count: user.playlists.length,
      data: user.playlists
    });
  } catch (error) {
    console.error('Error getting playlists:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get a single playlist
// @route   GET /api/user/playlists/:playlistId
// @access  Private
const getPlaylistById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Find the playlist by ID
    const playlist = user.playlists.id(req.params.playlistId);
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Get full song details
    let playlistWithSongs = playlist.toObject();
    
    // Populate songs
    if (playlist.songs.length > 0) {
      const songs = await Song.find({
        _id: { $in: playlist.songs }
      }).select('title artist album genre duration coverImage audioFile likes');
      
      playlistWithSongs.songs = songs;
    }
    
    res.status(200).json({
      success: true,
      data: playlistWithSongs
    });
  } catch (error) {
    console.error('Error getting playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update a playlist
// @route   PUT /api/user/playlists/:playlistId
// @access  Private
const updatePlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Find the playlist by ID
    const playlist = user.playlists.id(req.params.playlistId);
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Update playlist fields
    if (name) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (isPublic !== undefined) playlist.isPublic = isPublic;
    
    // Handle cover image upload if provided
    if (req.files && req.files.coverImage) {
      const coverImage = req.files.coverImage;
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(coverImage.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a valid image file (JPEG, JPG or PNG)'
        });
      }
      
      // Create unique filename
      const fileName = `playlist_${Date.now()}${path.parse(coverImage.name).ext}`;
      
      // Define paths for storage - directly in Backend/uploads
      const uploadsDir = path.join(__dirname, '../uploads');
      const playlistsDir = path.join(uploadsDir, 'playlists');
      
      // Create directories if they don't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(playlistsDir)) {
        fs.mkdirSync(playlistsDir, { recursive: true });
      }
      
      const imagePath = path.join(playlistsDir, fileName);
      
      // Move file
      await coverImage.mv(imagePath);
      
      // Delete old cover image if it exists and isn't the default
      if (playlist.coverImage !== 'default-playlist.jpg') {
        try {
          // Extract relative path from URL (remove server base URL if present)
          const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
          const oldImageRelPath = playlist.coverImage.replace(serverBaseUrl, '');
          const oldImagePath = path.join(__dirname, '..', oldImageRelPath.replace(/^\//, ''));
          
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log('Deleted old image:', oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
      
      // Set cover image path with server URL
      const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
      const imageFileUrl = `${serverBaseUrl}/uploads/playlists/${fileName}`;
      playlist.coverImage = imageFileUrl;
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete a playlist
// @route   DELETE /api/user/playlists/:playlistId
// @access  Private
const deletePlaylist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Find the playlist by ID
    const playlist = user.playlists.id(req.params.playlistId);
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    // Delete cover image if it exists and isn't the default
    if (playlist.coverImage !== 'default-playlist.jpg') {
      try {
        // Extract relative path from URL (remove server base URL if present)
        const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
        const imageRelPath = playlist.coverImage.replace(serverBaseUrl, '');
        const imagePath = path.join(__dirname, '..', imageRelPath.replace(/^\//, ''));
        
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log('Deleted playlist image:', imagePath);
        }
      } catch (err) {
        console.error('Error deleting playlist image:', err);
      }
    }
    
    // Remove playlist from user
    playlist.remove();
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add song to playlist
// @route   PUT /api/user/playlists/:playlistId/songs/:songId
// @access  Private
const addSongToPlaylist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Find the playlist by ID
    const playlist = user.playlists.id(req.params.playlistId);
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    const songId = req.params.songId;
    
    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Check if song is already in playlist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: 'Song already in playlist'
      });
    }
    
    // Add song to playlist
    playlist.songs.push(songId);
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Remove song from playlist
// @route   DELETE /api/user/playlists/:playlistId/songs/:songId
// @access  Private
const removeSongFromPlaylist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Find the playlist by ID
    const playlist = user.playlists.id(req.params.playlistId);
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }
    
    const songId = req.params.songId;
    
    // Check if song is in playlist
    const songIndex = playlist.songs.indexOf(songId);
    
    if (songIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Song not in playlist'
      });
    }
    
    // Remove song from playlist
    playlist.songs.splice(songIndex, 1);
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Track recently played song
// @route   POST /api/user/songs/:songId/play
// @access  Private
const trackPlayedSong = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const songId = req.params.songId;
    
    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Remove song from recently played if it exists
    user.recentlyPlayed = user.recentlyPlayed.filter(
      played => played.song.toString() !== songId
    );
    
    // Add song to recently played
    user.recentlyPlayed.unshift({
      song: songId,
      playedAt: Date.now()
    });
    
    // Keep only the last 20 songs
    if (user.recentlyPlayed.length > 20) {
      user.recentlyPlayed = user.recentlyPlayed.slice(0, 20);
    }
    
    await user.save();
    
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Error tracking played song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get recently played songs
// @route   GET /api/user/songs/recently-played
// @access  Private
const getRecentlyPlayed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'recentlyPlayed.song',
        select: 'title artist album coverImage duration audioFile'
      });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      count: user.recentlyPlayed.length,
      data: user.recentlyPlayed
    });
  } catch (error) {
    console.error('Error getting recently played songs:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Download song
// @route   GET /api/user/songs/:songId/download
// @access  Private
const downloadSong = async (req, res) => {
  try {
    const songId = req.params.songId;
    
    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Get file path - parse URL to get local path
    const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
    const audioRelPath = song.audioFile.replace(serverBaseUrl, '');
    const filePath = path.join(__dirname, '..', audioRelPath.replace(/^\//, ''));
    
    // Add to user's download history
    const user = await User.findById(req.user.id);
    if (user) {
      user.downloadHistory.push({
        song: songId,
        downloadedAt: Date.now()
      });
      
      // Keep only the last 50 downloads
      if (user.downloadHistory.length > 50) {
        user.downloadHistory = user.downloadHistory.slice(-50);
      }
      
      await user.save();
    }
    
    // Check if song file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Song file not found'
      });
    }
    
    // Create filename for download
    const fileName = `${song.artist} - ${song.title}${path.extname(filePath)}`;
    
    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    
    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all songs (for browsing)
// @route   GET /api/user/songs
// @access  Private
const getAllSongs = async (req, res) => {
  try {
    // Add pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    
    // Add filters
    let filterOptions = {};
    
    if (req.query.genre) {
      filterOptions.genre = req.query.genre;
    }
    
    // Count total songs
    const total = await Song.countDocuments(filterOptions);
    
    // Get songs
    const songs = await Song.find(filterOptions)
      .select('title artist album genre coverImage duration audioFile likes')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);
    
    // Add pagination metadata
    const pagination = {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit
    };
    
    res.status(200).json({
      success: true,
      count: songs.length,
      pagination,
      data: songs
    });
  } catch (error) {
    console.error('Error getting songs:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Search songs
// @route   GET /api/user/songs/search
// @access  Private
const searchSongs = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }
    
    // Search songs
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } }
      ]
    }).select('title artist album genre coverImage duration audioFile likes');
    
    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    console.error('Error searching songs:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all default playlists
// @route   GET /api/user/playlists/default
// @access  Private
const getDefaultPlaylists = async (req, res) => {
  try {
    // Find all default playlists that are public
    const defaultPlaylists = await Playlist.find({ 
      isDefault: true, 
      isPublic: true 
    }).populate({
      path: 'songs',
      select: 'title artist album coverImage duration'
    });
    
    res.status(200).json({
      success: true,
      count: defaultPlaylists.length,
      data: defaultPlaylists
    });
  } catch (error) {
    console.error('Error getting default playlists:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get default playlist by ID
// @route   GET /api/user/playlists/default/:id
// @access  Private
const getDefaultPlaylistById = async (req, res) => {
  try {
    // Find default playlist by ID and ensure it's public
    const playlist = await Playlist.findOne({ 
      _id: req.params.id,
      isDefault: true,
      isPublic: true
    }).populate({
      path: 'songs',
      select: 'title artist album coverImage duration audioFile'
    });
    
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Default playlist not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (error) {
    console.error('Error getting default playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
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
};