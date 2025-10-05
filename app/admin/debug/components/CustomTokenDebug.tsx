'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField
} from '@mui/material';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function CustomTokenDebug() {
  const [testResult, setTestResult] = useState<string>('');
  const [testLoading, setTestLoading] = useState(false);
  const [customToken, setCustomToken] = useState<string>('');
  const [tokenResult, setTokenResult] = useState<any>(null);

  const testCustomTokenAPI = async () => {
    setTestLoading(true);
    setTestResult('Testing custom token API...');
    
    try {
      const response = await fetch('/api/auth/firebase-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.error || 'Unknown error'}`);
      }
      
      const data = await response.json();
      setTestResult(`✅ API works! Got token: ${data.customToken ? 'Yes' : 'No'}`);
      setCustomToken(data.customToken || '');
      setTokenResult(data);
      
    } catch (err) {
      setTestResult(`❌ API Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setTestLoading(false);
    }
  };

  const testDirectFirebase = async () => {
    if (!customToken) {
      setTestResult('❌ No custom token available. Please test API first.');
      return;
    }

    setTestLoading(true);
    setTestResult('Testing direct Firebase sign-in with custom token...');
    
    try {
      const userCredential = await signInWithCustomToken(auth, customToken);
      setTestResult(`✅ SUCCESS! Firebase user: ${userCredential.user.uid}`);
    } catch (err: any) {
      setTestResult(`❌ ERROR: ${err.code} - ${err.message}`);
    } finally {
      setTestLoading(false);
    }
  };

  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }
      
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      return { header, payload };
    } catch {
      return { error: 'Failed to decode JWT' };
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        🎫 Custom Token Debug
      </Typography>
      
      {/* Test Buttons */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Custom Token Tests</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button 
            variant="outlined" 
            size="small" 
            onClick={testCustomTokenAPI}
            disabled={testLoading}
          >
            Test API Endpoint
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={testDirectFirebase}
            disabled={testLoading || !customToken}
          >
            Test Direct Firebase
          </Button>
        </Stack>
      </Box>

      {/* Test Result */}
      {testResult && (
        <Alert severity={testResult.includes('✅') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {testResult}
        </Alert>
      )}

      {/* Custom Token Display */}
      {customToken && (
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>Custom Token</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={customToken}
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
              sx: { fontFamily: 'monospace', fontSize: '0.75rem' }
            }}
          />
        </Box>
      )}

      {/* JWT Decode */}
      {customToken && (
      <Accordion>
        <AccordionSummary expandIcon={<span>▼</span>}>
          <Typography variant="subtitle2">JWT Token Decode</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <Box component="pre" sx={{ 
              fontSize: '0.75rem', 
              overflow: 'auto', 
              bgcolor: 'grey.100', 
              p: 2, 
              borderRadius: 1 
            }}>
              {JSON.stringify(decodeJWT(customToken), null, 2)}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {/* API Response */}
      {tokenResult && (
      <Accordion>
        <AccordionSummary expandIcon={<span>▼</span>}>
          <Typography variant="subtitle2">API Response</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <Box component="pre" sx={{ 
              fontSize: '0.75rem', 
              overflow: 'auto', 
              bgcolor: 'grey.100', 
              p: 2, 
              borderRadius: 1 
            }}>
              {JSON.stringify(tokenResult, null, 2)}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Instructions */}
      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>Instructions</Typography>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            1. Click &quot;Test API Endpoint&quot; to generate a custom token
          </Typography>
          <Typography variant="body2" color="text.secondary">
            2. Click &quot;Test Direct Firebase&quot; to test the token with Firebase
          </Typography>
          <Typography variant="body2" color="text.secondary">
            3. Check JWT decode to see token contents
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
