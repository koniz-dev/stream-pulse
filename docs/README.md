# StreamPulse Documentation

## 📚 Documentation Overview

Chào mừng đến với tài liệu StreamPulse! Đây là bộ tài liệu hoàn chỉnh cho nền tảng live streaming với chat real-time.

## 🎯 StreamPulse là gì?

StreamPulse là một nền tảng live streaming hiện đại được xây dựng với Next.js 15, tích hợp video streaming (HLS) và chat real-time. Ứng dụng sử dụng kiến trúc microservices với Clerk authentication, Firebase Realtime Database, và Video.js player.

## 📖 Tài liệu có sẵn

### 🔌 API Documentation
- **[Authentication API](./api/authentication.md)** - Hướng dẫn sử dụng authentication endpoints
- **[Chat API](./api/chat-api.md)** - Tài liệu về real-time chat system
- **[Video API](./api/video-api.md)** - Hướng dẫn video streaming và Video.js

### 🧩 Component Documentation
- **[VideoPlayer Component](./components/video-player.md)** - Hướng dẫn sử dụng VideoPlayer component
- **[Chat Component](./components/chat-component.md)** - Tài liệu Chat component và real-time features
- **[UI Components](./components/ui-components.md)** - Hướng dẫn các UI components và Material-UI integration

### 🔧 Troubleshooting
- **[Common Issues](./troubleshooting/common-issues.md)** - Giải quyết các vấn đề thường gặp
- **[Performance Guide](./troubleshooting/performance.md)** - Tối ưu hóa performance
- **[Debugging Guide](./troubleshooting/debugging.md)** - Hướng dẫn debug và monitoring

### 🏗️ Architecture
- **[System Overview](./architecture/system-overview.md)** - Tổng quan kiến trúc hệ thống
- **[Data Flow](./architecture/data-flow.md)** - Luồng dữ liệu và state management
- **[Technology Stack](./architecture/tech-stack.md)** - Chi tiết về technology stack

## 🚀 Quick Start

### 1. Cài đặt
```bash
git clone https://github.com/koniz-dev/stream-pulse.git
cd stream-pulse
npm install
```

### 2. Cấu hình Environment
```bash
cp .env.example .env.local
# Cập nhật các biến môi trường cần thiết
```

### 3. Chạy Development Server
```bash
npm run dev
```

### 4. Truy cập ứng dụng
Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

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
- HLS video streaming với Video.js
- Adaptive bitrate streaming
- Professional video controls
- Mobile responsive design

### 💬 Real-time Chat
- Firebase Realtime Database
- Real-time message synchronization
- User authentication integration
- Message history và moderation

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

StreamPulse cung cấp admin debug panel tại `/admin/debug` với các tính năng:

- **Authentication Testing** - Test Clerk và Firebase auth
- **Video Player Debug** - Monitor video player state
- **Chat System Debug** - Test real-time chat
- **Performance Monitoring** - Track performance metrics

## 📱 Browser Support

- **Desktop**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **Mobile**: iOS Safari 11+, Chrome Mobile 60+
- **Features**: ES6+, HLS, WebRTC (partial)

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 🆘 Support

- **Documentation**: Xem các tài liệu trong thư mục `docs/`
- **Issues**: Tạo issue trên GitHub
- **Discussions**: Tham gia GitHub Discussions
- **Email**: Liên hệ qua email

## 🔗 Links

- **GitHub Repository**: [koniz-dev/stream-pulse](https://github.com/koniz-dev/stream-pulse)
- **Live Demo**: [stream-pulse.vercel.app](https://stream-pulse.vercel.app)
- **Documentation**: [docs/](./)

## 📊 Project Status

- **Version**: 0.1.0
- **Status**: Active Development
- **Last Updated**: 2024

---

**StreamPulse** - Modern live streaming platform với real-time chat capabilities. Built with ❤️ using Next.js, Firebase, và Video.js.
