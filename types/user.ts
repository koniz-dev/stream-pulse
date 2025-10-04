// User related types
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}

export interface UserState {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserActions {
  setUser: (user: UserProfile | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

export type UserStore = UserState & UserActions;
