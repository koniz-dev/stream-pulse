# StreamPulse 🎥

A modern live streaming platform with real-time chat functionality, built with Next.js 15, featuring HLS video streaming and interactive chat capabilities.

## ✨ Features

- 🎬 **Live Video Streaming** - HLS video player with Video.js integration and professional controls
- 💬 **Real-time Chat** - Interactive chat system with Firebase Realtime Database
- 🔐 **User Authentication** - Secure authentication with Clerk (sign-in/sign-up)
- 🎨 **Modern UI** - Beautiful interface built with Material-UI and Tailwind CSS
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- ⚡ **Fast Performance** - Built with Next.js 15 and Turbopack for optimal speed
- 🔄 **Real-time Updates** - Live chat and streaming updates
- 🛠️ **Admin Panel** - Debug tools and chat management for administrators
- 📊 **Analytics** - Firebase Analytics integration for user insights

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Material-UI (MUI), Tailwind CSS
- **Authentication**: Clerk
- **Database**: Firebase Realtime Database
- **Video Player**: Video.js
- **State Management**: Zustand
- **Styling**: Emotion, Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Firebase project setup
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/koniz-dev/stream-pulse.git
   cd stream-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Firebase Client Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   
   # Firebase Admin SDK (Service Account)
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_CLIENT_ID=your_firebase_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com
   FIREBASE_UNIVERSE_DOMAIN=googleapis.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
stream-pulse/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   └── (routes)/      # Sign-in/Sign-up pages
│   ├── about/             # About page
│   ├── admin/             # Admin panel
│   │   ├── chat/          # Chat management
│   │   └── debug/         # Debug tools
│   ├── api/               # API routes
│   │   └── auth/          # Authentication API
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── common/            # Shared components
│   ├── features/          # Feature-specific components
│   │   ├── chat/          # Chat functionality
│   │   └── video/         # Video player
│   ├── ui/                # UI components
│   └── index.ts           # Component exports
├── hooks/                 # Custom React hooks
│   └── useFirebaseAuth.ts # Firebase authentication hook
├── lib/                   # Utility libraries
│   ├── firebase.ts        # Firebase configuration
│   └── logger.ts          # Logging utility
├── providers/             # Context providers
│   ├── ThemeProvider.tsx  # Theme context
│   └── index.ts           # Provider exports
├── stores/                # Zustand stores
│   ├── adminChatStore.ts  # Admin chat state
│   ├── chatStore.ts       # Chat state
│   ├── userStore.ts       # User state
│   ├── videoStore.ts      # Video state
│   └── index.ts           # Store exports
├── types/                 # TypeScript type definitions
│   ├── chat.ts            # Chat types
│   ├── user.ts            # User types
│   ├── video.ts           # Video types
│   └── index.ts           # Type exports
├── middleware.ts          # Clerk middleware
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
└── public/                # Static assets
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Realtime Database
3. Add your web app and copy the configuration
4. Generate a service account key for Admin SDK:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Extract all values from the JSON file to your `.env.local`
5. Update your `.env.local` file with the Firebase credentials

**Note**: The Firebase Admin SDK requires all service account fields from the downloaded JSON file, not just the basic ones.

### Clerk Setup

1. Create a Clerk account at [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy the publishable key and secret key
4. Update your `.env.local` file with the Clerk credentials

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy on Other Platforms

The application can be deployed on any platform that supports Next.js:

- **Netlify**: Connect your GitHub repository
- **Railway**: Deploy with one-click
- **DigitalOcean App Platform**: Container-based deployment
- **AWS Amplify**: Full-stack deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **koniz-dev** - *Initial work* - [koniz-dev](https://github.com/koniz-dev)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Material-UI](https://mui.com/) for the beautiful UI components
- [Video.js](https://videojs.com/) for the video player
- [Clerk](https://clerk.com/) for authentication
- [Firebase](https://firebase.google.com/) for real-time database and authentication
