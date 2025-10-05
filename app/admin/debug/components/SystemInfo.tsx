'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

export function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<any>(null);

  const gatherSystemInfo = () => {
    const info = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth
      },
      window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
      },
      location: {
        href: window.location.href,
        protocol: window.location.protocol,
        host: window.location.host,
        pathname: window.location.pathname
      },
      performance: {
        memory: (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        } : 'Not available'
      }
    };
    
    setSystemInfo(info);
  };

  useEffect(() => {
    gatherSystemInfo();
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          🖥️ System Information
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={gatherSystemInfo}
        >
          Refresh
        </Button>
      </Box>

      {systemInfo && (
        <Stack spacing={2}>
          {/* Basic Info */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Basic Info</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`Online: ${systemInfo.onLine ? 'Yes' : 'No'}`} 
                    color={systemInfo.onLine ? 'success' : 'error'} size="small" />
              <Chip label={`Language: ${systemInfo.language}`} size="small" />
              <Chip label={`Platform: ${systemInfo.platform}`} size="small" />
              <Chip label={`Cookies: ${systemInfo.cookieEnabled ? 'Enabled' : 'Disabled'}`} 
                    color={systemInfo.cookieEnabled ? 'success' : 'warning'} size="small" />
            </Stack>
          </Box>

          {/* Detailed Info */}
          <Accordion>
            <AccordionSummary expandIcon={<span>▼</span>}>
              <Typography variant="subtitle2">Detailed System Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="pre" sx={{ 
                fontSize: '0.75rem', 
                overflow: 'auto', 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: 1 
              }}>
                {JSON.stringify(systemInfo, null, 2)}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </Box>
  );
}
