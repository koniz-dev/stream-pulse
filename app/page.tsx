'use client';

import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  Fade
} from '@mui/material';
import { VideoWrapper, Chat, Header } from '@/components';

export default function Home() {

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
          {/* Content Grid */}
          <Grid container spacing={3}>
            {/* Video Player */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Fade in timeout={1000}>
                <Box>
                  <VideoWrapper />
                  
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
        </Container>
      </Box>
    </Box>
  );
}
