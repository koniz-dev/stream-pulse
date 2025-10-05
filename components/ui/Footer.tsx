'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import {
  GitHub,
  Twitter,
  Email,
  Code
} from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Main Footer Content */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4}
            justifyContent="space-between"
            alignItems={{ xs: 'center', md: 'flex-start' }}
          >

            {/* Links Section */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={4}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              {/* Product Links */}
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Product
                </Typography>
                <Stack spacing={0.5}>
                  <Link href="/" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                      Live Stream
                    </Typography>
                  </Link>
                  <Link href="/about" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                      About
                    </Typography>
                  </Link>
                </Stack>
              </Box>

              {/* Tech Stack */}
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Tech Stack
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Chip label="Next.js" size="small" variant="outlined" />
                  <Chip label="Video.js" size="small" variant="outlined" />
                  <Chip label="Firebase" size="small" variant="outlined" />
                  <Chip label="Clerk" size="small" variant="outlined" />
                </Stack>
              </Box>

              {/* Social Links */}
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Connect
                </Typography>
                <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <IconButton size="small" color="primary">
                    <GitHub fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Twitter fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Email fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Stack>

          <Divider />

          {/* Bottom Section */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" color="text.secondary">
              © {currentYear} StreamPulse. Built with ❤️ by koniz-dev
            </Typography>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <Code fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Open Source Project
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
