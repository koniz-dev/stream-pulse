# System Architecture Overview

## Overview

StreamPulse là một nền tảng live streaming với chat real-time được xây dựng trên Next.js 15, sử dụng kiến trúc microservices với các service chính: Authentication (Clerk), Real-time Database (Firebase), và Video Streaming (Video.js + HLS).

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    StreamPulse Platform                     │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Next.js 15)                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Video Player  │  │   Chat System   │  │   Admin UI   │ │
│  │   (Video.js)    │  │   (Firebase)    │  │   (Debug)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Authentication Layer                                       │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   Clerk Auth    │  │  Firebase Auth  │                  │
│  │   (Primary)     │  │   (Secondary)   │                  │
│  └─────────────────┘  └─────────────────┘                  │
├─────────────────────────────────────────────────────────────┤
│  Backend Services                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Next.js API   │  │  Firebase RTDB  │  │  HLS Streams │ │
│  │   (Custom Token)│  │   (Real-time)   │  │   (External) │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework với App Router
- **React 19** - UI library với latest features
- **TypeScript** - Type safety và better DX
- **Material-UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management

### Authentication
- **Clerk** - Primary authentication service
- **Firebase Auth** - Secondary authentication cho real-time features
- **Custom Token API** - Bridge giữa Clerk và Firebase

### Real-time Features
- **Firebase Realtime Database** - Real-time chat và data sync
- **WebSocket-like connections** - Real-time updates

### Video Streaming
- **Video.js** - HTML5 video player
- **HLS (HTTP Live Streaming)** - Video streaming protocol
- **External CDN** - Video content delivery

### Development & Build
- **Turbopack** - Fast bundler cho development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Component Architecture

### Frontend Structure

```
app/
├── (auth)/                 # Authentication routes
├── about/                  # About page
├── admin/                  # Admin panel
│   ├── chat/              # Chat management
│   └── debug/             # Debug tools
├── api/                    # API routes
│   └── auth/              # Authentication API
├── layout.tsx             # Root layout
└── page.tsx               # Home page

components/
├── common/                # Shared components
├── features/              # Feature-specific components
│   ├── chat/             # Chat functionality
│   └── video/            # Video player
├── ui/                    # UI components
└── index.ts              # Component exports

stores/                    # Zustand stores
├── adminChatStore.ts     # Admin chat state
├── chatStore.ts          # Chat state
├── userStore.ts          # User state
├── videoStore.ts         # Video state
└── index.ts              # Store exports

types/                     # TypeScript definitions
├── chat.ts               # Chat types
├── user.ts               # User types
├── video.ts              # Video types
└── index.ts              # Type exports
```

### State Management

```typescript
// Zustand stores structure
interface AppState {
  // User state
  user: {
    clerkUser: ClerkUser | null;
    firebaseUser: FirebaseUser | null;
    isAuthenticated: boolean;
  };
  
  // Video state
  video: {
    player: VideoPlayer | null;
    isPlaying: boolean;
    currentTime: number;
    streamUrl: string | null;
  };
  
  // Chat state
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
    isConnected: boolean;
  };
}
```

## Data Flow

### Authentication Flow

```
1. User visits app
   ↓
2. Clerk middleware checks authentication
   ↓
3. If not authenticated → Redirect to sign-in
   ↓
4. If authenticated → Load user data
   ↓
5. Create Firebase custom token
   ↓
6. Sign in to Firebase with custom token
   ↓
7. User can access real-time features
```

### Video Streaming Flow

```
1. User loads video page
   ↓
2. VideoWrapper component mounts
   ↓
3. VideoPlayer initializes with Video.js
   ↓
4. HLS stream URL is loaded
   ↓
5. Video.js handles streaming
   ↓
6. Player events update Zustand store
   ↓
7. UI reflects player state
```

### Chat Flow

```
1. User authenticated with Firebase
   ↓
2. Chat component mounts
   ↓
3. Firebase listener established
   ↓
4. Messages loaded from database
   ↓
5. User types message
   ↓
6. Message sent to Firebase
   ↓
7. Real-time update to all listeners
   ↓
8. UI updates with new message
```

## API Architecture

### REST API Endpoints

```
POST /api/auth/firebase-token
├── Purpose: Create Firebase custom token
├── Auth: Clerk session required
├── Input: None
└── Output: { customToken: string }
```

### Firebase Realtime Database

```
/chat/messages/
├── $messageId/
│   ├── userId: string
│   ├── username: string
│   ├── message: string
│   ├── timestamp: number
│   ├── avatar?: string
│   └── isDeleted?: boolean
```

## Security Architecture

### Authentication Security

1. **Clerk Authentication**
   - JWT tokens với expiration
   - Secure session management
   - Role-based access control

2. **Firebase Security**
   - Custom tokens với limited scope
   - Database rules cho access control
   - Real-time security rules

3. **API Security**
   - Middleware protection
   - Environment variable security
   - CORS configuration

### Data Security

1. **Client-side**
   - No sensitive data in client code
   - Secure environment variables
   - HTTPS enforcement

2. **Server-side**
   - Firebase Admin SDK security
   - Service account key protection
   - API endpoint protection

## Performance Architecture

### Frontend Performance

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Caching Strategy**
   - Next.js built-in caching
   - Browser caching
   - CDN caching

3. **Bundle Optimization**
   - Tree shaking
   - Dead code elimination
   - Bundle analysis

### Real-time Performance

1. **Firebase Optimization**
   - Efficient queries
   - Connection pooling
   - Offline support

2. **Video Streaming**
   - Adaptive bitrate
   - Buffer management
   - Quality selection

## Scalability Considerations

### Horizontal Scaling

1. **Frontend**
   - CDN distribution
   - Static asset optimization
   - Edge computing

2. **Backend**
   - Serverless functions
   - Database sharding
   - Load balancing

### Vertical Scaling

1. **Performance Optimization**
   - Memory management
   - CPU optimization
   - Network optimization

2. **Resource Management**
   - Connection pooling
   - Cache optimization
   - Database indexing

## Monitoring & Observability

### Application Monitoring

1. **Performance Metrics**
   - Page load times
   - API response times
   - Real-time connection health

2. **Error Tracking**
   - Client-side errors
   - Server-side errors
   - Network errors

3. **User Analytics**
   - User engagement
   - Feature usage
   - Performance impact

### Infrastructure Monitoring

1. **System Health**
   - Server performance
   - Database performance
   - Network performance

2. **Security Monitoring**
   - Authentication failures
   - Unauthorized access
   - Data breaches

## Development Workflow

### Local Development

1. **Environment Setup**
   - Node.js 18+
   - Environment variables
   - Firebase configuration

2. **Development Server**
   - Next.js dev server
   - Hot reloading
   - TypeScript compilation

3. **Testing**
   - Component testing
   - Integration testing
   - E2E testing

### Deployment Pipeline

1. **Build Process**
   - TypeScript compilation
   - Bundle optimization
   - Static generation

2. **Deployment**
   - Vercel deployment
   - Environment configuration
   - Domain setup

3. **Monitoring**
   - Performance monitoring
   - Error tracking
   - User analytics
