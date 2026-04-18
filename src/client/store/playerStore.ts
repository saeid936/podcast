import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artistName: string;
  coverUrl?: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  isLiked: boolean;
  play: (track?: Track) => void;
  pause: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  toggleLike: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  duration: 0,
  isLiked: false,
  play: (track) => set((state) => ({
    currentTrack: track !== undefined ? track : state.currentTrack,
    isPlaying: true,
    isLiked: false, // In a real app, this would be fetched from DB
  })),
  pause: () => set({ isPlaying: false }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  toggleLike: () => set((state) => ({ isLiked: !state.isLiked })),
}));
