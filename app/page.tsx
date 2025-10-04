'use client';

import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid,
  Chip,
  Paper,
  Avatar,
  Stack
} from '@mui/material';
import { VideoPlayerWrapper } from '@/components';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            StreamPulse
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Live Streaming & Chat Platform
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Powered by Video.js v8.23.4 with HLS streaming support
          </Typography>
        </Box>

        {/* Video Player */}
        <Box mb={4}>
          <VideoPlayerWrapper />
        </Box>

        {/* Features */}
        <Grid container spacing={3} mt={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3} sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56 }}>
                  🎥
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  Video Streaming
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  HLS streaming support with Video.js player. Responsive design with full controls.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3} sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'secondary.main', mb: 2, width: 56, height: 56 }}>
                  💬
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  Real-time Chat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Firebase Realtime Database integration for live chat during streaming.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3} sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'success.main', mb: 2, width: 56, height: 56 }}>
                  🔐
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clerk authentication with username/password and social login support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tech Stack */}
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            🛠️ Tech Stack
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box textAlign="center">
                <Chip 
                  label="Next.js 15.5.4" 
                  color="primary" 
                  variant="outlined"
                  sx={{ mb: 1, fontWeight: 'bold' }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Frontend Framework
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box textAlign="center">
                <Chip 
                  label="Video.js 8.23.4" 
                  color="success" 
                  variant="outlined"
                  sx={{ mb: 1, fontWeight: 'bold' }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Video Player
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box textAlign="center">
                <Chip 
                  label="Firebase 12.3.0" 
                  color="warning" 
                  variant="outlined"
                  sx={{ mb: 1, fontWeight: 'bold' }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Realtime Database
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box textAlign="center">
                <Chip 
                  label="Clerk 6.33.2" 
                  color="secondary" 
                  variant="outlined"
                  sx={{ mb: 1, fontWeight: 'bold' }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Authentication
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
