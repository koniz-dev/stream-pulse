# Authentication API

## Overview

StreamPulse sử dụng hệ thống authentication kép với Clerk và Firebase. Clerk xử lý authentication chính, trong khi Firebase được sử dụng cho real-time features như chat.

## API Endpoints

### POST `/api/auth/firebase-token`

Tạo custom token cho Firebase authentication dựa trên Clerk user session.

#### Request

**Method:** `POST`  
**Headers:**
```
Content-Type: application/json
```

**Authentication:** Yêu cầu Clerk session hợp lệ

#### Response

**Success Response (200):**
```json
{
  "customToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to create custom token"
}
```

#### Usage Example

```javascript
// Frontend usage
const response = await fetch('/api/auth/firebase-token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (!response.ok) {
  throw new Error('Failed to get custom token');
}

const { customToken } = await response.json();

// Use custom token to sign in to Firebase
import { signInWithCustomToken } from 'firebase/auth';
await signInWithCustomToken(auth, customToken);
```

## Authentication Flow

1. **User signs in with Clerk** - Clerk xử lý authentication chính
2. **Frontend calls `/api/auth/firebase-token`** - Lấy custom token từ server
3. **Sign in to Firebase with custom token** - Sử dụng token để authenticate với Firebase
4. **Access Firebase services** - Chat, real-time features, etc.

## Security Notes

- Custom token chỉ có thể được tạo bởi server với Firebase Admin SDK
- Token có thời hạn và sẽ expire
- Mỗi token được tạo với `clerk_user_id` claim để mapping với Clerk user
- API endpoint được bảo vệ bởi Clerk middleware

## Error Handling

### Common Error Scenarios

1. **No Clerk Session**
   - Status: 401
   - Solution: User cần sign in với Clerk trước

2. **Firebase Admin SDK Error**
   - Status: 500
   - Solution: Kiểm tra Firebase service account configuration

3. **Invalid Custom Token**
   - Status: 500
   - Solution: Kiểm tra Firebase project configuration

## Environment Variables Required

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

## Testing

Sử dụng admin debug panel tại `/admin/debug` để test authentication flow:

1. Test API endpoint
2. Test Firebase sign-in với custom token
3. Verify user authentication state
