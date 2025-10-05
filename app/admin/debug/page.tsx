'use client';

import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Alert,
  Divider
} from '@mui/material';
import { useUser } from '@clerk/nextjs';
import { FirebaseConfigDebug } from './components/FirebaseConfigDebug';
import { FirebaseAuthDebug } from './components/FirebaseAuthDebug';
import { CustomTokenDebug } from './components/CustomTokenDebug';
import { VideoPlayerDebug } from './components/VideoPlayerDebug';
import { SystemInfoDebug } from './components/SystemInfoDebug';
import { ChatManagementDebug } from './components/ChatManagementDebug';

export default function AdminDebugPage() {
  const { user, isLoaded } = useUser();

  // Security check: Only allow in development or for admin users
  if (!isLoaded) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">
          Access denied. Please sign in to access debug panel.
        </Alert>
      </Box>
    );
  }

  // Additional security: Only allow in development environment
  if (process.env.NODE_ENV === 'production') {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">
          Debug panel is not available in production environment.
        </Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🔧 Admin Debug Panel
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            StreamPulse - Development & Debug Tools
          </Typography>
          <Alert severity="warning" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
            ⚠️ This page is for development and debugging purposes only. 
            Do not use in production environment.
          </Alert>
        </Box>

        {/* Debug Sections */}
        <Grid container spacing={3}>
          {/* System Info */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <SystemInfoDebug />
            </Paper>
          </Grid>

          {/* Firebase Config */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <FirebaseConfigDebug />
            </Paper>
          </Grid>

          {/* Firebase Auth */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <FirebaseAuthDebug />
            </Paper>
          </Grid>

          {/* Custom Token */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <CustomTokenDebug />
            </Paper>
          </Grid>

          {/* Video Player */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <VideoPlayerDebug />
            </Paper>
          </Grid>

          {/* Chat Management */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <ChatManagementDebug />
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box mt={4} textAlign="center">
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            🔧 StreamPulse Admin Debug Panel - Built for development and troubleshooting
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
