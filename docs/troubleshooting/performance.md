# Performance Optimization Guide

## Overview

StreamPulse is a real-time application with video streaming and chat, requiring performance optimization to ensure a smooth user experience. This guide provides optimization techniques for the main components.

## Video Player Performance

### 1. Video.js Optimization

**Lazy Loading**
```javascript
// Only initialize player when needed
const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setShouldLoadPlayer(true);
      observer.disconnect();
    }
  });
  
  observer.observe(videoContainerRef.current);
}, []);
```

**Memory Management**
```javascript
// Cleanup player instance
useEffect(() => {
  return () => {
    if (playerRef.current && !playerRef.current.isDisposed()) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
  };
}, []);
```

**Quality Selection**
```javascript
// Implement adaptive bitrate
const videoJsOptions = {
  html5: {
    hls: {
      enableLowInitialPlaylist: true,
      smoothQualityChange: true,
      overrideNative: true,
    },
  },
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
};
```

### 2. Stream Optimization

**Preloading Strategy**
```javascript
// Preload next segments
const videoJsOptions = {
  preload: 'auto',
  html5: {
    hls: {
      enableLowInitialPlaylist: true,
      smoothQualityChange: true,
    },
  },
};
```

**Buffer Management**
```javascript
// Monitor buffer health
playerInstance.on('progress', () => {
  const buffered = playerInstance.buffered();
  const currentTime = playerInstance.currentTime();
  
  if (buffered.length > 0) {
    const bufferedEnd = buffered.end(buffered.length - 1);
    const bufferAhead = bufferedEnd - currentTime;
    
    if (bufferAhead < 5) {
      // Low buffer warning
      console.warn('Low buffer ahead:', bufferAhead);
    }
  }
});
```

## Chat Performance

### 1. Message Optimization

**Limit Message History**
```javascript
// Only load the last 100 messages
const messagesQuery = query(
  messagesRef,
  orderByChild('timestamp'),
  limitToLast(100)
);
```

**Virtual Scrolling**
```javascript
// Implement virtual scrolling for large message lists
import { FixedSizeList as List } from 'react-window';

const MessageList = ({ messages }) => (
  <List
    height={400}
    itemCount={messages.length}
    itemSize={60}
    itemData={messages}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <MessageItem message={data[index]} />
      </div>
    )}
  </List>
);
```

**Message Debouncing**
```javascript
// Debounce message sending
const [isSending, setIsSending] = useState(false);
const sendTimeoutRef = useRef<NodeJS.Timeout>();

const debouncedSendMessage = useCallback((message) => {
  if (sendTimeoutRef.current) {
    clearTimeout(sendTimeoutRef.current);
  }
  
  sendTimeoutRef.current = setTimeout(() => {
    sendMessage(message);
  }, 300);
}, [sendMessage]);
```

### 2. Real-time Updates

**Efficient Listeners**
```javascript
// Use specific queries instead of listening to entire database
const messagesRef = ref(database, 'chat/messages');
const messagesQuery = query(
  messagesRef,
  orderByChild('timestamp'),
  limitToLast(100)
);

const unsubscribe = onValue(messagesQuery, (snapshot) => {
  // Handle updates
});
```

**Connection Monitoring**
```javascript
// Monitor connection status
const connectedRef = ref(database, '.info/connected');
onValue(connectedRef, (snapshot) => {
  const connected = snapshot.val();
  if (connected) {
    // Reconnect listeners
    reconnectChatListeners();
  }
});
```

## React Performance

### 1. Component Optimization

**Memoization**
```javascript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);
  
  return <div>{processedData}</div>;
});
```

**Callback Optimization**
```javascript
// Stable callback references
const handleClick = useCallback((id) => {
  // Handle click
}, []);

const handleSubmit = useCallback((data) => {
  // Handle submit
}, []);
```

**State Optimization**
```javascript
// Batch state updates
const [state, setState] = useState({
  loading: false,
  error: null,
  data: null,
});

// Batch updates
const updateState = useCallback((updates) => {
  setState(prev => ({ ...prev, ...updates }));
}, []);
```

### 2. Bundle Optimization

**Code Splitting**
```javascript
// Lazy load components
const AdminPage = React.lazy(() => import('./admin/page'));
const DebugPage = React.lazy(() => import('./admin/debug/page'));

// Route-based splitting
const routes = [
  {
    path: '/admin',
    component: AdminPage,
  },
  {
    path: '/admin/debug',
    component: DebugPage,
  },
];
```

**Dynamic Imports**
```javascript
// Dynamic import for heavy libraries
const loadVideoJS = async () => {
  const videojs = await import('video.js');
  return videojs.default;
};
```

## Network Performance

### 1. API Optimization

**Request Batching**
```javascript
// Batch multiple requests
const batchRequests = async (requests) => {
  const promises = requests.map(request => fetch(request));
  const responses = await Promise.all(promises);
  return responses;
};
```

**Caching Strategy**
```javascript
// Implement caching
const cache = new Map();

const fetchWithCache = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
};
```

### 2. Firebase Optimization

**Offline Support**
```javascript
// Enable offline persistence
import { enableNetwork, disableNetwork } from 'firebase/database';

// Disable network for offline mode
const goOffline = () => {
  disableNetwork(database);
};

// Re-enable network
const goOnline = () => {
  enableNetwork(database);
};
```

**Connection Pooling**
```javascript
// Reuse database connections
let databaseInstance = null;

const getDatabase = () => {
  if (!databaseInstance) {
    databaseInstance = getDatabase(app);
  }
  return databaseInstance;
};
```

## Memory Management

### 1. Event Listener Cleanup

**Proper Cleanup**
```javascript
useEffect(() => {
  const unsubscribe = onValue(messagesRef, callback);
  
  return () => {
    unsubscribe(); // Always cleanup
  };
}, []);
```

**Ref Management**
```javascript
// Cleanup refs
useEffect(() => {
  return () => {
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
  };
}, []);
```

### 2. State Management

**Zustand Optimization**
```javascript
// Selective subscriptions
const useVideoPlayer = () => useVideoStore(state => state.player);
const useVideoLoading = () => useVideoStore(state => state.isLoading);

// Shallow comparison
const useVideoState = () => useVideoStore(
  state => ({
    player: state.player,
    isLoading: state.isLoading,
  }),
  shallow
);
```

## Monitoring and Profiling

### 1. Performance Monitoring

**React DevTools Profiler**
```javascript
// Use React Profiler
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Render:', { id, phase, actualDuration });
};

<Profiler id="VideoPlayer" onRender={onRenderCallback}>
  <VideoPlayer />
</Profiler>
```

**Custom Performance Metrics**
```javascript
// Measure component render time
const measureRenderTime = (componentName) => {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    console.log(`${componentName} render time:`, end - start);
  };
};
```

### 2. Bundle Analysis

**Webpack Bundle Analyzer**
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config
});
```

**Performance Budgets**
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};
```

## Best Practices

### 1. General Guidelines

- **Lazy Load** - Load components only when needed
- **Memoize** - Cache expensive calculations
- **Debounce** - Limit frequent operations
- **Cleanup** - Always cleanup resources
- **Monitor** - Track performance metrics

### 2. Video Streaming

- **Adaptive Bitrate** - Use quality selection
- **Buffer Management** - Monitor buffer health
- **Preloading** - Preload next segments
- **Error Handling** - Graceful degradation

### 3. Real-time Features

- **Efficient Listeners** - Use specific queries
- **Connection Monitoring** - Handle disconnections
- **Message Limits** - Limit message history
- **Virtual Scrolling** - For large lists

### 4. React Optimization

- **Code Splitting** - Split by routes/features
- **Memoization** - Cache expensive operations
- **Stable References** - Use useCallback/useMemo
- **State Batching** - Batch state updates

## Tools and Resources

### 1. Performance Tools

- **React DevTools** - Component profiling
- **Chrome DevTools** - Network and performance
- **Lighthouse** - Performance auditing
- **WebPageTest** - Real-world performance

### 2. Monitoring

- **Firebase Performance** - Real-time monitoring
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - Application monitoring

### 3. Optimization Libraries

- **React.memo** - Component memoization
- **useMemo/useCallback** - Hook optimization
- **react-window** - Virtual scrolling
- **lodash.debounce** - Function debouncing
