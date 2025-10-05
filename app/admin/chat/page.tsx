'use client';

import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert,
  Button,
  Stack
} from '@mui/material';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { ChatManagement } from '../debug/components/ChatManagement';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AdminChatPage() {
  const { user: clerkUser } = useUser();

  const isAdmin = clerkUser?.publicMetadata?.role === 'admin';

  if (!clerkUser) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="info">
              Please sign in to access the admin panel
            </Alert>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="warning">
              Access denied. Admin privileges required.
            </Alert>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box mb={4}>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <Button 
                variant="outlined" 
                startIcon={<ArrowBackIcon />}
                size="small"
              >
                Back to Admin
              </Button>
            </Link>
          </Stack>
          
          <Box textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}>
              <AdminPanelSettingsIcon fontSize="large" />
              Chat Management
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Manage and moderate live chat messages
            </Typography>
            <Alert severity="info" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
              💬 Monitor, search, and delete chat messages in real-time
            </Alert>
          </Box>
        </Box>

        {/* Chat Management Component */}
        <ChatManagement />

        {/* Footer */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            🔧 StreamPulse Admin Chat Management - Real-time moderation tools
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
