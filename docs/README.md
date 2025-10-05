# StreamPulse Documentation

## 📚 Documentation Overview

Welcome to StreamPulse documentation! This is a comprehensive documentation for the live streaming platform with real-time chat.

## 🎯 What is StreamPulse?

StreamPulse is a modern live streaming platform built with Next.js 15, integrating video streaming (HLS) and real-time chat. The application uses a microservices architecture with Clerk authentication, Firebase Realtime Database, and Video.js player.

## 📖 Available Documentation

### 🔌 API Documentation
- **[Authentication API](./api/authentication.md)** - Guide for using authentication endpoints
- **[Chat API](./api/chat-api.md)** - Documentation for real-time chat system
- **[Video API](./api/video-api.md)** - Guide for video streaming and Video.js

### 🧩 Component Documentation
- **[VideoPlayer Component](./components/video-player.md)** - Guide for using VideoPlayer component
- **[Chat Component](./components/chat-component.md)** - Chat component documentation and real-time features
- **[UI Components](./components/ui-components.md)** - Guide for UI components and Material-UI integration

### 🔧 Troubleshooting
- **[Common Issues](./troubleshooting/common-issues.md)** - Resolving common issues
- **[Performance Guide](./troubleshooting/performance.md)** - Performance optimization
- **[Debugging Guide](./troubleshooting/debugging.md)** - Debug and monitoring guide

### 🏗️ Architecture
- **[System Overview](./architecture/system-overview.md)** - System architecture overview
- **[Data Flow](./architecture/data-flow.md)** - Data flow and state management
- **[Technology Stack](./architecture/tech-stack.md)** - Technology stack details

## 🚀 Quick Start

### 1. Installation
```bash
git clone https://github.com/koniz-dev/stream-pulse.git
cd stream-pulse
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env.local
# Update the necessary environment variables
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Material-UI, Tailwind CSS
- **Authentication**: Clerk + Firebase Auth
- **Database**: Firebase Realtime Database
- **Video**: Video.js + HLS
- **State**: Zustand
- **Deployment**: Vercel

## 📋 Features

### 🎬 Video Streaming
- HLS video streaming with Video.js
- Adaptive bitrate streaming
- Professional video controls
- Mobile responsive design

### 💬 Real-time Chat
- Firebase Realtime Database
- Real-time message synchronization
- User authentication integration
- Message history and moderation

### 🔐 Authentication
- Clerk primary authentication
- Firebase secondary authentication
- Role-based access control
- Secure token management

### 🎨 Modern UI
- Material-UI components
- Responsive design
- Dark/Light theme support
- Accessibility features

## 🔍 Debug Tools

StreamPulse provides an admin debug panel at `/admin/debug` with the following features:

- **Authentication Testing** - Test Clerk and Firebase auth
- **Video Player Debug** - Monitor video player state
- **Chat System Debug** - Test real-time chat
- **Performance Monitoring** - Track performance metrics

## 📱 Browser Support

- **Desktop**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **Mobile**: iOS Safari 11+, Chrome Mobile 60+
- **Features**: ES6+, HLS, WebRTC (partial)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more details.

## 🆘 Support

- **Documentation**: See documentation in the `docs/` directory
- **Issues**: Create an issue on GitHub
- **Discussions**: Join GitHub Discussions
- **Email**: Contact via email

## 🔗 Links

- **GitHub Repository**: [koniz-dev/stream-pulse](https://github.com/koniz-dev/stream-pulse)
- **Live Demo**: [stream-pulse.vercel.app](https://stream-pulse.vercel.app)
- **Documentation**: [docs/](./)

## 📊 Project Status

- **Version**: 0.1.0
- **Status**: Active Development
- **Last Updated**: 2024

---

**StreamPulse** - Modern live streaming platform with real-time chat capabilities. Built with ❤️ using Next.js, Firebase, and Video.js.
