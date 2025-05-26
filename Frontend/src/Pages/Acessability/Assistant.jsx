import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Fade,
  Zoom,
  Chip,
  Badge,
  Divider,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  ChatBubble as ChatBubbleIcon,
  Close as CloseIcon,
  Send as SendIcon,
  QuestionAnswer as QuestionAnswerIcon,
  SmartToy as SmartToyIcon,
  MusicNote as MusicNoteIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m MelodyBot, your music assistant powered by Google Gemini AI. How can I help you with MelodyHub today?',
      time: new Date()
    }
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState(null);

  // Gemini API key - In production, this should be stored securely
  // const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; 

  // For development purposes only - in production this must be secured
  const GEMINI_API_KEY = 'AIzaSyDg2LlMZcs68I8kP_HERUA7gL6DP5IJ-iI'; // Replace with your actual API key

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initial suggestions
  const initialSuggestions = [
    "How do I create a playlist?",
    "Can I listen to music offline?",
    "What subscription plans are available?",
    "How can I see song lyrics?"
  ];

  useEffect(() => {
    // Set initial suggestions
    setSuggestions(initialSuggestions);
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Update unread count when chat is closed
  useEffect(() => {
    if (!open && messages.length > 0 && messages[messages.length - 1].type === 'bot' && hasInteracted) {
      setUnreadCount(prevCount => prevCount + 1);
    }
  }, [messages, open, hasInteracted]);

  // Clear unread count when chat is opened
  useEffect(() => {
    if (open) {
      setUnreadCount(0);
    }
  }, [open]);

  // Focus input when chat is opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [open]);

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Toggle chat window
  const toggleChat = () => {
    setOpen(!open);
    if (!open) {
      setUnreadCount(0);
    }
  };

  // Call Gemini API for responses
  const getGeminiResponse = async (userQuery, chatHistory) => {
    try {
      // Format the conversation history for context
      const conversationContext = chatHistory
        .map(msg => `${msg.type === 'user' ? 'User: ' : 'Assistant: '}${msg.content}`)
        .join('\n');

      // System prompt to guide Gemini's responses
      const systemPrompt = `
        You are MelodyBot, an AI assistant for the music streaming application called MelodyHub.
        
        About MelodyHub:
        - MelodyHub is a music streaming platform similar to Spotify or Apple Music
        - It offers features like playlists, offline listening, high-quality audio, lyrics display
        - It has a free tier with ads and premium subscription options
        - The app is available on mobile and desktop platforms
        - Users can create playlists, follow artists, and discover new music
        
        Your task is to:
        - Answer user questions about MelodyHub's features and functionality
        - Provide helpful guidance on using the application
        - Be friendly, concise, and accurate in your responses
        - If you don't know something specific about MelodyHub, provide a reasonable answer based on how similar music streaming services work
        - Keep responses focused on MelodyHub and music streaming
        
        Here's the conversation so far:
        ${conversationContext}
        
        User: ${userQuery}
        Assistant:
      `;

      // Prepare the API request
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Extract the generated text from the response
      const generatedText = data.candidates[0].content.parts[0].text;

      return generatedText.trim();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setError("Sorry, I'm having trouble connecting to my knowledge base. Please try again later.");
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  // Generate suggestions from Gemini
  const generateSuggestions = async (userQuery) => {
    try {
      // Use Gemini to generate relevant follow-up questions
      const prompt = `
        Based on this user question about MelodyHub music streaming app: "${userQuery}"
        
        Generate 3 short, related follow-up questions that the user might want to ask next.
        Each question should be concise and directly related to MelodyHub's features or functionality.
        
        Return ONLY the questions with no additional text, one per line.
        Each question should be less than 60 characters.
      `;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const suggestionsText = data.candidates[0].content.parts[0].text;

      // Split the response into individual suggestions
      const generatedSuggestions = suggestionsText
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^\d+\.\s*/, '').trim()) // Remove numbering if present
        .slice(0, 3); // Take up to 3 suggestions

      setSuggestions(generatedSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      // Fallback to default suggestions if there's an error
      setSuggestions(initialSuggestions);
      setShowSuggestions(true);
    }
  };

  // Handle message submission
  const handleSubmit = async () => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      time: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setHasInteracted(true);

    // Clear input and show loading
    setQuery('');
    setLoading(true);
    setSuggestions([]);
    setError(null);

    try {
      // Get response from Gemini API
      const recentMessages = messages.slice(-6); // Use last 6 messages for context
      const answer = await getGeminiResponse(userMessage.content, recentMessages);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: answer,
        time: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Generate new suggestions based on the conversation
      await generateSuggestions(userMessage.content);
    } catch (err) {
      console.error("Error in chat flow:", err);
      setError("Sorry, something went wrong. Please try again.");

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        time: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle keydown in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Handle clicking on a suggested question
  const handleSuggestionClick = async (suggestion) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: suggestion,
      time: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setHasInteracted(true);

    // Show loading
    setLoading(true);
    setSuggestions([]);
    setError(null);

    try {
      // Get response from Gemini API
      const recentMessages = messages.slice(-6); // Use last 6 messages for context
      const answer = await getGeminiResponse(suggestion, recentMessages);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: answer,
        time: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Generate new suggestions
      await generateSuggestions(suggestion);
    } catch (err) {
      console.error("Error in suggestion flow:", err);
      setError("Sorry, something went wrong. Please try again.");

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        time: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <IconButton
          aria-label="Chat Assistant"
          onClick={toggleChat}
          sx={{
            backgroundColor: '#1DB954',
            color: 'white',
            width: 60,
            height: 60,
            boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
            '&:hover': {
              backgroundColor: '#19a74a',
            },
            transition: 'all 0.3s ease'
          }}
        >
          {open ? (
            <CloseIcon fontSize="medium" />
          ) : (
            <Badge badgeContent={unreadCount} color="error" overlap="circular">
              <ChatBubbleIcon fontSize="medium" />
            </Badge>
          )}
        </IconButton>
      </Box>

      {/* Chat window */}
      <Fade in={open}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            width: { xs: 'calc(100% - 48px)', sm: 380 },
            maxWidth: { xs: 'calc(100% - 48px)', sm: 380 },
            height: 480,
            maxHeight: 'calc(100vh - 120px)',
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            backgroundColor: '#212121',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#1e1e1e',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'rgba(29, 185, 84, 0.2)',
                color: '#1DB954',
                mr: 1.5,
              }}
            >
              <SmartToyIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                MelodyBot
              </Typography>
              <Typography variant="caption" sx={{ color: '#1DB954' }}>
                Powered by Google Gemini AI
              </Typography>
            </Box>
            <IconButton size="small" onClick={toggleChat} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Chat messages */}
          <Box
            ref={chatContainerRef}
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              backgroundColor: '#212121',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  flexDirection: message.type === 'bot' ? 'row' : 'row-reverse',
                  alignItems: 'flex-start',
                  maxWidth: '100%',
                }}
              >
                {message.type === 'bot' && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: message.isError ? 'rgba(244, 67, 54, 0.2)' : 'rgba(29, 185, 84, 0.2)',
                      color: message.isError ? '#f44336' : '#1DB954',
                      mt: 0.5,
                      mr: 1,
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <Box
                  sx={{
                    backgroundColor: message.type === 'bot'
                      ? message.isError ? 'rgba(244, 67, 54, 0.1)' : 'rgba(29, 185, 84, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                    p: 1.5,
                    maxWidth: '75%',
                    position: 'relative',
                    borderTopLeftRadius: message.type === 'bot' ? 0 : 2,
                    borderTopRightRadius: message.type === 'user' ? 0 : 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      display: 'block',
                      textAlign: message.type === 'user' ? 'right' : 'left',
                      mt: 0.5
                    }}
                  >
                    {formatTime(message.time)}
                  </Typography>
                </Box>
                {message.type === 'user' && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#2c2c2c',
                      color: 'white',
                      mt: 0.5,
                      ml: 1,
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Box>
            ))}

            {/* Loading indicator */}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: 'rgba(29, 185, 84, 0.1)',
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    maxWidth: '75%',
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.6 },
                      '50%': { opacity: 1 },
                      '100%': { opacity: 0.6 }
                    }
                  }}
                >
                  <CircularProgress size={16} sx={{ color: '#1DB954' }} />
                  <Typography variant="body2" sx={{ color: '#1DB954' }}>
                    Thinking...
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Error message */}
            {error && !loading && (
              <Box sx={{ px: 2, py: 1, backgroundColor: 'rgba(244, 67, 54, 0.1)', borderRadius: 1, mx: 1 }}>
                <Typography variant="caption" sx={{ color: '#f44336', display: 'flex', alignItems: 'center' }}>
                  <span role="img" aria-label="warning" style={{ marginRight: '4px' }}>⚠️</span>
                  {error}
                </Typography>
              </Box>
            )}

            {/* Anchor for scrolling to bottom */}
            <div ref={messagesEndRef} />
          </Box>

          {/* Suggestions */}
          {suggestions.length > 0 && showSuggestions && (
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                backgroundColor: '#1a1a1a',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  <QuestionAnswerIcon sx={{ fontSize: 12, mr: 0.5, mb: -0.2 }} />
                  Suggested questions
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowSuggestions(false)}
                  sx={{ color: 'rgba(255, 255, 255, 0.4)', p: 0.5 }}
                >
                  <CancelIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestions.map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{
                      backgroundColor: 'rgba(29, 185, 84, 0.1)',
                      borderColor: 'rgba(29, 185, 84, 0.3)',
                      color: '#1DB954',
                      '&:hover': {
                        backgroundColor: 'rgba(29, 185, 84, 0.2)',
                      },
                      maxWidth: '100%',
                      height: 'auto',
                      '& .MuiChip-label': {
                        whiteSpace: 'normal',
                        overflow: 'visible',
                        py: 0.5,
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Chat input */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              backgroundColor: '#1e1e1e',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 3,
                px: 2,
                py: 0.5,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:focus-within': {
                  borderColor: '#1DB954',
                  boxShadow: '0 0 0 2px rgba(29, 185, 84, 0.2)'
                },
              }}
            >
              <SearchIcon
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  mr: 1,
                  fontSize: 20
                }}
              />
              <InputBase
                placeholder="Ask me about MelodyHub..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
                fullWidth
                sx={{
                  color: 'white',
                  fontSize: '0.9rem',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                }}
              />
            </Box>
            <IconButton
              onClick={handleSubmit}
              disabled={!query.trim() || loading}
              sx={{
                backgroundColor: query.trim() ? '#1DB954' : 'rgba(255, 255, 255, 0.1)',
                color: query.trim() ? 'white' : 'rgba(255, 255, 255, 0.4)',
                width: 36,
                height: 36,
                '&:hover': {
                  backgroundColor: query.trim() ? '#19a74a' : 'rgba(255, 255, 255, 0.15)',
                },
                transition: 'all 0.2s ease',
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Used by attribution */}
          <Box
            sx={{
              py: 1,
              px: 2,
              backgroundColor: '#161616',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>
              <MusicNoteIcon sx={{ fontSize: 12, mr: 0.5, mb: -0.2 }} />
              MelodyHub Assistant • Powered by Google Gemini
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}

export default ChatAssistant;