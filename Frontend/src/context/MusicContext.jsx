import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  
  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user profile with liked and saved songs
        const profileRes = await api.get('/user/profile');
        setLikedSongs(profileRes.data.data.likedSongs || []);
        setSavedSongs(profileRes.data.data.savedSongs || []);
        
        // Get playlists
        const playlistsRes = await api.get('/user/playlists');
        setPlaylists(playlistsRes.data.data);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Play a song and create a queue from the provided list
  const playSong = (song, songsList = []) => {
    // Set current song
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Create queue
    if (songsList.length > 0) {
      // Filter out the current song from the list
      const filteredList = songsList.filter(s => s._id !== song._id);
      // Add the current song to the beginning
      setQueue([song, ...filteredList]);
    } else {
      setQueue([song]);
    }
  };
  
  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        queue,
        setQueue,
        isPlaying,
        setIsPlaying,
        likedSongs,
        setLikedSongs,
        savedSongs,
        setSavedSongs,
        playlists,
        setPlaylists,
        playSong
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};