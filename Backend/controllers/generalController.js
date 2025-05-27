const User = require('../models/User.js');
const Song = require('../models/Song.js');
const generateFakeUsers = require('../utils/generateFakeUsers.js');

// @desc    Health check for API
// @route   GET /api/health
// @access  Public
const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date()
  });
};

// @desc    Seed database with fake users
// @route   POST /api/seed/users
// @access  Private/Admin
const seedUsers = async (req, res) => {
  try {
    // Only allow in development environment
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Seeding not allowed in production'
      });
    }
    
    const count = parseInt(req.body.count) || 10;
    const users = generateFakeUsers(count);
    
    // Insert users into database
    await User.insertMany(users);
    
    res.status(201).json({
      success: true,
      message: `${count} fake users created successfully`
    });
  } catch (error) {
    console.error('Error seeding users:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get quick stats for showcase
// @route   GET /api/stats/quick
// @access  Public
const getQuickStats = async (req, res) => {
  try {
    // Get counts from database
    const userCount = await User.countDocuments();
    const songCount = await Song.countDocuments();
    
    // Get most popular genres (limit to top 5)
    const popularGenres = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get recent users (limit to 5)
    const recentUsers = await User.find()
      .select('name createdAt')
      .sort('-createdAt')
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        stats: {
          users: userCount,
          songs: songCount
        },
        popularGenres,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Error getting quick stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  healthCheck,
  seedUsers,
  getQuickStats
};
