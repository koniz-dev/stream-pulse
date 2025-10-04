import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { signInWithCustomToken, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useFirebaseAuth() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isSigningIn = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const syncAuth = async () => {
      if (!clerkLoaded) return;
      
      // Prevent multiple simultaneous sign-in attempts
      if (isSigningIn.current) {
        return;
      }

      try {
        setError(null);

        if (clerkUser && !firebaseUser) {
          // User is signed in with Clerk but not Firebase
          isSigningIn.current = true;
          await signInToFirebase();
          isSigningIn.current = false;
        } else if (!clerkUser && firebaseUser) {
          // User is signed out from Clerk but still signed in to Firebase
          await signOut(auth);
        }
      } catch (err) {
        console.error('Error syncing auth:', err);
        setError(err instanceof Error ? err.message : 'Authentication sync failed');
        isSigningIn.current = false;
      }
    };

    syncAuth();
  }, [clerkUser, clerkLoaded, firebaseUser]);

  const signInToFirebase = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/firebase-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to get custom token`);
      }

      const { customToken } = await response.json();
      
      if (!customToken) {
        throw new Error('No custom token received from server');
      }

      await signInWithCustomToken(auth, customToken);
    } catch (err) {
      console.error('Error signing in to Firebase:', err);
      const errorMessage = err instanceof Error ? err.message : 'Firebase sign-in failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutFromFirebase = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out from Firebase:', err);
      setError(err instanceof Error ? err.message : 'Firebase sign-out failed');
    }
  };

  return {
    firebaseUser,
    isLoading,
    error,
    signInToFirebase,
    signOutFromFirebase,
    isAuthenticated: !!firebaseUser,
  };
}
