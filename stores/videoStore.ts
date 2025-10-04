import { create } from 'zustand';
import type { VideoStore, VideoPlayer } from '@/types';

const initialPlayerState: VideoPlayer = {
  player: null,
  isReady: false,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  playbackRate: 1,
  quality: 'auto',
  streamUrl: null,
  isLive: false,
  buffered: 0,
};

export const useVideoStore = create<VideoStore>((set, get) => ({
  player: initialPlayerState,
  isLoading: false,
  error: null,

  setPlayer: (player) => set((state) => ({
    player: { ...state.player, player }
  })),
  
  setReady: (ready) => set((state) => ({
    player: { ...state.player, isReady: ready }
  })),
  
  setPlaying: (playing) => set((state) => ({
    player: { ...state.player, isPlaying: playing }
  })),
  
  setCurrentTime: (time) => set((state) => ({
    player: { ...state.player, currentTime: time }
  })),
  
  setDuration: (duration) => set((state) => ({
    player: { ...state.player, duration }
  })),
  
  setVolume: (volume) => set((state) => ({
    player: { ...state.player, volume }
  })),
  
  setMuted: (muted) => set((state) => ({
    player: { ...state.player, isMuted: muted }
  })),
  
  setPlaybackRate: (rate) => set((state) => ({
    player: { ...state.player, playbackRate: rate }
  })),
  
  setQuality: (quality) => set((state) => ({
    player: { ...state.player, quality }
  })),
  
  setStreamUrl: (url) => set((state) => ({
    player: { ...state.player, streamUrl: url }
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  resetPlayer: () => set({ 
    player: initialPlayerState,
    error: null 
  }),
}));
