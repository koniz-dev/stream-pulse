'use client';

import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip, 
  Stack, 
  Skeleton,
  Fade,
  Alert,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  VolumeUp, 
  VolumeOff,
  Fullscreen,
  Refresh
} from '@mui/icons-material';
import VideoPlayer from './VideoPlayer';

interface VideoPlayerWrapperProps {
  streamUrl?: string;
  className?: string;
}

// Demo HLS stream URLs for testing
const DEMO_STREAMS = {
  bigBuckBunny: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  appleDemo: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
  testStream: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
};

export default function VideoPlayerWrapper({ 
  streamUrl = DEMO_STREAMS.bigBuckBunny,
  className = ''
}: VideoPlayerWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayerError = (error: any) => {
    console.error('Video player error:', error);
    setHasError(true);
    setIsLoading(false);
  };

  const handlePlayerReady = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    // Force re-render of VideoPlayer
    window.location.reload();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '4xl', mx: 'auto' }} className={className}>
      <Paper 
        elevation={8} 
        sx={{ 
          bgcolor: 'black', 
          borderRadius: 2, 
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            boxShadow: 12
          },
          transition: 'box-shadow 0.3s ease-in-out'
        }}
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <Fade in={isLoading}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="100%" 
                sx={{ 
                  bgcolor: 'grey.800',
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                  }
                }} 
              />
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <Typography variant="h6" color="white" gutterBottom>
                  🎬 Loading Stream...
                </Typography>
                <Typography variant="body2" color="grey.300">
                  Preparing your viewing experience
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}

        {/* Error State */}
        {hasError && (
          <Fade in={hasError}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.900',
              p: 3
            }}>
              <Alert 
                severity="error" 
                sx={{ 
                  maxWidth: 400,
                  bgcolor: 'error.dark',
                  color: 'white',
                  '& .MuiAlert-icon': { color: 'white' }
                }}
                action={
                  <Button 
                    color="inherit" 
                    size="small" 
                    onClick={handleRetry}
                    startIcon={<Refresh />}
                  >
                    Retry
                  </Button>
                }
              >
                <Typography variant="h6" gutterBottom>
                  Stream Error
                </Typography>
                <Typography variant="body2">
                  Unable to load the video stream. Please check your connection and try again.
                </Typography>
              </Alert>
            </Box>
          </Fade>
        )}

        {/* Video Player */}
        <Box sx={{ 
          opacity: isLoading || hasError ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}>
          <VideoPlayer
            streamUrl={streamUrl}
            onError={handlePlayerError}
            onReady={handlePlayerReady}
            className="w-full"
          />
        </Box>

        {/* Stream Status Overlay */}
        <Fade in={!isLoading && !hasError}>
          <Box sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            zIndex: 1 
          }}>
            <Stack direction="row" spacing={1}>
              <Chip 
                label="LIVE" 
                color="error" 
                size="small"
                sx={{ 
                  fontWeight: 'bold',
                  animation: 'pulse 2s infinite'
                }}
              />
              <Chip 
                label="HLS" 
                color="primary" 
                size="small" 
                variant="outlined"
              />
            </Stack>
          </Box>
        </Fade>

      </Paper>
    </Box>
  );
}
