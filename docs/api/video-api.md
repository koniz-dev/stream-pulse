# Video Streaming API

## Overview

StreamPulse sử dụng Video.js với HLS (HTTP Live Streaming) để phát video live stream. Không có REST API endpoints cho video streaming - tất cả được xử lý trực tiếp qua Video.js player.

## Video Player Configuration

### Video.js Options

```javascript
const videoJsOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  html5: {
    vhs: {
      overrideNative: true,
    },
    nativeVideoTracks: false,
    nativeAudioTracks: false,
    nativeTextTracks: false,
  },
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  plugins: {
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 5,
      enableModifiersForNumbers: false,
    },
  },
  controlBar: {
    children: [
      'playToggle',
      'volumePanel',
      'currentTimeDisplay',
      'timeDivider',
      'durationDisplay',
      'progressControl',
      'liveDisplay',
      'remainingTimeDisplay',
      'customControlSpacer',
      'playbackRateMenuButton',
      'chaptersButton',
      'descriptionsButton',
      'subsCapsButton',
      'audioTrackButton',
      'fullscreenToggle',
    ],
  },
};
```

## Stream Sources

### Demo Streams

```javascript
const DEMO_STREAMS = {
  bigBuckBunny: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  // Add more demo streams as needed
};
```

### HLS Stream Format

```javascript
const streamConfig = {
  sources: [
    {
      src: 'https://example.com/stream.m3u8',
      type: 'application/x-mpegURL', // HLS format
    },
  ],
};
```

## Video Player State Management

### Zustand Store Structure

```typescript
interface VideoPlayer {
  player: VideoJsPlayer | null;
  isReady: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  quality: string;
  streamUrl: string | null;
  isLive: boolean;
  buffered: number;
}

interface VideoStore {
  player: VideoPlayer;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPlayer: (player: VideoJsPlayer | null) => void;
  setReady: (ready: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setQuality: (quality: string) => void;
  setStreamUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetPlayer: () => void;
}
```

## Player Events

### Event Listeners

```javascript
// Player ready
playerInstance.ready(() => {
  console.log('Player is ready');
  setReady(true);
});

// Playback events
playerInstance.on('play', () => {
  setPlaying(true);
});

playerInstance.on('pause', () => {
  setPlaying(false);
});

playerInstance.on('timeupdate', () => {
  const currentTime = playerInstance.currentTime();
  if (typeof currentTime === 'number') {
    setCurrentTime(currentTime);
  }
});

playerInstance.on('loadedmetadata', () => {
  const duration = playerInstance.duration();
  if (typeof duration === 'number') {
    setDuration(duration);
  }
});

playerInstance.on('volumechange', () => {
  const volume = playerInstance.volume();
  const muted = playerInstance.muted();
  if (typeof volume === 'number') {
    setVolume(volume);
  }
  if (typeof muted === 'boolean') {
    setMuted(muted);
  }
});

playerInstance.on('ratechange', () => {
  const rate = playerInstance.playbackRate();
  if (typeof rate === 'number') {
    setPlaybackRate(rate);
  }
});

// Error handling
playerInstance.on('error', (error) => {
  console.error('Video player error:', error);
  setError('Video playback error');
});
```

## Player Controls

### Programmatic Control

```javascript
// Play/Pause
const togglePlay = () => {
  if (playerRef.current) {
    if (playerRef.current.paused()) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }
};

// Volume control
const setVolume = (volume) => {
  if (playerRef.current) {
    playerRef.current.volume(volume);
  }
};

// Mute/Unmute
const toggleMute = () => {
  if (playerRef.current) {
    playerRef.current.muted(!playerRef.current.muted());
  }
};

// Seek
const seekTo = (time) => {
  if (playerRef.current) {
    playerRef.current.currentTime(time);
  }
};

// Playback rate
const setPlaybackRate = (rate) => {
  if (playerRef.current) {
    playerRef.current.playbackRate(rate);
  }
};

// Fullscreen
const toggleFullscreen = () => {
  if (playerRef.current) {
    if (playerRef.current.isFullscreen()) {
      playerRef.current.exitFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  }
};
```

## Error Handling

### Common Error Scenarios

1. **Network Error**
   - Cause: Connection issues or stream unavailable
   - Solution: Implement retry logic and fallback streams

2. **Codec Not Supported**
   - Cause: Browser doesn't support HLS codec
   - Solution: Use Video.js HLS plugin for cross-browser support

3. **Stream Not Found**
   - Cause: Invalid stream URL or stream offline
   - Solution: Validate stream URL and provide error message

4. **Autoplay Blocked**
   - Cause: Browser autoplay policy
   - Solution: Require user interaction before playing

### Error Handling Implementation

```javascript
const handlePlayerError = (error) => {
  console.error('Video player error:', error);
  
  const errorMessage = error.code ? 
    `Error ${error.code}: ${error.message}` : 
    'Video playback error';
    
  setError(errorMessage);
  
  // Optional: Implement retry logic
  if (error.code === 4) { // MEDIA_ERR_SRC_NOT_SUPPORTED
    // Try fallback stream
    loadFallbackStream();
  }
};
```

## Performance Optimization

### Best Practices

1. **Lazy Loading**
   - Initialize player only when needed
   - Clean up resources when component unmounts

2. **Memory Management**
   - Dispose player instance properly
   - Remove event listeners on cleanup

3. **Stream Quality**
   - Use adaptive bitrate streaming
   - Implement quality selection

4. **Buffering**
   - Monitor buffer health
   - Implement preloading strategies

### Cleanup Implementation

```javascript
useEffect(() => {
  return () => {
    // Clean up existing player
    if (playerRef.current && !playerRef.current.isDisposed()) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
  };
}, []);
```

## Testing

### Manual Testing

1. **Stream Loading** - Verify stream loads correctly
2. **Playback Controls** - Test all player controls
3. **Error Scenarios** - Test with invalid streams
4. **Mobile Compatibility** - Test on mobile devices
5. **Network Conditions** - Test with poor network

### Debug Tools

Use admin debug panel tại `/admin/debug` để:
- Monitor player state
- Test different stream URLs
- Debug playback issues
- View player events and errors

## Browser Compatibility

### Supported Browsers

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### HLS Support

- **Native HLS:** Safari (iOS/macOS)
- **Video.js HLS Plugin:** All other browsers
- **Fallback:** MP4 for unsupported browsers

## Stream Requirements

### HLS Stream Format

- **Container:** MPEG-TS
- **Video Codec:** H.264
- **Audio Codec:** AAC
- **Resolution:** 720p, 1080p, 4K
- **Bitrate:** Adaptive (multiple quality levels)

### Stream URL Format

```
https://example.com/stream.m3u8
```

### M3U8 Playlist Structure

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXTINF:10.0,
segment1.ts
#EXTINF:10.0,
segment2.ts
#EXT-X-ENDLIST
```
