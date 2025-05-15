const User = require('../models/User.js');
const Song = require('../models/Song.js');
const path = require('path');
const fs = require('fs');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all songs
// @route   GET /api/admin/songs
// @access  Private/Admin
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate('createdBy', 'name email');
    
    res.status(200).json({
      success: true,
      count: songs.length,
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

// @desc    Get song by ID
// @route   GET /api/admin/songs/:id
// @access  Private/Admin
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Error getting song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Upload song
// @route   POST /api/admin/songs
// @access  Private/Admin
const uploadSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.coverImage) {
      return res.status(400).json({
        success: false,
        message: 'Please upload audio file and cover image'
      });
    }
    
    const { audioFile, coverImage } = req.files;
    const { title, artist, album, genre, releaseYear, duration } = req.body;
    
    // Check file types
    const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    if (!allowedAudioTypes.includes(audioFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid audio file (MP3 or WAV)'
      });
    }
    
    if (!allowedImageTypes.includes(coverImage.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid image file (JPEG, JPG or PNG)'
      });
    }
    
    // Create unique filenames
    const audioFileName = `song_${Date.now()}_${path.parse(audioFile.name).name}${path.parse(audioFile.name).ext}`;
    const imageFileName = `cover_${Date.now()}_${path.parse(coverImage.name).name}${path.parse(coverImage.name).ext}`;
    
    // Define paths for storage - directly in Backend/uploads
    const uploadsDir = path.join(__dirname, '../uploads');
    const musicDir = path.join(uploadsDir, 'music');
    const coversDir = path.join(uploadsDir, 'covers');
    
    // Create directories if they don't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(musicDir)) {
      fs.mkdirSync(musicDir, { recursive: true });
    }
    if (!fs.existsSync(coversDir)) {
      fs.mkdirSync(coversDir, { recursive: true });
    }
    
    const audioPath = path.join(musicDir, audioFileName);
    const imagePath = path.join(coversDir, imageFileName);
    
    console.log('Saving audio to:', audioPath);
    console.log('Saving image to:', imagePath);
    
    // Move files
    await audioFile.mv(audioPath);
    await coverImage.mv(imagePath);
    
    // Define URL paths with server URL for database
    const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
    const audioFileUrl = `${serverBaseUrl}/uploads/music/${audioFileName}`;
    const imageFileUrl = `${serverBaseUrl}/uploads/covers/${imageFileName}`;
    
    // Create song in database
    const song = await Song.create({
      title,
      artist,
      album,
      genre,
      releaseYear: parseInt(releaseYear),
      duration: parseInt(duration),
      coverImage: imageFileUrl,
      audioFile: audioFileUrl,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Error uploading song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update song
// @route   PUT /api/admin/songs/:id
// @access  Private/Admin
const updateSong = async (req, res) => {
  try {
    let song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Update basic song details
    const { title, artist, album, genre, releaseYear, isPublic } = req.body;
    
    const updatedSongData = {
      title: title || song.title,
      artist: artist || song.artist,
      album: album || song.album,
      genre: genre || song.genre,
      releaseYear: releaseYear ? parseInt(releaseYear) : song.releaseYear,
      isPublic: isPublic !== undefined ? isPublic : song.isPublic
    };
    
    // Handle cover image update if provided
    if (req.files && req.files.coverImage) {
      const coverImage = req.files.coverImage;
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      
      if (!allowedImageTypes.includes(coverImage.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a valid image file (JPEG, JPG or PNG)'
        });
      }
      
      // Create unique filename
      const imageFileName = `cover_${Date.now()}_${path.parse(coverImage.name).name}${path.parse(coverImage.name).ext}`;
      
      // Define paths for storage - directly in Backend/uploads
      const uploadsDir = path.join(__dirname, '../uploads');
      const coversDir = path.join(uploadsDir, 'covers');
      
      // Create directories if they don't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(coversDir)) {
        fs.mkdirSync(coversDir, { recursive: true });
      }
      
      const imagePath = path.join(coversDir, imageFileName);
      console.log('Saving updated image to:', imagePath);
      
      // Move file
      await coverImage.mv(imagePath);
      
      // Define URL path with server URL for database
      const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
      const imageFileUrl = `${serverBaseUrl}/uploads/covers/${imageFileName}`;
      updatedSongData.coverImage = imageFileUrl;
      
      // Delete old cover image if it exists and isn't the default
      if (!song.coverImage.includes('default-cover.jpg')) {
        try {
          const oldImagePath = path.join(__dirname, '..', song.coverImage.replace(/^\//, ''));
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log('Deleted old image:', oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
    }
    
    // Update song in database
    song = await Song.findByIdAndUpdate(
      req.params.id,
      updatedSongData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete song
// @route   DELETE /api/admin/songs/:id
// @access  Private/Admin
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }
    
    // Construct full file system paths using the paths stored in database
    const audioPath = path.join(__dirname, '..', song.audioFile.replace(/^\//, ''));
    const imagePath = path.join(__dirname, '..', song.coverImage.replace(/^\//, ''));
    
    console.log('Deleting audio file:', audioPath);
    console.log('Deleting image file:', imagePath);
    
    // Delete the files if they exist
    try {
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
      
      if (fs.existsSync(imagePath) && !imagePath.includes('default-cover.jpg')) {
        fs.unlinkSync(imagePath);
      }
    } catch (err) {
      console.error('Error deleting files:', err);
    }
    
    // Delete song from database
    await Song.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSongs = await Song.countDocuments();
    
    // Get user registrations by date (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const userRegistrations = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Get songs by genre
    const songsByGenre = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalSongs,
        userRegistrations,
        songsByGenre
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllSongs,
  getSongById,
  uploadSong,
  updateSong,
  deleteSong,
  getDashboardStats
};