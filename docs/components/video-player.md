# VideoPlayer Component

## Overview

`VideoPlayer` là component chính để phát video live stream sử dụng Video.js với HLS support. Component này cung cấp giao diện video player hoàn chỉnh với các controls và event handling.

## Props Interface

```typescript
interface VideoPlayerProps {
  streamUrl: string;           // URL của HLS stream
  className?: string;          // CSS class tùy chỉnh
  onReady?: (player: any) => void;  // Callback khi player sẵn sàng
  onError?: (error: any) => void;   // Callback khi có lỗi
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

Component tự động xử lý các events sau:

- **ready** - Player sẵn sàng
- **play** - Bắt đầu phát
- **pause** - Tạm dừng
- **timeupdate** - Cập nhật thời gian
- **loadedmetadata** - Metadata đã load
- **volumechange** - Thay đổi volume
- **ratechange** - Thay đổi tốc độ phát
- **error** - Lỗi phát video

### State Management

Component sử dụng Zustand store để quản lý state:

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
- Custom className được apply cho container

### Responsive Design

- `responsive: true` - Player tự động resize theo container
- `fluid: true` - Player sử dụng aspect ratio 16:9

## Error Handling

### Error Types

1. **Network Error** - Không thể kết nối đến stream
2. **Codec Error** - Browser không support codec
3. **Stream Error** - Stream không tồn tại hoặc offline

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

- Hiển thị loading spinner khi đang khởi tạo player
- Tự động ẩn loading khi player ready hoặc có lỗi

## Browser Compatibility

### HLS Support

- **Safari**: Native HLS support
- **Chrome/Firefox/Edge**: Sử dụng Video.js HLS plugin
- **Mobile**: Hỗ trợ đầy đủ trên iOS/Android

### Fallback

Nếu HLS không được support, component sẽ hiển thị error message.

## Testing

### Manual Testing

1. **Stream Loading** - Test với các stream URLs khác nhau
2. **Controls** - Test tất cả player controls
3. **Responsive** - Test trên các screen sizes khác nhau
4. **Error Scenarios** - Test với invalid URLs

### Debug Tools

Sử dụng admin debug panel để:
- Monitor player state
- Test different streams
- View player events
- Debug performance issues

## Dependencies

- `video.js` - Video player library
- `@mui/material` - UI components
- `zustand` - State management
- `react` - React hooks và lifecycle

## Related Components

- `VideoWrapper` - Wrapper component với error handling
- `VideoDebug` - Debug component cho admin panel
