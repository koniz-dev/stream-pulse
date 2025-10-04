'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

export function FirebaseAuthDebug() {
  const { firebaseUser, isLoading, error, isAuthenticated } = useFirebaseAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [testLoading, setTestLoading] = useState(false);

  const testFirebaseAuth = async () => {
    setTestLoading(true);
    setTestResult('Testing Firebase Auth with dummy credentials...');
    
    try {
      // Try to sign in with dummy credentials to test if Firebase Auth is enabled
      await signInWithEmailAndPassword(auth, 'test@example.com', 'password123');
      setTestResult('✅ Firebase Auth is working! (Unexpected success)');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setTestResult('✅ Firebase Auth is ENABLED! (Expected error for dummy credentials)');
      } else if (err.code === 'auth/configuration-not-found') {
        setTestResult('❌ Firebase Auth is NOT ENABLED or config is wrong');
      } else {
        setTestResult(`❌ Firebase Auth Error: ${err.code} - ${err.message}`);
      }
    } finally {
      setTestLoading(false);
    }
  };

  const testAnonymousAuth = async () => {
    setTestLoading(true);
    setTestResult('Testing Firebase Anonymous Auth...');
    
    try {
      const userCredential = await signInAnonymously(auth);
      setTestResult(`✅ Anonymous Auth is WORKING! User ID: ${userCredential.user.uid}`);
      
      // Sign out immediately
      await auth.signOut();
    } catch (err: any) {
      if (err.code === 'auth/configuration-not-found') {
        setTestResult('❌ Firebase Auth is NOT ENABLED in Firebase Console');
      } else if (err.code === 'auth/operation-not-allowed') {
        setTestResult('❌ Anonymous sign-in is not enabled in Firebase Console');
      } else {
        setTestResult(`❌ Firebase Error: ${err.code} - ${err.message}`);
      }
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        🔥 Firebase Authentication
      </Typography>
      
      {/* Current Status */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Current Authentication Status</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip 
            label={`Firebase User: ${isAuthenticated ? 'Logged In' : 'Not Logged In'}`} 
            color={isAuthenticated ? 'success' : 'default'} 
            size="small" 
          />
          <Chip 
            label={`Loading: ${isLoading ? 'Yes' : 'No'}`} 
            color={isLoading ? 'warning' : 'default'} 
            size="small" 
          />
          {error && (
            <Chip 
              label="Error" 
              color="error" 
              size="small" 
            />
          )}
        </Stack>
      </Box>

      {/* User Info */}
      {firebaseUser && (
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>Firebase User Information</Typography>
          <Stack spacing={1}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                UID: {firebaseUser.uid}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Email: {firebaseUser.email || 'No email'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Anonymous: {firebaseUser.isAnonymous ? 'Yes' : 'No'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Created: {firebaseUser.metadata.creationTime}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Test Buttons */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Authentication Tests</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button 
            variant="outlined" 
            size="small" 
            onClick={testFirebaseAuth}
            disabled={testLoading}
          >
            Test Email/Password
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={testAnonymousAuth}
            disabled={testLoading}
          >
            Test Anonymous
          </Button>
        </Stack>
      </Box>

      {/* Test Result */}
      {testResult && (
        <Alert severity={testResult.includes('✅') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {testResult}
        </Alert>
      )}

      {/* Detailed User Info */}
      {firebaseUser && (
        <Accordion>
          <AccordionSummary expandIcon={<span>▼</span>}>
            <Typography variant="subtitle2">Detailed User Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="pre" sx={{ 
              fontSize: '0.75rem', 
              overflow: 'auto', 
              bgcolor: 'grey.100', 
              p: 2, 
              borderRadius: 1 
            }}>
              {JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                isAnonymous: firebaseUser.isAnonymous,
                emailVerified: firebaseUser.emailVerified,
                metadata: {
                  creationTime: firebaseUser.metadata.creationTime,
                  lastSignInTime: firebaseUser.metadata.lastSignInTime
                },
                providerData: firebaseUser.providerData
              }, null, 2)}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
