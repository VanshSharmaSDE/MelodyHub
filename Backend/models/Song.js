const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  artist: {
    type: String,
    required: [true, 'Please add an artist name'],
    trim: true,
    maxlength: [100, 'Artist name cannot be more than 100 characters']
  },
  album: {
    type: String,
    trim: true,
    maxlength: [100, 'Album name cannot be more than 100 characters']
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre'],
    enum: ['pop', 'rock', 'hip-hop', 'jazz', 'classical', 'electronic', 'other']
  },
  duration: {
    type: Number,
    required: [true, 'Please add song duration in seconds']
  },
  releaseYear: {
    type: Number,
    min: [1900, 'Release year must be 1900 or later'],
    max: [new Date().getFullYear(), 'Release year cannot be in the future']
  },
  coverImage: {
    type: String,
    default: 'default-cover.jpg'
  },
  audioFile: {
    type: String,
    required: [true, 'Please upload an audio file']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  cloudinaryImageId: { type: String },
  cloudinaryAudioId: { type: String },
});

// Update the updatedAt field before saving
SongSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Song', SongSchema);