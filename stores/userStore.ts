import { create } from 'zustand';
import type { UserStore } from '@/types';

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ 
    currentUser: user,
    isAuthenticated: !!user 
  }),
  
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  updateUserProfile: (updates) => set((state) => ({
    currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null
  })),
  
  logout: () => set({ 
    currentUser: null, 
    isAuthenticated: false,
    error: null 
  }),
}));
