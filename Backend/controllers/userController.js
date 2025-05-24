const User = require('../models/User.js');
const Song = require('../models/Song.js');
const path = require('path');
const fs = require('fs');
const Playlist = require('../models/Playlist.js');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dauh5uusc",
  api_key: "665827431275633",
  api_secret: "jfWbBiYmdpX8116P608EUBtYwG4"
});

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

      // Upload profile image to Cloudinary using streaming upload
      const imageResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'melodyhub/profiles',
            public_id: `profile_${req.user.id}_${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary profile image upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(profileImage.data);
      });

      console.log('Profile image uploaded successfully:', imageResult.secure_url);

      // Delete old profile image from Cloudinary if exists
      if (req.user.cloudinaryProfileId) {
        try {
          await cloudinary.uploader.destroy(req.user.cloudinaryProfileId);
          console.log('Old profile image deleted from Cloudinary');
        } catch (err) {
          console.error('Error deleting old profile image from Cloudinary:', err);
        }
      }

      // Update profile data with Cloudinary URL
      profileData.profileImage = imageResult.secure_url;
      profileData.cloudinaryProfileId = imageResult.public_id;
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

      // Upload cover image to Cloudinary using streaming upload
      const imageResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'melodyhub/playlists',
            public_id: `playlist_${Date.now()}_${path.parse(coverImage.name).name}`,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary image upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(coverImage.data);
      });

      console.log('Playlist cover image uploaded successfully:', imageResult.secure_url);

      // Set cover image metadata
      newPlaylist.coverImage = imageResult.secure_url;
      newPlaylist.cloudinaryImageId = imageResult.public_id;
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

      // Upload cover image to Cloudinary using streaming upload
      const imageResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'melodyhub/playlists',
            public_id: `playlist_${Date.now()}_${path.parse(coverImage.name).name}`,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary image upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(coverImage.data);
      });

      console.log('Playlist cover image uploaded successfully:', imageResult.secure_url);

      // Delete old cover image from Cloudinary if it exists
      if (playlist.cloudinaryImageId) {
        try {
          await cloudinary.uploader.destroy(playlist.cloudinaryImageId);
          console.log('Old playlist cover image deleted from Cloudinary');
        } catch (err) {
          console.error('Error deleting old image from Cloudinary:', err);
        }
      }

      // Update cover image metadata
      playlist.coverImage = imageResult.secure_url;
      playlist.cloudinaryImageId = imageResult.public_id;
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

    // Delete cover image from Cloudinary if it exists
    if (playlist.cloudinaryImageId) {
      try {
        await cloudinary.uploader.destroy(playlist.cloudinaryImageId);
        console.log('Playlist cover image deleted from Cloudinary');
      } catch (err) {
        console.error('Error deleting playlist cover image from Cloudinary:', err);
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

    // For Cloudinary URLs, redirect to the audio file
    // This way we don't have to download and re-serve the file
    res.redirect(song.audioFile);
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