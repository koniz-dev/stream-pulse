# VideoPlayer Component

## Overview

The `VideoPlayer` component is the main component for playing live stream videos using Video.js with HLS support. This component provides a complete video player interface with controls and event handling.

## Props Interface

```typescript
interface VideoPlayerProps {
  streamUrl: string;           // URL of the HLS stream
  className?: string;          // Custom CSS class
  onReady?: (player: any) => void;  // Callback when player is ready
  onError?: (error: any) => void;   // Callback when there is an error
}
```

## Usage Example

```tsx
import VideoPlayer from '@/components/features/video/VideoPlayer';

function MyComponent() {
  const handlePlayerReady = (player) => {
    console.log('Player is ready:', player);
  };

  const handlePlayerError = (error) => {
    console.error('Player error:', error);
  };

  return (
    <VideoPlayer
      streamUrl="https://example.com/stream.m3u8"
      className="my-video-player"
      onReady={handlePlayerReady}
      onError={handlePlayerError}
    />
  );
}
```

## Features

### Video.js Configuration

```javascript
const videoJsOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  preload: 'auto',
  html5: {
    hls: {
      enableLowInitialPlaylist: true,
      smoothQualityChange: true,
      overrideNative: true,
    },
  },
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
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
      'fullscreenToggle',
    ],
  },
};
```

### Event Handling

The component automatically handles the following events:

- **ready** - Player is ready
- **play** - Start playing
- **pause** - Pause
- **timeupdate** - Time update
- **loadedmetadata** - Metadata loaded
- **volumechange** - Volume change
- **ratechange** - Playback rate change
- **error** - Video playback error

### State Management

The component uses Zustand store for state management:

```typescript
const {
  setPlayer,
  setReady,
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setMuted,
  setPlaybackRate,
  setLoading,
  setError
} = useVideoStore();
```

## Styling

### CSS Classes

- `.vjs-default-skin` - Video.js default skin
- Custom className is applied to the container

### Responsive Design

- `responsive: true` - Player automatically resizes according to container
- `fluid: true` - Player uses 16:9 aspect ratio

## Error Handling

### Error Types

1. **Network Error** - Cannot connect to stream
2. **Codec Error** - Browser does not support codec
3. **Stream Error** - Stream does not exist or is offline

### Error Display

```tsx
{error && (
  <Backdrop open={true} sx={{ zIndex: 1 }}>
    <Box textAlign="center">
      <Typography variant="h6" color="error" gutterBottom>
        Video Error
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {error}
      </Typography>
    </Box>
  </Backdrop>
)}
```

## Performance Considerations

### Memory Management

```tsx
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

### Loading States

- Display loading spinner when initializing player
- Automatically hide loading when player is ready or has error

## Browser Compatibility

### HLS Support

- **Safari**: Native HLS support
- **Chrome/Firefox/Edge**: Uses Video.js HLS plugin
- **Mobile**: Full support on iOS/Android

### Fallback

If HLS is not supported, the component will display an error message.

## Testing

### Manual Testing

1. **Stream Loading** - Test with different stream URLs
2. **Controls** - Test all player controls
3. **Responsive** - Test on different screen sizes
4. **Error Scenarios** - Test with invalid URLs

### Debug Tools

Use the admin debug panel to:
- Monitor player state
- Test different streams
- View player events
- Debug performance issues

## Dependencies

- `video.js` - Video player library
- `@mui/material` - UI components
- `zustand` - State management
- `react` - React hooks and lifecycle

## Related Components

- `VideoWrapper` - Wrapper component with error handling
- `VideoDebug` - Debug component cho admin panel
