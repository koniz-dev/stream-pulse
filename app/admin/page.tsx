'use client';

import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Paper,
  Stack
} from '@mui/material';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main'
          }}>
            🔧 Admin Panel
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            StreamPulse - Administration & Debug Tools
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom>
                Available Tools
              </Typography>
            </Box>

            <Box>
              <Link href="/admin/chat" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  sx={{ 
                    py: 2,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  }}
                >
                  💬 Chat Management
                </Button>
              </Link>
              <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
                Monitor, search, and delete chat messages in real-time
              </Typography>
            </Box>

            <Box>
              <Link href="/admin/debug" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  sx={{ 
                    py: 2,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  }}
                >
                  🔧 Debug Panel
                </Button>
              </Link>
              <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
                Firebase, Video.js, Custom Token debugging tools
              </Typography>
            </Box>

            <Box>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                  size="large" 
                  fullWidth
                  sx={{ 
                    py: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  🏠 Back to Home
                </Button>
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
