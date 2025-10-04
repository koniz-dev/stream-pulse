'use client';

import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useUser } from '@clerk/nextjs';

export function AuthStatus() {
  const { user: clerkUser } = useUser();
  const { firebaseUser, isLoading, error, isAuthenticated } = useFirebaseAuth();

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-600">Syncing authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        Authentication Status
      </h3>
      
      <div className="space-y-2">
        <div>
          <span className="font-medium">Clerk User: </span>
          <span className={clerkUser ? 'text-green-600' : 'text-red-600'}>
            {clerkUser ? 'Logged in' : 'Not logged in'}
          </span>
        </div>
        
        <div>
          <span className="font-medium">Firebase User: </span>
          <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
            {isAuthenticated ? 'Logged in' : 'Not logged in'}
          </span>
        </div>
        
        {clerkUser && (
          <div>
            <span className="font-medium">Clerk ID: </span>
            <span className="text-gray-600">{clerkUser.id}</span>
          </div>
        )}
        
        {firebaseUser && (
          <div>
            <span className="font-medium">Firebase UID: </span>
            <span className="text-gray-600">{firebaseUser.uid}</span>
          </div>
        )}
      </div>
    </div>
  );
}
