'use client';

import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { VideoPlayerWrapper, Chat, Header, Footer } from '@/components';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'grey.50'
    }}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          {/* Page Title */}
          <Fade in timeout={800}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                🎬 StreamPulse
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Live streaming platform with real-time chat. Watch, chat, and connect with viewers worldwide.
              </Typography>
            </Box>
          </Fade>

          {/* Content Grid */}
          <Grid container spacing={3}>
            {/* Video Player */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Fade in timeout={1000}>
                <Box>
                  <VideoPlayerWrapper />
                  
                  {/* Stream Info */}
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      mt: 2, 
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      📺 Live Stream
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Currently playing: Big Buck Bunny Demo Stream
                    </Typography>
                  </Paper>
                </Box>
              </Fade>
            </Grid>
            
            {/* Chat */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Fade in timeout={1200}>
                <Box>
                  <Chat />
                </Box>
              </Fade>
            </Grid>
          </Grid>

          {/* Features Section */}
          <Fade in timeout={1400}>
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                ✨ Features
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>🎥</Typography>
                    <Typography variant="h6" gutterBottom>HLS Streaming</Typography>
                    <Typography variant="body2" color="text.secondary">
                      High-quality live streaming with Video.js and HLS protocol
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>💬</Typography>
                    <Typography variant="h6" gutterBottom>Real-time Chat</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Instant messaging with Firebase Realtime Database
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>🔐</Typography>
                    <Typography variant="h6" gutterBottom>Secure Auth</Typography>
                    <Typography variant="body2" color="text.secondary">
                      User authentication with Clerk and social login
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
}
