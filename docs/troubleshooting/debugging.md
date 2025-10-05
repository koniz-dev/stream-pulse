# Debugging Guide

## Overview

Hướng dẫn debugging cho StreamPulse bao gồm các công cụ và kỹ thuật để debug các vấn đề trong authentication, video streaming, chat, và performance.

## Debug Tools

### 1. Admin Debug Panel

**Access:** `/admin/debug`

**Features:**
- Authentication status monitoring
- Firebase connection testing
- Video player debugging
- Chat system testing
- Custom token generation

**Usage:**
```typescript
// Access debug panel
const debugPanel = {
  authentication: {
    clerkStatus: 'check clerk user state',
    firebaseStatus: 'check firebase auth state',
    customToken: 'test custom token generation',
  },
  video: {
    playerState: 'monitor video player state',
    streamTesting: 'test different stream URLs',
    performance: 'monitor video performance',
  },
  chat: {
    connection: 'test firebase connection',
    messages: 'view message history',
    realtime: 'test real-time updates',
  },
};
```

### 2. Browser DevTools

**Console Debugging**
```javascript
// Enable debug logging
localStorage.setItem('debug', 'stream-pulse:*');

// Check authentication state
console.log('Clerk user:', window.Clerk?.user);
console.log('Firebase user:', firebase.auth().currentUser);

// Monitor video player
console.log('Video player:', window.videoPlayer);
console.log('Player state:', window.videoPlayer?.readyState());

// Check chat connection
console.log('Chat messages:', window.chatMessages);
console.log('Firebase connected:', window.firebaseConnected);
```

**Network Tab**
- Monitor API requests
- Check WebSocket connections
- Verify stream loading
- Debug CORS issues

**Performance Tab**
- Profile component renders
- Monitor memory usage
- Track network requests
- Analyze bundle size

## Authentication Debugging

### 1. Clerk Authentication

**Check User State**
```javascript
// In browser console
const { user, isSignedIn, isLoaded } = window.Clerk;

console.log('User:', user);
console.log('Signed in:', isSignedIn);
console.log('Loaded:', isLoaded);

// Check user metadata
console.log('User metadata:', user?.publicMetadata);
console.log('User role:', user?.publicMetadata?.role);
```

**Debug Sign-in Flow**
```javascript
// Monitor sign-in events
window.Clerk.addListener('signIn', (user) => {
  console.log('User signed in:', user);
});

window.Clerk.addListener('signOut', () => {
  console.log('User signed out');
});
```

**Check Environment Variables**
```bash
# Verify Clerk keys
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY

# Test API endpoint
curl -X POST http://localhost:3000/api/auth/firebase-token \
  -H "Content-Type: application/json"
```

### 2. Firebase Authentication

**Check Firebase User**
```javascript
// In browser console
import { auth } from '@/lib/firebase';

console.log('Firebase user:', auth.currentUser);
console.log('Firebase auth state:', auth.authStateReady());

// Monitor auth state changes
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user);
});
```

**Test Custom Token**
```javascript
// Test custom token generation
const testCustomToken = async () => {
  try {
    const response = await fetch('/api/auth/firebase-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    const { customToken } = await response.json();
    console.log('Custom token:', customToken);
    
    // Test Firebase sign-in
    const userCredential = await signInWithCustomToken(auth, customToken);
    console.log('Firebase sign-in success:', userCredential.user);
  } catch (error) {
    console.error('Custom token error:', error);
  }
};
```

**Check Firebase Rules**
```javascript
// Test database access
import { ref, get } from 'firebase/database';

const testDatabaseAccess = async () => {
  try {
    const testRef = ref(database, 'test');
    await set(testRef, { test: 'data' });
    console.log('Database write successful');
    
    const snapshot = await get(testRef);
    console.log('Database read successful:', snapshot.val());
  } catch (error) {
    console.error('Database error:', error);
  }
};
```

## Video Player Debugging

### 1. Video.js Debugging

**Check Player State**
```javascript
// In browser console
const player = window.videoPlayer;

console.log('Player ready:', player?.readyState());
console.log('Player paused:', player?.paused());
console.log('Player current time:', player?.currentTime());
console.log('Player duration:', player?.duration());
console.log('Player volume:', player?.volume());
console.log('Player muted:', player?.muted());
```

**Monitor Player Events**
```javascript
// Add event listeners
player.on('loadstart', () => console.log('Load start'));
player.on('loadedmetadata', () => console.log('Metadata loaded'));
player.on('canplay', () => console.log('Can play'));
player.on('play', () => console.log('Playing'));
player.on('pause', () => console.log('Paused'));
player.on('error', (error) => console.error('Player error:', error));
```

**Test Stream URLs**
```javascript
// Test stream accessibility
const testStream = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    console.log(`Stream ${url}:`, response.status);
  } catch (error) {
    console.error(`Stream ${url} error:`, error);
  }
};

// Test multiple streams
const streams = [
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
];

streams.forEach(testStream);
```

### 2. HLS Debugging

**Check HLS Support**
```javascript
// Check browser HLS support
const video = document.createElement('video');
const canPlayHLS = video.canPlayType('application/vnd.apple.mpegurl');
console.log('Native HLS support:', canPlayHLS);

// Check Video.js HLS plugin
console.log('Video.js HLS plugin:', window.videojs?.getPlugin('reloadSourceOnError'));
```

**Monitor HLS Events**
```javascript
// Monitor HLS-specific events
player.on('loadeddata', () => console.log('HLS data loaded'));
player.on('seeking', () => console.log('Seeking'));
player.on('seeked', () => console.log('Seeked'));
player.on('waiting', () => console.log('Waiting for data'));
player.on('canplaythrough', () => console.log('Can play through'));
```

## Chat System Debugging

### 1. Firebase Realtime Database

**Check Connection Status**
```javascript
// Monitor connection status
import { ref, onValue } from 'firebase/database';

const connectedRef = ref(database, '.info/connected');
onValue(connectedRef, (snapshot) => {
  const connected = snapshot.val();
  console.log('Firebase connected:', connected);
});
```

**Test Message Sending**
```javascript
// Test message sending
const testSendMessage = async () => {
  try {
    const messagesRef = ref(database, 'chat/messages');
    const newMessage = {
      userId: 'test-user',
      username: 'Test User',
      message: 'Test message',
      timestamp: Date.now(),
    };
    
    await push(messagesRef, newMessage);
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Message send error:', error);
  }
};
```

**Monitor Message Updates**
```javascript
// Monitor message updates
const messagesRef = ref(database, 'chat/messages');
const messagesQuery = query(
  messagesRef,
  orderByChild('timestamp'),
  limitToLast(10)
);

onValue(messagesQuery, (snapshot) => {
  const messages = snapshot.val();
  console.log('Messages updated:', messages);
});
```

### 2. Chat Component Debugging

**Check Chat State**
```javascript
// In browser console
const chatStore = window.chatStore;

console.log('Chat messages:', chatStore.getState().messages);
console.log('Chat loading:', chatStore.getState().isLoading);
console.log('Chat error:', chatStore.getState().error);
console.log('Chat connected:', chatStore.getState().isConnected);
```

**Test Chat Functions**
```javascript
// Test chat functions
const testChat = async () => {
  const { sendMessage, loadMessages } = chatStore.getState();
  
  // Test loading messages
  const unsubscribe = loadMessages();
  console.log('Messages loaded');
  
  // Test sending message
  await sendMessage('Test message', 'test-user', 'Test User');
  console.log('Message sent');
  
  // Cleanup
  unsubscribe();
};
```

## Performance Debugging

### 1. React Performance

**Component Profiling**
```javascript
// Use React Profiler
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log('Render:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};

<Profiler id="VideoPlayer" onRender={onRenderCallback}>
  <VideoPlayer />
</Profiler>
```

**Memory Leak Detection**
```javascript
// Monitor memory usage
const monitorMemory = () => {
  if (performance.memory) {
    console.log('Memory usage:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB',
    });
  }
};

// Monitor every 5 seconds
setInterval(monitorMemory, 5000);
```

### 2. Network Performance

**Monitor Network Requests**
```javascript
// Monitor fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const start = performance.now();
  return originalFetch.apply(this, args).then(response => {
    const end = performance.now();
    console.log(`Fetch ${args[0]}: ${end - start}ms`);
    return response;
  });
};
```

**Check Bundle Size**
```javascript
// Check loaded resources
const checkResources = () => {
  const resources = performance.getEntriesByType('resource');
  resources.forEach(resource => {
    console.log(`${resource.name}: ${resource.duration}ms`);
  });
};

// Run after page load
window.addEventListener('load', checkResources);
```

## Common Debug Scenarios

### 1. Authentication Issues

**Scenario:** User can't sign in
```javascript
// Debug steps
console.log('1. Check Clerk keys:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log('2. Check user state:', window.Clerk?.user);
console.log('3. Check middleware:', window.location.pathname);
console.log('4. Check network:', navigator.onLine);
```

### 2. Video Not Loading

**Scenario:** Video player shows black screen
```javascript
// Debug steps
console.log('1. Check stream URL:', player?.src());
console.log('2. Check player state:', player?.readyState());
console.log('3. Check network:', navigator.connection);
console.log('4. Check errors:', player?.error());
```

### 3. Chat Not Working

**Scenario:** Messages not sending/receiving
```javascript
// Debug steps
console.log('1. Check Firebase user:', auth.currentUser);
console.log('2. Check connection:', database.app.options);
console.log('3. Check rules:', 'Review Firebase rules');
console.log('4. Check listeners:', 'Check onValue subscriptions');
```

## Debug Tools Setup

### 1. Environment Setup

**Development Environment**
```bash
# Enable debug logging
export DEBUG=stream-pulse:*

# Enable React DevTools
export REACT_APP_DEVTOOLS=true

# Enable performance monitoring
export REACT_APP_PERFORMANCE=true
```

**Browser Extensions**
- React Developer Tools
- Redux DevTools
- Firebase DevTools
- Video.js DevTools

### 2. Custom Debug Utilities

**Debug Logger**
```javascript
// Custom debug logger
const debug = (namespace) => {
  return (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${namespace}]`, message, ...args);
    }
  };
};

const logger = {
  auth: debug('auth'),
  video: debug('video'),
  chat: debug('chat'),
  performance: debug('performance'),
};
```

**Error Boundary**
```javascript
// Error boundary for debugging
class DebugErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
    console.error('Error info:', errorInfo);
    
    // Send to error tracking service
    if (window.Sentry) {
      window.Sentry.captureException(error, { extra: errorInfo });
    }
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Check console for details.</div>;
    }
    
    return this.props.children;
  }
}
```

## Getting Help

1. **Check Console Logs** - Look for error messages
2. **Use Debug Panel** - Access admin debug tools
3. **Test in Incognito** - Rule out browser extensions
4. **Check Network** - Verify internet connection
5. **Review Environment** - Ensure all variables are set
6. **Check Dependencies** - Verify package versions
7. **Test on Different Browsers** - Rule out browser-specific issues
