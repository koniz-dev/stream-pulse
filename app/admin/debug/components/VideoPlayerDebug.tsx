'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useVideoStore } from '@/stores';

export function VideoPlayerDebug() {
  const { player, isLoading, error } = useVideoStore();
  const [testStreamUrl, setTestStreamUrl] = useState('');
  const [testResult, setTestResult] = useState<string>('');

  // Demo HLS stream URLs for testing
  const DEMO_STREAMS = {
    bigBuckBunny: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    appleDemo: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    testStream: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
    bigBuckBunny2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  };

  const testStream = async (url: string) => {
    setTestResult(`Testing stream: ${url}`);
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        setTestResult(`✅ Stream is accessible! Status: ${response.status}`);
      } else {
        setTestResult(`❌ Stream error! Status: ${response.status}`);
      }
    } catch (err) {
      setTestResult(`❌ Network error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const getVideoPlayerInfo = () => {
    if (!player.player) {
      return {
        status: 'No player instance',
        isReady: player.isReady,
        isPlaying: player.isPlaying,
        currentTime: player.currentTime,
        duration: player.duration,
        volume: player.volume,
        isMuted: player.isMuted,
        playbackRate: player.playbackRate,
        quality: player.quality,
        streamUrl: player.streamUrl,
        isLive: player.isLive,
        buffered: player.buffered
      };
    }

    try {
      const videoElement = player.player.el();
      const tech = player.player.tech();
      
      return {
        status: 'Player instance available',
        isReady: player.isReady,
        isPlaying: player.isPlaying,
        currentTime: player.currentTime,
        duration: player.duration,
        volume: player.volume,
        isMuted: player.isMuted,
        playbackRate: player.playbackRate,
        quality: player.quality,
        streamUrl: player.streamUrl,
        isLive: player.isLive,
        buffered: player.buffered,
        playerInfo: {
          id: player.player.id(),
          disposed: player.player.isDisposed(),
          paused: player.player.paused(),
          ended: player.player.ended(),
          muted: player.player.muted(),
          volume: player.player.volume(),
          currentTime: player.player.currentTime(),
          duration: player.player.duration(),
          readyState: videoElement?.readyState,
          networkState: videoElement?.networkState,
          videoWidth: videoElement?.videoWidth,
          videoHeight: videoElement?.videoHeight,
          tech: tech?.name_ || 'Unknown'
        }
      };
    } catch (err) {
      return {
        status: 'Error getting player info',
        error: err instanceof Error ? err.message : 'Unknown error',
        isReady: player.isReady,
        isPlaying: player.isPlaying,
        currentTime: player.currentTime,
        duration: player.duration,
        volume: player.volume,
        isMuted: player.isMuted,
        playbackRate: player.playbackRate,
        quality: player.quality,
        streamUrl: player.streamUrl,
        isLive: player.isLive,
        buffered: player.buffered
      };
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        🎥 Video Player Debug
      </Typography>
      
      {/* Player Status */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Player Status</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip 
            label={`Ready: ${player.isReady ? 'Yes' : 'No'}`} 
            color={player.isReady ? 'success' : 'default'} 
            size="small" 
          />
          <Chip 
            label={`Playing: ${player.isPlaying ? 'Yes' : 'No'}`} 
            color={player.isPlaying ? 'success' : 'default'} 
            size="small" 
          />
          <Chip 
            label={`Loading: ${isLoading ? 'Yes' : 'No'}`} 
            color={isLoading ? 'warning' : 'default'} 
            size="small" 
          />
          {error && (
            <Chip 
              label="Error" 
              color="error" 
              size="small" 
            />
          )}
        </Stack>
      </Box>

      {/* Player Info */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Player Information</Typography>
        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Current Time:</Typography>
            <Typography variant="body2">{player.currentTime.toFixed(2)}s</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Duration:</Typography>
            <Typography variant="body2">{player.duration.toFixed(2)}s</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Volume:</Typography>
            <Typography variant="body2">{(player.volume * 100).toFixed(0)}%</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Playback Rate:</Typography>
            <Typography variant="body2">{player.playbackRate}x</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Quality:</Typography>
            <Typography variant="body2">{player.quality}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Stream URL:</Typography>
            <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {player.streamUrl || 'None'}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stream Testing */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Stream Testing</Typography>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Demo Streams</InputLabel>
            <Select
              value={testStreamUrl}
              label="Demo Streams"
              onChange={(e) => setTestStreamUrl(e.target.value)}
            >
              {Object.entries(DEMO_STREAMS).map(([key, url]) => (
                <MenuItem key={key} value={url}>
                  {key} - {url.substring(0, 50)}...
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            size="small"
            label="Custom Stream URL"
            value={testStreamUrl}
            onChange={(e) => setTestStreamUrl(e.target.value)}
            placeholder="Enter HLS stream URL"
          />
          
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => testStream(testStreamUrl)}
            disabled={!testStreamUrl}
          >
            Test Stream Accessibility
          </Button>
        </Stack>
      </Box>

      {/* Test Result */}
      {testResult && (
        <Alert severity={testResult.includes('✅') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {testResult}
        </Alert>
      )}

      {/* Detailed Player Info */}
      <Accordion>
        <AccordionSummary expandIcon={<span>▼</span>}>
          <Typography variant="subtitle2">Detailed Player Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="pre" sx={{ 
            fontSize: '0.75rem', 
            overflow: 'auto', 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1 
          }}>
            {JSON.stringify(getVideoPlayerInfo(), null, 2)}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
