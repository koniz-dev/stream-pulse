'use client';

import {
  Container,
  Box,
  Grid,
} from '@mui/material';
import { VideoPlayerWrapper, Chat } from '@/components';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Video Player */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <VideoPlayerWrapper />
          </Grid>
          
          {/* Chat */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Chat />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
