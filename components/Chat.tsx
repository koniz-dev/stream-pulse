'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useChatStore } from '@/stores/chatStore';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Chat() {
  const { user: clerkUser } = useUser();
  const { firebaseUser } = useFirebaseAuth();
  const { 
    messages, 
    isLoading, 
    error, 
    isConnected,
    sendMessage, 
    loadMessages, 
    setError 
  } = useChatStore();
  
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages when component mounts
  useEffect(() => {
    if (firebaseUser) {
      unsubscribeRef.current = (loadMessages() as (() => void) | undefined) || (() => {});
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [firebaseUser, loadMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !clerkUser || !firebaseUser || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(
        newMessage,
        firebaseUser.uid,
        clerkUser.username || clerkUser.firstName || 'Anonymous',
        clerkUser.imageUrl
      );
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  if (!clerkUser) {
    return (
      <Paper elevation={3} sx={{ p: 3, height: 400 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          💬 Live Chat
        </Typography>
        <Alert severity="info">
          Please sign in to participate in the chat
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: { xs: 400, sm: 500, lg: 600 }, 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      {/* Chat Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            💬 Live Chat
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip 
              label={isConnected ? 'Connected' : 'Disconnected'} 
              color={isConnected ? 'success' : 'error'} 
              size="small" 
            />
            {isLoading && <CircularProgress size={16} />}
          </Box>
        </Box>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}

      {/* Messages List */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: { xs: 0.5, sm: 1 },
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(0,0,0,0.3)',
        },
      }}>
        {messages.length === 0 && !isLoading ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No messages yet. Be the first to start the conversation!
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {messages.map((message, index) => (
              <ListItem key={message.id} sx={{ px: 1, py: 0.5 }}>
                <ListItemAvatar>
                  <Avatar 
                    src={message.avatar} 
                    sx={{ width: 32, height: 32 }}
                  >
                    {message.username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" component="span">
                        {message.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimestamp(message.timestamp)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {message.message}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>

      {/* Message Input */}
      <Box sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Box display="flex" gap={1} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected || isSending}
            size="small"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isConnected || isSending}
            sx={{ 
              minWidth: 'auto', 
              px: 2,
              borderRadius: 2,
              height: '40px',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            {isSending ? <CircularProgress size={20} /> : <SendIcon />}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
