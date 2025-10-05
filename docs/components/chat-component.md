# Chat Component

## Overview

The `Chat` component provides a real-time chat interface for StreamPulse. This component uses Firebase Realtime Database to send and receive messages, integrating with Clerk authentication for user verification.

## Props Interface

```typescript
// Chat component has no props - uses global state and hooks
interface ChatProps {
  // No props - component is self-contained
}
```

## Usage Example

```tsx
import Chat from '@/components/features/chat/Chat';

function MyComponent() {
  return (
    <div>
      <h1>Live Stream</h1>
      <Chat />
    </div>
  );
}
```

## Features

### Real-time Messaging

- **Send Messages** - Send real-time messages
- **Receive Messages** - Receive messages from other users
- **Auto-scroll** - Automatically scroll to new messages
- **Message History** - Display the last 100 messages

### Authentication Integration

```tsx
const { user: clerkUser } = useUser();
const { firebaseUser } = useFirebaseAuth();

// Only show chat when user is logged in
if (!clerkUser) {
  return (
    <Alert severity="info">
      Please sign in to participate in the chat
    </Alert>
  );
}
```

### Message Formatting

```tsx
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};
```

## State Management

### Zustand Store Integration

```tsx
const { 
  messages, 
  isLoading, 
  error, 
  isConnected,
  sendMessage, 
  loadMessages, 
  setError 
} = useChatStore();
```

### Message Structure

```typescript
interface ChatMessage {
  id: string;           // Firebase auto-generated ID
  userId: string;       // Clerk user ID
  username: string;     // User display name
  message: string;      // Message content
  timestamp: number;    // Unix timestamp
  avatar?: string;      // Optional avatar URL
  isDeleted?: boolean;  // Soft delete flag
}
```

## Event Handling

### Send Message

```tsx
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
```

### Keyboard Shortcuts

```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage();
  }
};
```

### Auto-scroll

```tsx
const scrollToBottom = () => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop = 
      messagesContainerRef.current.scrollHeight;
  }
};

useEffect(() => {
  scrollToBottom();
}, [messages]);
```

## UI Components

### Message List

```tsx
<List sx={{ maxHeight: 300, overflow: 'auto' }}>
  {messages.map((message) => (
    <ListItem key={message.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar 
          src={message.avatar} 
          alt={message.username}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle2">
              {message.username}
            </Typography>
            <Chip 
              label={formatTimestamp(message.timestamp)}
              size="small"
              variant="outlined"
            />
          </Box>
        }
        secondary={message.message}
      />
    </ListItem>
  ))}
</List>
```

### Message Input

```tsx
<Box display="flex" gap={1} mt={2}>
  <TextField
    fullWidth
    placeholder="Type your message..."
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    onKeyDown={handleKeyDown}
    disabled={isSending}
    multiline
    maxRows={3}
  />
  <Button
    variant="contained"
    onClick={handleSendMessage}
    disabled={!newMessage.trim() || isSending}
    startIcon={isSending ? <CircularProgress size={20} /> : <SendIcon />}
  >
    Send
  </Button>
</Box>
```

### Connection Status

```tsx
{!isConnected && (
  <Alert severity="warning" sx={{ mb: 2 }}>
    Chat connection lost. Attempting to reconnect...
  </Alert>
)}

{error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {error}
  </Alert>
)}
```

## Performance Optimization

### Message Loading

```tsx
// Only load the last 100 messages
const messagesQuery = query(
  messagesRef,
  orderByChild('timestamp'),
  limitToLast(100)
);
```

### Cleanup

```tsx
useEffect(() => {
  if (firebaseUser) {
    unsubscribeRef.current = loadMessages();
  }

  return () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
  };
}, [firebaseUser, loadMessages]);
```

### Debouncing

```tsx
// Debounce message sending to prevent spam
const [isSending, setIsSending] = useState(false);
```

## Error Handling

### Common Error Scenarios

1. **Authentication Error**
   - User not logged in
   - Firebase authentication failed

2. **Network Error**
   - Lost Firebase connection
   - Timeout when sending message

3. **Permission Error**
   - User does not have permission to send messages
   - Database rules block access

### Error Display

```tsx
{error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {error}
  </Alert>
)}
```

## Styling

### Material-UI Components

- `Paper` - Container with elevation
- `Typography` - Text styling
- `TextField` - Message input
- `Button` - Send button
- `Avatar` - User avatars
- `List` - Message list
- `Alert` - Error/warning messages

### Responsive Design

```tsx
<Paper 
  elevation={3} 
  sx={{ 
    p: 3, 
    height: { xs: 300, md: 400 },
    display: 'flex',
    flexDirection: 'column'
  }}
>
```

## Testing

### Manual Testing

1. **Send Messages** - Test sending messages
2. **Real-time Updates** - Test with multiple users
3. **Authentication** - Test with/without login
4. **Error Scenarios** - Test network errors
5. **Mobile** - Test on mobile devices

### Debug Tools

Use the admin debug panel to:
- Monitor chat connection
- View message history
- Test message sending
- Debug authentication issues

## Dependencies

- `@clerk/nextjs` - Authentication
- `firebase` - Real-time database
- `@mui/material` - UI components
- `zustand` - State management
- `react` - React hooks

## Related Components

- `AuthStatus` - Authentication status display
- `ChatManagement` - Admin chat management
- `useFirebaseAuth` - Firebase authentication hook
- `useChatStore` - Chat state management
