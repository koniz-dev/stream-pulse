# Chat API

## Overview

StreamPulse uses Firebase Realtime Database to handle real-time chat. There are no REST API endpoints for chat - everything is handled directly through the Firebase client SDK.

## Firebase Database Structure

### Chat Messages

**Path:** `/chat/messages`

```json
{
  "chat": {
    "messages": {
      "messageId1": {
        "userId": "clerk_user_id",
        "username": "user_display_name",
        "message": "Hello world!",
        "timestamp": 1703123456789,
        "avatar": "https://example.com/avatar.jpg",
        "isDeleted": false
      },
      "messageId2": {
        "userId": "clerk_user_id_2",
        "username": "another_user",
        "message": "Great stream!",
        "timestamp": 1703123456790,
        "avatar": null,
        "isDeleted": false
      }
    }
  }
}
```

## Client-side Operations

### Sending Messages

```javascript
import { ref, push } from 'firebase/database';
import { database } from '@/lib/firebase';

const sendMessage = async (message, userId, username, avatar) => {
  try {
    const newMessage = {
      userId,
      username,
      message: message.trim(),
      timestamp: Date.now(),
      avatar
    };

    const messagesRef = ref(database, 'chat/messages');
    await push(messagesRef, newMessage);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
```

### Listening to Messages

```javascript
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';

const loadMessages = () => {
  const messagesRef = ref(database, 'chat/messages');
  const messagesQuery = query(
    messagesRef,
    orderByChild('timestamp'),
    limitToLast(100) // Limit to last 100 messages
  );

  const unsubscribe = onValue(messagesQuery, (snapshot) => {
    const messagesData = snapshot.val();
    
    if (messagesData) {
      const messages = Object.entries(messagesData)
        .map(([id, data]) => ({
          id,
          ...data
        }))
        .filter(message => !message.isDeleted)
        .sort((a, b) => a.timestamp - b.timestamp);
      
      // Update UI with messages
      setMessages(messages);
    }
  });

  return unsubscribe; // For cleanup
};
```

### Message Deletion (Soft Delete)

```javascript
import { ref, update } from 'firebase/database';

const deleteMessage = async (messageId) => {
  try {
    const messageRef = ref(database, `chat/messages/${messageId}`);
    await update(messageRef, { isDeleted: true });
  } catch (error) {
    console.error('Failed to delete message:', error);
  }
};
```

## Data Types

### ChatMessage

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

## Security Rules

Firebase Realtime Database rules (recommended):

```json
{
  "rules": {
    "chat": {
      "messages": {
        "$messageId": {
          ".read": "auth != null",
          ".write": "auth != null && 
                     (!data.exists() || data.child('userId').val() == auth.uid)",
          ".validate": "newData.hasChildren(['userId', 'username', 'message', 'timestamp']) &&
                       newData.child('userId').val() == auth.uid &&
                       newData.child('message').val().length <= 500 &&
                       newData.child('timestamp').val() is number"
        }
      }
    }
  }
}
```

## Rate Limiting

### Client-side Rate Limiting

```javascript
// Example rate limiting implementation
const RATE_LIMIT_DELAY = 1000; // 1 second between messages
let lastMessageTime = 0;

const sendMessageWithRateLimit = async (message, userId, username, avatar) => {
  const now = Date.now();
  if (now - lastMessageTime < RATE_LIMIT_DELAY) {
    throw new Error('Please wait before sending another message');
  }
  
  lastMessageTime = now;
  await sendMessage(message, userId, username, avatar);
};
```

## Error Handling

### Common Error Scenarios

1. **Permission Denied**
   - Cause: User not authenticated or insufficient permissions
   - Solution: Ensure user is signed in to Firebase

2. **Network Error**
   - Cause: Connection issues
   - Solution: Implement retry logic and offline handling

3. **Message Too Long**
   - Cause: Message exceeds character limit
   - Solution: Validate message length before sending

4. **Rate Limit Exceeded**
   - Cause: Too many messages sent too quickly
   - Solution: Implement client-side rate limiting

## Performance Considerations

### Message Loading

- **Limit messages:** Only load last 100 messages to avoid performance issues
- **Pagination:** Implement pagination for message history if needed
- **Cleanup:** Regularly clean up old messages to maintain performance

### Real-time Updates

- **Efficient listeners:** Use specific queries instead of listening to entire database
- **Cleanup:** Always unsubscribe from listeners to prevent memory leaks
- **Debouncing:** Debounce rapid UI updates for better performance

## Testing

### Manual Testing

1. **Send messages** - Verify messages appear in real-time
2. **Multiple users** - Test with multiple users simultaneously
3. **Network issues** - Test offline/online scenarios
4. **Message limits** - Test character limits and rate limiting

### Debug Tools

Use the admin debug panel at `/admin/debug` to:
- Monitor Firebase connection status
- View real-time database structure
- Test message sending/receiving
- Debug authentication issues
