import { create } from 'zustand';
import { ref, push, onValue, query, orderByChild, limitToLast, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { logger } from '@/lib/logger';

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
  avatar?: string;
  isDeleted?: boolean;
  deletedAt?: number;
  deletedBy?: string;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  
  // Actions
  sendMessage: (message: string, userId: string, username: string, avatar?: string) => Promise<void>;
  loadMessages: () => void;
  clearMessages: () => void;
  deleteMessage: (messageId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  isConnected: false,

  sendMessage: async (message: string, userId: string, username: string, avatar?: string) => {
    try {
      set({ error: null });
      
      const newMessage: Omit<ChatMessage, 'id'> = {
        userId,
        username,
        message: message.trim(),
        timestamp: Date.now(),
        avatar
      };

      const messagesRef = ref(database, 'chat/messages');
      await push(messagesRef, newMessage);
      
    } catch (error) {
      logger.error('Failed to send message', 'chat-store', error as Error);
      set({ error: 'Failed to send message' });
    }
  },

  loadMessages: () => {
    try {
      set({ isLoading: true, error: null });
      
      const messagesRef = ref(database, 'chat/messages');
      const messagesQuery = query(
        messagesRef,
        orderByChild('timestamp'),
        limitToLast(100) // Limit to last 100 messages
      );

      const unsubscribe = onValue(messagesQuery, (snapshot) => {
        const messagesData = snapshot.val();
        
        if (messagesData) {
          const messages: ChatMessage[] = Object.entries(messagesData)
            .map(([id, data]: [string, any]) => ({
              id,
              ...data
            }))
            .filter((message: ChatMessage) => !message.isDeleted); // Filter out soft deleted messages
          
          set({ 
            messages: messages.sort((a, b) => a.timestamp - b.timestamp),
            isLoading: false,
            isConnected: true
          });
        } else {
          set({ 
            messages: [],
            isLoading: false,
            isConnected: true
          });
        }
      }, (error) => {
        logger.error('Failed to load messages', 'chat-store', error as Error);
        set({ 
          error: 'Failed to load messages',
          isLoading: false,
          isConnected: false
        });
      });

      // Store unsubscribe function for cleanup
      return unsubscribe;
      
    } catch (error) {
      logger.error('Failed to setup messages listener', 'chat-store', error as Error);
      set({ 
        error: 'Failed to connect to chat',
        isLoading: false,
        isConnected: false
      });
      return () => {}; // Return empty function on error
    }
  },

  clearMessages: () => {
    set({ messages: [] });
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
      logger.error('Failed to soft delete message', 'chat-store', error as Error);
      set({ error: 'Failed to delete message' });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));