'use client';

import { Box, Paper, Typography, Chip, Stack } from '@mui/material';
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

  const handlePlayerReady = (player: any) => {
    console.log('Video player is ready:', player);
  };

  const handlePlayerError = (error: any) => {
    console.error('Video player error:', error);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '4xl', mx: 'auto' }} className={className}>
      <Paper 
        elevation={8} 
        sx={{ 
          bgcolor: 'black', 
          borderRadius: 2, 
          overflow: 'hidden',
          '&:hover': {
            boxShadow: 12
          }
        }}
      >
        <VideoPlayer
          streamUrl={streamUrl}
          onReady={handlePlayerReady}
          onError={handlePlayerError}
          className="w-full"
        />
      </Paper>
      
      {/* Stream info */}
      <Paper elevation={2} sx={{ mt: 2, p: 3, bgcolor: 'grey.100' }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          📡 Stream Information
        </Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary" component="span">
              <strong>Stream URL:</strong>{' '}
            </Typography>
            <Typography variant="body2" component="span" sx={{ 
              fontFamily: 'monospace', 
              bgcolor: 'grey.200', 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              fontSize: '0.75rem'
            }}>
              {streamUrl}
            </Typography>
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip label="HLS Format" size="small" color="primary" variant="outlined" />
            <Chip label="Video.js v8.23.4" size="small" color="secondary" variant="outlined" />
            <Chip label="Live Streaming" size="small" color="success" variant="outlined" />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
