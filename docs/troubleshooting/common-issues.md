# Common Issues & Solutions

## Authentication Issues

### 1. Clerk Authentication Not Working

**Symptoms:**
- User cannot sign in/sign up
- Authentication buttons not responding
- Redirect loops

**Possible Causes:**
- Invalid Clerk API keys
- Incorrect environment variables
- CORS issues
- Middleware configuration problems

**Solutions:**

1. **Check Environment Variables**
   ```bash
   # Verify these are set correctly
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

2. **Verify Clerk Dashboard Settings**
   - Check allowed origins in Clerk dashboard
   - Ensure redirect URLs are configured
   - Verify webhook endpoints

3. **Check Middleware Configuration**
   ```typescript
   // middleware.ts
   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
   
   const isProtectedRoute = createRouteMatcher(['/admin(.*)']);
   
   export default clerkMiddleware((auth, req) => {
     if (isProtectedRoute(req)) auth().protect();
   });
   ```

### 2. Firebase Authentication Sync Issues

**Symptoms:**
- User signed in with Clerk but not Firebase
- Chat not working despite being signed in
- Firebase custom token errors

**Solutions:**

1. **Check Firebase Service Account**
   ```bash
   # Verify all Firebase Admin SDK environment variables
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
   ```

2. **Test Custom Token API**
   ```bash
   curl -X POST http://localhost:3000/api/auth/firebase-token \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_clerk_token"
   ```

3. **Check Firebase Rules**
   ```json
   {
     "rules": {
       "chat": {
         "messages": {
           "$messageId": {
             ".read": "auth != null",
             ".write": "auth != null"
           }
         }
       }
     }
   }
   ```

## Video Streaming Issues

### 1. Video Not Loading

**Symptoms:**
- Black video player
- Loading spinner never stops
- "Failed to load video stream" error

**Solutions:**

1. **Check Stream URL**
   ```javascript
   // Test stream accessibility
   const testStream = async (url) => {
     try {
       const response = await fetch(url, { method: 'HEAD' });
       console.log('Stream status:', response.status);
     } catch (error) {
       console.error('Stream error:', error);
     }
   };
   ```

2. **Verify HLS Support**
   ```javascript
   // Check if browser supports HLS
   const video = document.createElement('video');
   const canPlayHLS = video.canPlayType('application/vnd.apple.mpegurl');
   console.log('HLS support:', canPlayHLS);
   ```

3. **Check Video.js Configuration**
   ```javascript
   const videoJsOptions = {
     html5: {
       hls: {
         overrideNative: true, // Force Video.js HLS plugin
       },
     },
   };
   ```

### 2. Video Player Controls Not Working

**Symptoms:**
- Play/pause buttons not responding
- Volume controls not working
- Fullscreen not working

**Solutions:**

1. **Check Event Listeners**
   ```javascript
   playerInstance.on('play', () => {
     console.log('Play event fired');
   });
   ```

2. **Verify Player State**
   ```javascript
   console.log('Player ready:', playerInstance.readyState());
   console.log('Player paused:', playerInstance.paused());
   ```

3. **Check Browser Permissions**
   - Ensure autoplay policies are handled
   - Check for browser-specific issues

### 3. Poor Video Quality

**Symptoms:**
- Low resolution video
- Buffering issues
- Choppy playback

**Solutions:**

1. **Check Network Connection**
   ```javascript
   // Monitor network quality
   navigator.connection && console.log('Connection:', navigator.connection.effectiveType);
   ```

2. **Adjust Video.js Settings**
   ```javascript
   const videoJsOptions = {
     html5: {
       hls: {
         enableLowInitialPlaylist: true,
         smoothQualityChange: true,
       },
     },
   };
   ```

3. **Implement Quality Selection**
   ```javascript
   // Add quality menu
   playerInstance.ready(() => {
     const qualityLevels = playerInstance.qualityLevels();
     // Configure quality levels
   });
   ```

## Chat Issues

### 1. Messages Not Sending

**Symptoms:**
- Send button not working
- Messages not appearing in chat
- "Failed to send message" error

**Solutions:**

1. **Check Firebase Connection**
   ```javascript
   // Test Firebase connection
   import { getDatabase, ref, push } from 'firebase/database';
   
   const testConnection = async () => {
     try {
       const testRef = ref(database, 'test');
       await push(testRef, { test: 'connection' });
       console.log('Firebase connected');
     } catch (error) {
       console.error('Firebase error:', error);
     }
   };
   ```

2. **Verify User Authentication**
   ```javascript
   // Check if user is authenticated
   console.log('Firebase user:', firebaseUser);
   console.log('Clerk user:', clerkUser);
   ```

3. **Check Message Format**
   ```javascript
   const message = {
     userId: firebaseUser.uid,
     username: clerkUser.username || 'Anonymous',
     message: messageText.trim(),
     timestamp: Date.now(),
   };
   ```

### 2. Messages Not Receiving

**Symptoms:**
- Messages from other users not appearing
- Chat appears disconnected
- Real-time updates not working

**Solutions:**

1. **Check Firebase Listeners**
   ```javascript
   // Verify listener is active
   const messagesRef = ref(database, 'chat/messages');
   const unsubscribe = onValue(messagesRef, (snapshot) => {
     console.log('Messages updated:', snapshot.val());
   });
   ```

2. **Check Network Connection**
   ```javascript
   // Monitor connection status
   const connectedRef = ref(database, '.info/connected');
   onValue(connectedRef, (snapshot) => {
     console.log('Connected:', snapshot.val());
   });
   ```

3. **Verify Database Rules**
   ```json
   {
     "rules": {
       "chat": {
         "messages": {
           ".read": "auth != null",
           ".write": "auth != null"
         }
       }
     }
   }
   ```

## Performance Issues

### 1. Slow Page Loading

**Symptoms:**
- Long initial load times
- Slow navigation between pages
- High memory usage

**Solutions:**

1. **Optimize Bundle Size**
   ```javascript
   // Use dynamic imports
   const LazyComponent = React.lazy(() => import('./LazyComponent'));
   ```

2. **Implement Code Splitting**
   ```javascript
   // Split routes
   const AdminPage = React.lazy(() => import('./admin/page'));
   ```

3. **Optimize Images**
   ```javascript
   // Use Next.js Image component
   import Image from 'next/image';
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
     priority={false}
   />
   ```

### 2. Memory Leaks

**Symptoms:**
- Increasing memory usage over time
- Browser becomes unresponsive
- Component re-renders excessively

**Solutions:**

1. **Cleanup Event Listeners**
   ```javascript
   useEffect(() => {
     const unsubscribe = onValue(messagesRef, callback);
     
     return () => {
       unsubscribe(); // Cleanup
     };
   }, []);
   ```

2. **Dispose Video.js Player**
   ```javascript
   useEffect(() => {
     return () => {
       if (playerRef.current && !playerRef.current.isDisposed()) {
         playerRef.current.dispose();
       }
     };
   }, []);
   ```

3. **Optimize Re-renders**
   ```javascript
   // Use useCallback for stable references
   const handleClick = useCallback(() => {
     // Handle click
   }, []);
   ```

## Network Issues

### 1. CORS Errors

**Symptoms:**
- "Access to fetch blocked by CORS policy"
- API requests failing
- Cross-origin issues

**Solutions:**

1. **Configure Next.js CORS**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             { key: 'Access-Control-Allow-Origin', value: '*' },
             { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
           ],
         },
       ];
     },
   };
   ```

2. **Check API Endpoints**
   ```javascript
   // Ensure proper headers
   const response = await fetch('/api/endpoint', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

### 2. WebSocket Connection Issues

**Symptoms:**
- Real-time features not working
- Connection drops frequently
- WebSocket errors in console

**Solutions:**

1. **Check Firebase Connection**
   ```javascript
   // Monitor connection status
   const connectedRef = ref(database, '.info/connected');
   onValue(connectedRef, (snapshot) => {
     if (snapshot.val() === true) {
       console.log('Connected to Firebase');
     } else {
       console.log('Disconnected from Firebase');
     }
   });
   ```

2. **Implement Reconnection Logic**
   ```javascript
   const reconnect = () => {
     // Reconnect to Firebase
     const messagesRef = ref(database, 'chat/messages');
     const unsubscribe = onValue(messagesRef, callback);
     return unsubscribe;
   };
   ```

## Debug Tools

### 1. Admin Debug Panel

Access at `/admin/debug` to:
- Test authentication flow
- Monitor Firebase connection
- Debug video player issues
- View system status

### 2. Browser DevTools

```javascript
// Console debugging
console.log('Clerk user:', clerkUser);
console.log('Firebase user:', firebaseUser);
console.log('Video player:', playerRef.current);
console.log('Chat messages:', messages);
```

### 3. Network Tab

- Check API requests
- Monitor WebSocket connections
- Verify stream loading
- Debug CORS issues

## Getting Help

1. **Check Console Logs** - Look for error messages
2. **Use Debug Panel** - Access admin debug tools
3. **Test in Incognito** - Rule out browser extensions
4. **Check Network** - Verify internet connection
5. **Review Environment** - Ensure all variables are set
