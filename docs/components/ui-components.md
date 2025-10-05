# UI Components

## Overview

StreamPulse sử dụng Material-UI (MUI) làm UI framework chính, kết hợp với Tailwind CSS cho styling. Các UI components được tổ chức trong thư mục `components/ui/` và `components/common/`.

## Header Component

### Overview

`Header` component cung cấp navigation bar chính cho ứng dụng, bao gồm authentication, navigation menu và responsive design.

### Props Interface

```typescript
// Header component không có props - sử dụng global state
interface HeaderProps {
  // No props - component is self-contained
}
```

### Features

- **Responsive Design** - Mobile và desktop layouts
- **Authentication Integration** - Clerk sign-in/sign-out
- **Navigation Menu** - Dynamic menu based on user role
- **Admin Access** - Admin panel access for admin users

### Usage Example

```tsx
import Header from '@/components/ui/Header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
```

### Navigation Items

```tsx
const navigationItems = [
  { label: 'About', href: '/about', icon: null },
  ...(isAdmin ? [
    { label: 'Admin', href: '/admin', icon: <AdminPanelSettings /> },
    { label: 'Debug', href: '/admin/debug', icon: <BugReport /> }
  ] : [])
];
```

### Mobile Menu

```tsx
const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setMobileMenuAnchor(event.currentTarget);
};
```

## AuthStatus Component

### Overview

`AuthStatus` component hiển thị trạng thái authentication của user, bao gồm Clerk và Firebase authentication status.

### Props Interface

```typescript
// AuthStatus component không có props
interface AuthStatusProps {
  // No props - component is self-contained
}
```

### Features

- **Dual Authentication Status** - Hiển thị cả Clerk và Firebase status
- **Real-time Updates** - Cập nhật real-time khi auth state thay đổi
- **Debug Information** - Hiển thị thông tin debug cho developers

### Usage Example

```tsx
import { AuthStatus } from '@/components/common/AuthStatus';

function DebugPage() {
  return (
    <div>
      <h1>Debug Information</h1>
      <AuthStatus />
    </div>
  );
}
```

### Status Display

```tsx
<Box>
  <Typography variant="h6">Authentication Status</Typography>
  
  {/* Clerk Status */}
  <Box>
    <Typography variant="subtitle1">Clerk:</Typography>
    <Chip 
      label={clerkLoaded ? (isSignedIn ? 'Signed In' : 'Signed Out') : 'Loading...'}
      color={clerkLoaded ? (isSignedIn ? 'success' : 'default') : 'warning'}
    />
  </Box>

  {/* Firebase Status */}
  <Box>
    <Typography variant="subtitle1">Firebase:</Typography>
    <Chip 
      label={firebaseLoading ? 'Loading...' : (firebaseUser ? 'Authenticated' : 'Not Authenticated')}
      color={firebaseLoading ? 'warning' : (firebaseUser ? 'success' : 'default')}
    />
  </Box>
</Box>
```

## Common UI Patterns

### Paper Container

```tsx
<Paper 
  elevation={3} 
  sx={{ 
    p: 3, 
    borderRadius: 2,
    bgcolor: 'background.paper'
  }}
>
  {/* Content */}
</Paper>
```

### Responsive Grid

```tsx
<Grid container spacing={3}>
  <Grid size={{ xs: 12, lg: 8 }}>
    {/* Video Player */}
  </Grid>
  <Grid size={{ xs: 12, lg: 4 }}>
    {/* Chat */}
  </Grid>
</Grid>
```

### Loading States

```tsx
{isLoading ? (
  <Box display="flex" justifyContent="center" p={3}>
    <CircularProgress />
  </Box>
) : (
  {/* Content */}
)}
```

### Error Handling

```tsx
{error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {error}
  </Alert>
)}
```

## Material-UI Theme Integration

### Theme Provider

```tsx
import { ThemeProvider } from '@/providers/ThemeProvider';

function App({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
```

### Custom Theme

```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
});
```

## Responsive Design

### Breakpoints

```tsx
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// Usage
<Box sx={{ 
  display: { xs: 'block', md: 'flex' },
  flexDirection: { xs: 'column', md: 'row' }
}}>
```

### Mobile-First Approach

```tsx
<Container 
  maxWidth="xl" 
  sx={{ 
    py: { xs: 2, md: 4 },
    px: { xs: 1, md: 3 }
  }}
>
```

## Animation and Transitions

### Fade Transitions

```tsx
<Fade in timeout={1000}>
  <Box>
    {/* Content */}
  </Box>
</Fade>
```

### Hover Effects

```tsx
<Button
  sx={{
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 3,
    },
  }}
>
  Hover Me
</Button>
```

## Accessibility

### ARIA Labels

```tsx
<Button
  aria-label="Send message"
  aria-describedby="message-input"
>
  <SendIcon />
</Button>
```

### Keyboard Navigation

```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSubmit();
  }
};
```

### Focus Management

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);
```

## Performance Optimization

### Memoization

```tsx
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Lazy Loading

```tsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Testing

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import Header from '@/components/ui/Header';

test('renders header with title', () => {
  render(<Header />);
  expect(screen.getByText('StreamPulse')).toBeInTheDocument();
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<Header />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Dependencies

- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `@emotion/react` - CSS-in-JS styling
- `@emotion/styled` - Styled components
- `@clerk/nextjs` - Authentication components
- `react` - React hooks và components

## Best Practices

1. **Consistent Spacing** - Sử dụng theme spacing units
2. **Responsive Design** - Mobile-first approach
3. **Accessibility** - ARIA labels và keyboard navigation
4. **Performance** - Memoization và lazy loading
5. **Error Handling** - Graceful error states
6. **Loading States** - User feedback during async operations
