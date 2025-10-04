'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert
} from '@mui/material';

export function FirebaseConfigDebug() {
  const [showRaw, setShowRaw] = useState(false);

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingConfigKeys = requiredConfigKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);
  const hasAllConfig = missingConfigKeys.length === 0;

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        🔧 Firebase Configuration
      </Typography>
      
      {/* Status */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Configuration Status</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip 
            label={hasAllConfig ? '✅ Complete' : '❌ Incomplete'} 
            color={hasAllConfig ? 'success' : 'error'} 
            size="small" 
          />
          <Chip 
            label={`Missing: ${missingConfigKeys.length}`} 
            color={missingConfigKeys.length > 0 ? 'error' : 'success'} 
            size="small" 
          />
        </Stack>
      </Box>

      {/* Missing Keys Alert */}
      {missingConfigKeys.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Missing required configuration keys: {missingConfigKeys.join(', ')}
        </Alert>
      )}

      {/* Config Values */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>Configuration Values</Typography>
        <Stack spacing={1}>
          {Object.entries(firebaseConfig).map(([key, value]) => (
            <Box key={key} display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" sx={{ minWidth: 120, fontFamily: 'monospace' }}>
                {key}:
              </Typography>
              <Chip 
                label={value ? `${value.toString().substring(0, 20)}...` : 'undefined'} 
                color={value ? 'success' : 'error'} 
                size="small" 
                variant="outlined"
              />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Raw Config */}
      <Accordion>
        <AccordionSummary expandIcon={<span>▼</span>}>
          <Typography variant="subtitle2">Raw Configuration Object</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="pre" sx={{ 
            fontSize: '0.75rem', 
            overflow: 'auto', 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1 
          }}>
            {JSON.stringify(firebaseConfig, null, 2)}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Debug Info */}
      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>Debug Information</Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              API Key starts with: {firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 10) + '...' : 'undefined'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Auth Domain: {firebaseConfig.authDomain || 'undefined'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Project ID: {firebaseConfig.projectId || 'undefined'}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
