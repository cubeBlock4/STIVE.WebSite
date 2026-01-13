# Authentication System Implementation

## Overview
Complete authentication system with token management, Redux state, and RTK Query integration.

## What Was Implemented

### 1. **Auth Types** (`src/types/api/types.ts`)
- `LoginResponse`: Response type with token
- `AuthState`: Redux state shape for authentication

### 2. **Auth Slice** (`src/store/authSlice.ts`)
- Redux slice managing authentication state
- Actions: `setCredentials`, `logout`
- Automatically syncs with localStorage for persistence
- Token survives page refreshes

### 3. **RTK Query Integration** (`api/api.ts`)
- Custom `baseQuery` that automatically injects auth token
- All API requests through RTK Query include `Authorization: Bearer {token}` header
- Token is retrieved from Redux state

### 4. **Auth API** (`api/AuthApi.ts`)
- `register()`: Register new users
- `login()`: Login and return token

### 5. **Auth Hooks** (`src/hooks/useAuth.ts`)
- `useAppDispatch()`: Typed dispatch hook
- `useAppSelector()`: Typed selector hook
- `useAuth()`: Get auth state (token, isAuthenticated)

### 6. **Protected Routes** (`src/components/ProtectedRoute.tsx`)
- Component to protect routes requiring authentication
- Automatically redirects to login if not authenticated

### 7. **Logout Button** (`src/components/LogoutButton.tsx`)
- Pre-built logout button component
- Clears token and redirects

## Usage Examples

### Check if user is authenticated
```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { isAuthenticated, token } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? "Logged in" : "Not logged in"}
    </div>
  );
}
```

### Protect a route
```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}
```

### Add logout functionality
```tsx
import { LogoutButton } from "@/components/LogoutButton";

function Navigation() {
  return (
    <nav>
      <LogoutButton redirectTo="/login" />
    </nav>
  );
}
```

### Manual logout
```tsx
import { useAppDispatch } from "@/hooks/useAuth";
import { logout } from "@/store/authSlice";

function MyComponent() {
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    // Token is automatically cleared from localStorage
  };
}
```

### Use RTK Query with automatic auth
```tsx
// In your API file
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/user/profile",
      // Token is automatically included in headers!
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
```

## How It Works

### Token Flow
1. User logs in via login form
2. API returns token
3. Token is saved to:
   - Redux store (for immediate access)
   - localStorage (for persistence)
4. All subsequent API calls via RTK Query automatically include token
5. Token persists across page refreshes
6. On logout, token is cleared from both Redux and localStorage

### Authentication Check
- `isAuthenticated` is automatically set based on token presence
- Protected routes check this value
- If false, user is redirected to login

### Token Injection
- RTK Query's `prepareHeaders` function runs before every request
- It reads token from Redux state
- Adds `Authorization: Bearer {token}` header
- Works for all endpoints defined with RTK Query

## Security Notes
- Token is stored in localStorage (consider security implications)
- Token is sent in Authorization header (standard practice)
- Protected routes work on client-side only
- Server should always validate tokens

## Next Steps
You can now:
- Create protected pages using `<ProtectedRoute>`
- Add user profile display using token data
- Create API endpoints that require authentication
- Add token refresh logic if needed
