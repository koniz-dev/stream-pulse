'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useVideoStore } from '@/stores';
import type { VideoPlayerProps } from '@/types';

// Video.js player options
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
      'audioTrackButton',
      'fullscreenToggle',
    ],
  },
};

export default function VideoPlayer({ 
  streamUrl, 
  className = '',
  onReady,
  onError 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    player,
    error,
    setReady,
    setPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setMuted,
    setPlaybackRate,
    setError,
  } = useVideoStore();

  // Stable callbacks to prevent unnecessary re-renders
  const handlePlayerReady = useCallback((playerInstance: any) => {
    setIsPlayerReady(true);
    setReady(true);
    setIsLoading(false);
    onReady?.(playerInstance);
  }, [setReady, onReady]);

  const handlePlayerError = useCallback((error: any) => {
    console.error('Video.js error:', error);
    setError('Failed to load video stream');
    setIsLoading(false);
    onError?.(error);
  }, [setError, onError]);

  useEffect(() => {
    if (!videoRef.current || !streamUrl) return;

    // Clean up existing player first
    if (playerRef.current && !playerRef.current.isDisposed()) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // Clear the container
    if (videoRef.current) {
      videoRef.current.innerHTML = '';
    }

    // Initialize Video.js player
    const videoElement = document.createElement('video-js');
    videoElement.className = 'vjs-default-skin';
    videoRef.current.appendChild(videoElement);

    const playerInstance = videojs(videoElement, {
      ...videoJsOptions,
      sources: [
        {
          src: streamUrl,
          type: 'application/x-mpegURL', // HLS format
        },
      ],
    });

    playerRef.current = playerInstance;
    setIsLoading(true);

    // Player event listeners
    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    const handleTimeUpdate = () => {
      const currentTime = playerInstance.currentTime();
      if (typeof currentTime === 'number') {
        setCurrentTime(currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      const duration = playerInstance.duration();
      if (typeof duration === 'number') {
        setDuration(duration);
      }
    };

    const handleVolumeChange = () => {
      const volume = playerInstance.volume();
      const muted = playerInstance.muted();
      if (typeof volume === 'number') {
        setVolume(volume);
      }
      if (typeof muted === 'boolean') {
        setMuted(muted);
      }
    };

    const handleRateChange = () => {
      const rate = playerInstance.playbackRate();
      if (typeof rate === 'number') {
        setPlaybackRate(rate);
      }
    };

    // Add event listeners
    playerInstance.ready(() => handlePlayerReady(playerInstance));
    playerInstance.on('play', handlePlay);
    playerInstance.on('pause', handlePause);
    playerInstance.on('timeupdate', handleTimeUpdate);
    playerInstance.on('loadedmetadata', handleLoadedMetadata);
    playerInstance.on('volumechange', handleVolumeChange);
    playerInstance.on('ratechange', handleRateChange);
    playerInstance.on('error', handlePlayerError);

    // Cleanup function
    return () => {
      if (playerInstance && !playerInstance.isDisposed()) {
        playerInstance.dispose();
      }
      playerRef.current = null;
    };
  }, [streamUrl, handlePlayerReady, handlePlayerError, setPlaying, setCurrentTime, setDuration, setVolume, setMuted, setPlaybackRate]);

  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        height: 'auto',
        '& .video-js': {
          width: '100%',
          height: 'auto',
        }
      }} 
      className={className}
    >
      <Box 
        ref={videoRef} 
        sx={{ 
          width: '100%', 
          height: 'auto',
          '& .vjs-default-skin': {
            width: '100%',
            height: 'auto',
          }
        }}
      />
      
      {/* Loading overlay */}
      <Backdrop
        open={isLoading}
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" color="white">
          Loading stream...
        </Typography>
      </Backdrop>
      
      {/* Error overlay */}
      <Backdrop
        open={!!error}
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(211, 47, 47, 0.75)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="h6" color="white" textAlign="center">
          Stream Error
        </Typography>
        <Typography variant="body2" color="white" textAlign="center">
          {error}
        </Typography>
      </Backdrop>
    </Box>
  );
}
