const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Route imports
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const playlistRoutes = require('./routes/playlistRoutes.js');
const generalRoutes = require('./routes/generalRoutes.js');

// Admin initialization
const createAdminUser = require('./config/createAdmin.js');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5177',
  credentials: true
}));

// Set static folder for uploaded files
app.use(express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/public', playlistRoutes);
app.use('/api/general', generalRoutes);

// Special route for serving uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In your app.js or server.js
const fileUpload = require('express-fileupload');

// Add this before your routes
app.use(fileUpload({
  useTempFiles: false, // Set this to false since we're using the buffer directly
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB for audio files
}));

const url = process.env.BACKEND_URL; // Replace with your Render URL
const interval = 600000; // Interval in milliseconds (10 minutes)

//Pinging server
function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(Reloaded at ${new Date().toISOString()}: Status Code ${response.status});
    })
    .catch(error => {
      console.error(Error reloading at ${new Date().toISOString()}:, error.message);
    });
}

setInterval(reloadWebsite, interval);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hubmelody1:dh6E4asbRVyzj2qI@cluster0.uejjx3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/musicify';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Create admin user on startup
    createAdminUser();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
