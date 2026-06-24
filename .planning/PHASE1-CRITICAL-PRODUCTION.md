# PHASE 1: Critical Production Readiness

**Goal**: Fix critical issues blocking real-world deployment. Make the app actually work end-to-end with proper auth, payments, and admin operations.

---

## 1.1 Email Verification Flow

### Files to modify:
- `server/src/modules/auth/auth.controller.ts` — Add verify email endpoint
- `server/src/modules/auth/auth.routes.ts` — Add verify route
- `server/src/modules/auth/auth.validator.ts` — Add verify schema
- `server/src/models/User.ts` — Already has `verificationToken` and `isVerified` fields
- `src/pages/VerifyEmail.tsx` — NEW: frontend page for verify
- `src/routes/AppRoutes.tsx` — Add verify route

### Implementation:
1. In `auth.controller.ts`, add `verifyEmail` handler:
   - Accept `token` from query params
   - Find user by `verificationToken`, check not expired
   - Set `isVerified = true`, clear `verificationToken`
   - Return success response
2. Add `resendVerification` handler:
   - Accept email, generate new token, send email
3. Add to `auth.routes.ts`: `GET /auth/verify-email/:token`, `POST /auth/resend-verification`
4. Modify `register` to generate verification token and send verification email (instead of auto-login)
5. Modify `login` to check `isVerified` before allowing access (admin bypass)
6. Create frontend VerifyEmail page (show success/error based on token validation)
7. Add route to `AppRoutes.tsx`: `/verify-email/:token`

---

## 1.2 Account Lockout & Brute Force Protection

### Files to modify:
- `server/src/models/User.ts` — Add `loginAttempts`, `lockUntil` fields
- `server/src/modules/auth/auth.controller.ts` — Add lockout logic in login
- `server/src/middlewares/rateLimiter.ts` — NEW: per-endpoint rate limiters

### Implementation:
1. Add to User model schema:
   ```ts
   loginAttempts: { type: Number, default: 0 },
   lockUntil: { type: Date, default: null }
   ```
2. Add method `isLocked()` and `incrementLoginAttempts()` to User model
3. In `login` controller:
   - Check if user is locked (lockUntil > now), throw 429 if so
   - On failed password: increment loginAttempts, if >= 5 set lockUntil to 15 min
   - On success: reset loginAttempts to 0
4. Create separate rate limiters:
   - `authLimiter`: 10 requests per 15 min for login
   - `forgotPasswordLimiter`: 3 requests per 15 min
   - `registerLimiter`: 5 requests per 15 min
   - Apply to auth routes

---

## 1.3 Automatic Token Refresh

### Files to modify:
- `src/services/api.ts` — Add refresh token interceptor

### Implementation:
1. In `api.ts` response interceptor:
   - On 401, try `POST /auth/refresh` (sends httpOnly cookie)
   - If refresh succeeds, update accessToken in store, retry original request
   - If refresh fails, then logout
2. Add `refreshToken` function to `auth.service.ts`
3. Use a queue/flag to prevent multiple simultaneous refresh attempts

---

## 1.4 Admin Dashboard Token Storage Fix

### Files to modify:
- `apps/admin-dashboard/src/lib/api.ts` — Remove localStorage token pattern
- `apps/admin-dashboard/src/store/useAuthStore.ts` — Use cookies instead

### Implementation:
1. Admin dashboard login already calls backend which sets httpOnly cookies
2. Remove manual token management from localStorage
3. Rely on httpOnly cookies for auth (withCredentials: true) — already configured on server

---

## 1.5 Admin Order Management API

### Files to modify:
- `server/src/modules/orders/orders.controller.ts` — Add admin controller methods
- `server/src/modules/orders/orders.service.ts` — Already has `updateOrderStatus`
- `server/src/modules/orders/orders.routes.ts` — Add admin routes
- `server/src/middlewares/authMiddleware.ts` — Already has `authorize`

### Implementation:
1. Add to `orders.controller.ts`:
   - `getAllOrders` — paginated, filterable by status/date/payment
   - `updateStatus` — calls existing `updateOrderStatus`, emits socket events
2. Add to `orders.routes.ts`:
   ```
   GET /admin/orders → getAllOrders (protect, authorize admin/manager)
   PATCH /admin/orders/:id/status → updateStatus (protect, authorize admin/manager/chef)
   ```
3. Add socket emissions inside `updateOrderStatus` in `orders.service.ts`:
   - Emit `order_status_changed` to `user_{userId}` room
   - Emit to admin room with new status

---

## 1.6 Payment Completeness

### Files to modify:
- `server/src/services/payment.service.ts` — Add refund, more webhook events
- `server/src/modules/orders/webhook.controller.ts` — Handle more events
- `server/src/modules/orders/orders.controller.ts` — Add refund endpoint
- `server/src/modules/orders/orders.routes.ts` — Add refund route
- `src/pages/Checkout.tsx` — Integrate Stripe Elements
- `src/services/order.service.ts` — Add payment intent handling

### Implementation:
1. Add refund method:
   - `POST /api/v1/admin/orders/:id/refund`
   - Validates order is in CANCELLED or REFUNDED status
   - Calls `stripe.refunds.create()` with original payment intent
   - Creates Refunded Transaction record
2. Add webhook handlers for:
   - `charge.refunded` — update transaction to REFUNDED
   - `payment_intent.canceled` — handle failed/cancelled payments
   - `charge.dispute.created` — flag order for review
3. Frontend Checkout:
   - Add Stripe Elements wrapper using `@stripe/react-stripe-js`
   - Create PaymentElement for card input
   - On submit: call backend to create payment intent, confirm with Stripe Elements
   - Show card errors inline
4. Add `createPaymentIntent` API call to `order.service.ts`

---

## 1.7 Wire Admin Dashboard to Real APIs

### Files to modify:
- `apps/admin-dashboard/src/pages/DashboardPage.tsx` — Replace mock with API calls
- `apps/admin-dashboard/src/pages/OrdersPage.tsx` — Replace mock with API calls
- `apps/admin-dashboard/src/pages/KitchenPage.tsx` — Replace mock with API calls + sockets
- `apps/admin-dashboard/src/pages/MenuPage.tsx` — Replace mock with API calls
- `apps/admin-dashboard/src/lib/api.ts` — Add all API functions

### Implementation:
1. Create API service layer in admin dashboard with functions:
   - `getOrders(params)`, `getOrderById(id)`, `updateOrderStatus(id, status)`
   - `getMenuItems(params)`, `createMenuItem(data)`, `updateMenuItem(id, data)`, `deleteMenuItem(id)`
   - `getDashboardStats()` — new backend endpoint returning aggregate data
   - `getKitchenOrders()` — new backend endpoint for KDS view
2. Replace all `const [orders, setOrders] = useState(MOCK_ORDERS)` with React Query `useQuery` calls
3. Add mutation hooks for status updates, menu CRUD
4. Wire Socket.io for live order updates on Kitchen page
5. Backend: Add admin dashboard stats endpoint (`GET /api/v1/admin/dashboard/stats`):
   - Total revenue (today, this week, this month)
   - Order counts by status
   - Popular items
   - Average order value

---

## 1.8 Users Module Implementation

### Files to modify:
- `server/src/modules/users/users.routes.ts` — Full implementation
- `server/src/modules/users/users.controller.ts` — NEW
- `server/src/modules/users/users.service.ts` — NEW
- `server/src/modules/users/users.validator.ts` — NEW
- `server/src/routes/index.ts` — Already registered

### Implementation:
1. Create `users.controller.ts`:
   - `getProfile` — GET /users/me (already exists in auth as getMe)
   - `updateProfile` — PATCH /users/me (name, email, phone)
   - `changePassword` — PATCH /users/me/password (currentPassword, newPassword)
   - `getAddresses` — GET /users/me/addresses
   - `createAddress` — POST /users/me/addresses
   - `updateAddress` — PUT /users/me/addresses/:id
   - `deleteAddress` — DELETE /users/me/addresses/:id
   - `deleteAccount` — DELETE /users/me
2. Create `users.service.ts`:
   - Validate current password before change
   - Hash new password
3. Create `users.validator.ts`:
   - Zod schemas for all user operations
4. Update `users.routes.ts` with all routes

---

## 1.9 Frontend API Coverage

### Files to modify:
- `src/services/` — Add missing service methods
- `src/pages/Profile.tsx` — Add address management, profile edit
- `src/store/useCartStore.ts` — Add server sync

### Implementation:
1. Add to `order.service.ts`: `createPaymentIntent(orderId)`
2. Add `cart.service.ts` — NEW: addToCart, removeFromCart, updateQuantity, applyCoupon
3. Add `user.service.ts` — NEW: updateProfile, changePassword, getAddresses, etc.
4. Update Profile page:
   - Editable name, email, phone fields
   - Password change form
   - Address book management (add/edit/delete addresses)
5. Wire cart service to backend cart API (currently frontend cart is client-only)

---

## 1.10 Testing Foundation

### New files:
- `server/src/__tests__/auth.test.ts` — Auth endpoint integration tests
- `server/src/__tests__/menu.test.ts` — Menu endpoint tests
- `server/src/__tests__/orders.test.ts` — Order flow tests
- `server/jest.config.ts` — Jest configuration
- `src/__tests__/` — Frontend component tests

### Implementation:
1. Backend:
   - Install jest, supertest, mongodb-memory-server
   - Configure jest with ts-jest
   - Test auth: register, login, refresh, protected routes
   - Test menu: list, filter, admin CRUD
   - Test orders: create, list, status transitions
2. Frontend:
   - Install vitest, @testing-library/react
   - Test core components: CartDrawer, FoodCard
   - Test pages: Login, Checkout (form validation)
3. Wire `npm test` in CI workflow

---

## Testing Criteria for Phase 1

- [ ] `tsc --noEmit` passes for both root and server
- [ ] `vite build` succeeds for both frontend and admin dashboard
- [ ] User can register, verify email, login, and place an order end-to-end
- [ ] Stripe payment intent is created and webhook processes success/failure
- [ ] Admin can view all orders and update order status
- [ ] Rate limiting blocks excessive login attempts
- [ ] Account lockout triggers after 5 failed logins
- [ ] Token refresh works seamlessly on 401
- [ ] Coupon application works end-to-end
- [ ] All tests pass
