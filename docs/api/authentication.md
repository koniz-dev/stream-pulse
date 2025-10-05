# Authentication API

## Overview

StreamPulse uses a dual authentication system with Clerk and Firebase. Clerk handles primary authentication, while Firebase is used for real-time features like chat.

## API Endpoints

### POST `/api/auth/firebase-token`

Create a custom token for Firebase authentication based on the Clerk user session.

#### Request

**Method:** `POST`  
**Headers:**
```
Content-Type: application/json
```

**Authentication:** Requires valid Clerk session

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

1. **User signs in with Clerk** - Clerk handles primary authentication
2. **Frontend calls `/api/auth/firebase-token`** - Get custom token from server
3. **Sign in to Firebase with custom token** - Use token to authenticate with Firebase
4. **Access Firebase services** - Chat, real-time features, etc.

## Security Notes

- Custom token can only be created by server with Firebase Admin SDK
- Token has expiration and will expire
- Each token is created with `clerk_user_id` claim to map with Clerk user
- API endpoint is protected by Clerk middleware

## Error Handling

### Common Error Scenarios

1. **No Clerk Session**
   - Status: 401
   - Solution: User needs to sign in with Clerk first

2. **Firebase Admin SDK Error**
   - Status: 500
   - Solution: Check Firebase service account configuration

3. **Invalid Custom Token**
   - Status: 500
   - Solution: Check Firebase project configuration

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

Use the admin debug panel at `/admin/debug` to test authentication flow:

1. Test API endpoint
2. Test Firebase sign-in with custom token
3. Verify user authentication state
