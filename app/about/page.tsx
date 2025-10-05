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
} from '@mui/material';
import { Header } from '@/components';

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* StreamPulse Introduction */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎬 StreamPulse
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Live Streaming & Chat Platform
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8, textAlign: 'justify' }}>
            StreamPulse is a cutting-edge live streaming platform that brings together the best of modern web technologies 
            to deliver an exceptional viewing and interaction experience. Whether you're a content creator, educator, 
            or entertainment enthusiast, StreamPulse provides the tools you need to connect with your audience in real-time. 
            Built with the latest technologies including Next.js, Video.js, Firebase, and Clerk, our platform ensures 
            high-quality streaming, seamless real-time chat, and secure user authentication.
          </Typography>
        </Box>

        {/* Features */}
        <Box mt={6}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 4
          }}>
            ✨ Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={8} sx={{ 
                height: '100%', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%', 
                    width: 80, 
                    height: 80, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '2rem'
                  }}>
                    🎥
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Video Streaming
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                    HLS streaming support with Video.js player. Responsive design with full controls and professional-grade quality.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={8} sx={{ 
                height: '100%', 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%', 
                    width: 80, 
                    height: 80, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '2rem'
                  }}>
                    💬
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Real-time Chat
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                    Firebase Realtime Database integration for instant messaging and live audience engagement during streaming.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={8} sx={{ 
                height: '100%', 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%', 
                    width: 80, 
                    height: 80, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '2rem'
                  }}>
                    🔐
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Authentication
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                    Clerk authentication with username/password and social login support for secure user management.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Tech Stack */}
        <Box mt={8}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 4
          }}>
            🛠️ Technology Stack
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={4} sx={{ 
                height: '100%',
                background: 'linear-gradient(45deg, #000000 30%, #434343 90%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>⚛️</Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Next.js 15.5.4
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    React Framework
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={4} sx={{ 
                height: '100%',
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(255,107,107,0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>🎬</Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Video.js 8.23.4
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Video Player
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={4} sx={{ 
                height: '100%',
                background: 'linear-gradient(45deg, #FFD93D 30%, #6BCF7F 90%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(255,217,61,0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>🔥</Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Firebase 12.3.0
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Realtime Database
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={4} sx={{ 
                height: '100%',
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(102,126,234,0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>🔐</Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Clerk 6.33.2
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Authentication
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
