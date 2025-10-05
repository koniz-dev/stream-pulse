'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useAdminChatStore } from '@/stores/adminChatStore';
import { ChatMessage } from '@/stores/chatStore';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Switch,
  FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import MessageIcon from '@mui/icons-material/Message';

export function ChatManagement() {
  const { user: clerkUser } = useUser();
  const { firebaseUser } = useFirebaseAuth();
  const { 
    allMessages, 
    isLoading, 
    error, 
    isConnected,
    loadAllMessages, 
    deleteMessage,
    setError 
  } = useAdminChatStore();
  
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  // Load all messages when component mounts
  useEffect(() => {
    if (firebaseUser) {
      loadAllMessages();
    }
  }, [firebaseUser, loadAllMessages]);

  const handleDeleteClick = (message: ChatMessage) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMessage) return;
    
    setIsDeleting(true);
    try {
      await deleteMessage(selectedMessage.id, clerkUser?.username || 'admin');
      setDeleteDialogOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedMessage(null);
  };

  const handleRefresh = () => {
    if (firebaseUser) {
      loadAllMessages();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const filteredMessages = allMessages.filter(message => {
    const matchesSearch = message.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showDeleted) {
      return matchesSearch; // Show all messages including deleted ones
    } else {
      return matchesSearch && !message.isDeleted; // Show only non-deleted messages
    }
  });

  const isAdmin = clerkUser?.publicMetadata?.role === 'admin';

  if (!clerkUser) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MessageIcon /> Chat Management
        </Typography>
        <Alert severity="info">
          Please sign in to access chat management
        </Alert>
      </Paper>
    );
  }

  if (!isAdmin) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MessageIcon /> Chat Management
        </Typography>
        <Alert severity="warning">
          Access denied. Admin privileges required.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MessageIcon /> Chat Management
      </Typography>
      
      {/* Status and Controls */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Chip 
          label={isConnected ? 'Connected' : 'Disconnected'} 
          color={isConnected ? 'success' : 'error'} 
          size="small" 
        />
        <Chip 
          label={`${allMessages.length} total messages`} 
          color="info" 
          size="small" 
        />
        <Chip 
          label={`${allMessages.filter(m => m.isDeleted).length} deleted`} 
          color="warning" 
          size="small" 
        />
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </Stack>

      {/* Show Deleted Toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            color="warning"
          />
        }
        label="Show deleted messages"
        sx={{ mb: 2 }}
      />

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search messages by username or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Messages List */}
      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : filteredMessages.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'No messages match your search' : 'No messages found'}
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {filteredMessages.map((message, index) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  px: 1, 
                  py: 1,
                  borderBottom: index < filteredMessages.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                  bgcolor: message.isDeleted ? 'grey.100' : 'transparent',
                  opacity: message.isDeleted ? 0.7 : 1
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={message.avatar} 
                    sx={{ width: 40, height: 40 }}
                  >
                    {message.username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle2" component="span">
                          {message.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                        {message.isDeleted && (
                          <Chip 
                            label="DELETED" 
                            color="error" 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                      {!message.isDeleted && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(message)}
                          title="Delete message"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box component="span" sx={{ display: 'block' }}>
                      <Box 
                        component="span"
                        sx={{ 
                          wordBreak: 'break-word', 
                          mt: 0.5,
                          textDecoration: message.isDeleted ? 'line-through' : 'none',
                          color: message.isDeleted ? 'text.disabled' : 'text.primary',
                          fontSize: '0.875rem',
                          lineHeight: 1.43,
                          display: 'block'
                        }}
                      >
                        {message.message}
                      </Box>
                      {message.isDeleted && message.deletedAt && (
                        <Box 
                          component="span"
                          sx={{ 
                            mt: 0.5, 
                            display: 'block',
                            fontSize: '0.75rem',
                            color: 'error.main'
                          }}
                        >
                          Deleted by {message.deletedBy} at {formatTimestamp(message.deletedAt)}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Soft Delete Message</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to soft delete this message? The message will be hidden from users but remain in the database for audit purposes.
          </Typography>
          {selectedMessage && (
            <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Avatar 
                  src={selectedMessage.avatar} 
                  sx={{ width: 24, height: 24 }}
                >
                  {selectedMessage.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="subtitle2">
                  {selectedMessage.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTimestamp(selectedMessage.timestamp)}
                </Typography>
              </Box>
              <Typography variant="body2">
                {selectedMessage.message}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={16} /> : <DeleteIcon />}
          >
            {isDeleting ? 'Soft Deleting...' : 'Soft Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
