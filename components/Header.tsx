'use client';

import { useState } from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  LiveTv,
  AdminPanelSettings,
  BugReport
} from '@mui/icons-material';

export default function Header() {
  const { user, isSignedIn } = useUser();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isAdmin = user?.publicMetadata?.role === 'admin';

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navigationItems = [
    { label: 'About', href: '/about', icon: null },
    ...(isAdmin ? [
      { label: 'Admin', href: '/admin', icon: <AdminPanelSettings /> },
      { label: 'Debug', href: '/admin/debug', icon: <BugReport /> }
    ] : [])
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        {/* Logo & Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <LiveTv sx={{ mr: 1, color: 'primary.main' }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                '&:hover': { color: 'primary.dark' }
              }}
            >
              StreamPulse
            </Typography>
          </Link>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Button
                    startIcon={item.icon}
                    sx={{ 
                      color: 'text.primary',
                      '&:hover': { 
                        bgcolor: 'action.hover',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* User Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isSignedIn ? (
            <>
              {isAdmin && (
                <Chip 
                  label="Admin" 
                  color="warning" 
                  size="small" 
                  variant="outlined"
                />
              )}
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: {
                      width: 32,
                      height: 32
                    }
                  }
                }}
              />
            </>
          ) : (
            <SignInButton mode="modal">
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Sign In
              </Button>
            </SignInButton>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {navigationItems.map((item) => (
            <MenuItem 
              key={item.href} 
              onClick={handleMobileMenuClose}
              component={Link}
              href={item.href}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon}
                {item.label}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
