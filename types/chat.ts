// Chat related types
export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  userImage?: string;
  message: string;
  timestamp: number;
  isVisible: boolean;
  createdAt?: string; // ISO string for Firebase
  updatedAt?: string; // ISO string for Firebase
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

export interface ChatActions {
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  removeMessage: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConnected: (connected: boolean) => void;
  clearMessages: () => void;
}

export type ChatStore = ChatState & ChatActions;
