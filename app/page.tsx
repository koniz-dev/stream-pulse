'use client';

import {
  Container,
  Box,
} from '@mui/material';
import { VideoPlayerWrapper } from '@/components';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Box mb={4}>
          <VideoPlayerWrapper />
        </Box>
      </Container>
    </Box>
  );
}
