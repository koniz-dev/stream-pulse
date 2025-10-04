// Video related types
export interface VideoPlayer {
  player: any; // Video.js player instance
  isReady: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  quality: string;
  streamUrl: string | null;
  isLive?: boolean; // For live streaming
  buffered?: number; // Buffered time
}

export interface VideoState {
  player: VideoPlayer;
  isLoading: boolean;
  error: string | null;
}

export interface VideoActions {
  setPlayer: (player: any) => void;
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

export type VideoStore = VideoState & VideoActions;

// VideoPlayer component props
export interface VideoPlayerProps {
  streamUrl: string | null;
  className?: string;
  onReady?: (player: any) => void;
  onError?: (error: any) => void;
}
