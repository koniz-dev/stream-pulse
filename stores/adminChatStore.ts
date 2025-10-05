import { create } from 'zustand';
import { ref, onValue, query, orderByChild, limitToLast, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { ChatMessage } from './chatStore';

interface AdminChatState {
  allMessages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  
  // Actions
  loadAllMessages: () => void;
  deleteMessage: (messageId: string, deletedBy?: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAdminChatStore = create<AdminChatState>((set) => ({
  allMessages: [],
  isLoading: false,
  error: null,
  isConnected: false,

  loadAllMessages: () => {
    try {
      set({ isLoading: true, error: null });
      
      const messagesRef = ref(database, 'chat/messages');
      const messagesQuery = query(
        messagesRef,
        orderByChild('timestamp'),
        limitToLast(200) // Load more messages for admin view
      );

      const unsubscribe = onValue(messagesQuery, (snapshot) => {
        const messagesData = snapshot.val();
        
        if (messagesData) {
          const messages: ChatMessage[] = Object.entries(messagesData).map(([id, data]: [string, any]) => ({
            id,
            ...data
          }));
          
          set({ 
            allMessages: messages.sort((a, b) => a.timestamp - b.timestamp),
            isLoading: false,
            isConnected: true
          });
        } else {
          set({ 
            allMessages: [],
            isLoading: false,
            isConnected: true
          });
        }
      }, (error) => {
        console.error('Error loading all messages:', error);
        set({ 
          error: 'Failed to load messages',
          isLoading: false,
          isConnected: false
        });
      });

      // Store unsubscribe function for cleanup
      return unsubscribe;
      
    } catch (error) {
      console.error('Error setting up all messages listener:', error);
      set({ 
        error: 'Failed to connect to chat',
        isLoading: false,
        isConnected: false
      });
      return () => {}; // Return empty function on error
    }
  },

  deleteMessage: async (messageId: string, deletedBy?: string) => {
    try {
      set({ error: null });
      
      const messageRef = ref(database, `chat/messages/${messageId}`);
      const updateData = {
        isDeleted: true,
        deletedAt: Date.now(),
        deletedBy: deletedBy || 'admin'
      };
      
      await update(messageRef, updateData);
      
    } catch (error) {
      console.error('Error soft deleting message:', error);
      set({ error: 'Failed to delete message' });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));
