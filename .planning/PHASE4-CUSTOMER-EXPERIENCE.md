# PHASE 4: Customer Experience & Growth

**Goal**: Delight customers, drive repeat orders, and build marketing capabilities.

---

## 4.1 Frontend Enhancement

### Files to modify:
- `src/store/useCartStore.ts` — Keep, enhance
- `src/context/CartContext.tsx` — DELETE (consolidate to useCartStore)
- `src/pages/OrderDetail.tsx` — Add real-time socket updates
- `src/main.tsx` — Register service worker
- `src/index.html` — Add meta tags, preconnect hints
- `public/manifest.json` — Fix icon paths, add missing icons
- `src/components/Navbar.tsx` — Add notification bell

### Implementation:
1. Cart consolidation:
   - Remove `CartContext` entirely
   - Migrate any remaining usage to `useCartStore`
   - Sync cart with backend API for persistence across devices
2. Real-time order tracking:
   - Connect socket.io-client in OrderDetail page
   - Subscribe to `order_{orderId}` room
   - Animated status timeline that advances on socket events
   - Show estimated delivery time with countdown
3. PWA:
   - Create service worker with workbox (precache static assets, cache API responses)
   - Add offline fallback page
   - Add install prompt
   - Create PWA icons at required sizes (192x192, 512x512)
4. SEO:
   - Install `react-helmet-async`
   - Add per-page meta tags (title, description, OG tags)
   - Add JSON-LD structured data (Restaurant, Menu, Order)
   - Generate sitemap.xml dynamically from menu categories
5. Performance:
   - Add critical CSS inlining
   - Preconnect to Google Fonts, API server, CDN
   - Lazy load images with blur placeholder (blurhash)
   - Add intersection observer for below-fold content

---

## 4.2 Notifications & Communication

### Files to modify:
- `server/src/services/notification.service.ts` — Full implementation
- `server/src/queues/queue.service.ts` — Real worker processing
- `server/src/utils/mailer.ts` — SendGrid/Mailgun integration
- `server/src/modules/auth/auth.controller.ts` — Use notification service
- `server/src/modules/orders/webhook.controller.ts` — Use notification service
- `server/src/models/Notification.ts` — NEW: in-app notification model
- `server/src/modules/notifications/` — NEW module

### Implementation:
1. Email sending implementation:
   - Integrate SendGrid or AWS SES SDK
   - Create HTML email templates (order confirmation, status update, welcome, password reset)
   - Use a template engine (handlebars or ejs) for dynamic content
   - Track email delivery status
2. BullMQ worker implementation:
   ```ts
   // Email worker actually sends emails via SendGrid
   new Worker('emails', async (job) => {
     const { type, to, data } = job.data;
     switch (type) {
       case 'order_confirmation': await sendOrderConfirmation(to, data); break;
       case 'status_update': await sendStatusUpdate(to, data); break;
       case 'welcome': await sendWelcomeEmail(to, data); break;
     }
   });
   ```
3. SMS integration:
   - Twilio SDK for SMS notifications
   - Order status updates, delivery ETA, verification codes
   - Opt-in/opt-out management
4. In-app notifications:
   ```ts
   // Notification model
   {
     user: ObjectId (ref User),
     type: String ('order_update', 'promo', 'system'),
     title: String,
     body: String,
     data: Object,     // e.g., { orderId: '...' }
     read: Boolean default false,
     createdAt: Date
   }
   ```
   - Save notifications to DB when events occur
   - Emit via socket.io to user's room
   - API: `GET /api/v1/notifications`, `PATCH /api/v1/notifications/:id/read`, `PATCH /api/v1/notifications/read-all`
5. Frontend notification bell:
   - Badge count of unread notifications
   - Dropdown with recent notifications
   - Click to navigate to relevant page (e.g., order detail)

---

## 4.3 Customer Features

### New files:
- `server/src/modules/loyalty/` — NEW module
- `server/src/modules/favorites/` — NEW module
- `server/src/modules/reservations/` — NEW module

### Files to modify:
- `src/pages/OrderDetail.tsx` — Add reorder button
- `src/pages/Menu.tsx` — Add favorite toggle on items
- `src/store/useCartStore.ts` — Add saved-for-later

### Implementation:
1. Reorder:
   - `POST /api/v1/orders/:id/reorder`
   - Takes all items from previous order, adds to cart
   - Frontend: "Reorder" button on order detail page
2. Favorites:
   - `POST /api/v1/favorites/:menuItemId` — Toggle favorite
   - `GET /api/v1/favorites` — List favorites
   - Frontend: heart toggle on menu item cards, "Favorites" filter on menu
3. Saved for later:
   - Add `savedItems` array to Cart model (separate from active cart)
   - Move items between cart and saved items
   - Frontend: "Save for Later" link in CartDrawer
4. Loyalty program:
   ```ts
   // Loyalty model
   {
     user: ObjectId,
     points: Number,
     tier: String ('bronze' | 'silver' | 'gold' | 'platinum'),
     totalSpent: Number,
     orderCount: Number,
     rewards: [{ type: String, redeemed: Boolean, ... }]
   }
   ```
   - Award points per order (e.g., 1 point per $1)
   - Tier benefits: bronze (0), silver (free delivery), gold (10% off), platinum (priority)
   - Redeem points for discounts
   - Frontend: loyalty page showing points, tier, rewards
5. Reservations (basic):
   ```ts
   // Reservation model
   {
     user: ObjectId,
     branch: ObjectId,
     date: Date,
     time: String,   // '18:00', '18:30', etc.
     guests: Number,
     tableNumber: String,
     status: String ('pending', 'confirmed', 'cancelled', 'completed'),
     specialRequests: String
   }
   ```
   - CRUD for reservations
   - Time slot availability checking
   - Admin view: reservations calendar
   - Customer: book, modify, cancel reservations

---

## 4.4 Marketing & Promotions

### Files to modify:
- `server/src/modules/coupons/coupon.service.ts` — Enhanced coupon logic
- `server/src/modules/coupons/coupon.controller.ts` — Admin CRUD
- `server/src/modules/coupons/coupon.routes.ts` — Add admin routes
- `server/src/modules/pricing/pricing.service.ts` — Add time-based pricing
- `apps/admin-dashboard/src/pages/MarketingPage.tsx` — NEW or replace placeholder

### Implementation:
1. Coupon enhancement:
   - Coupon stacking (allow multiple coupons per order)
   - Auto-best-coupon selection (apply highest value coupon automatically)
   - Coupon validation at checkout time (not just at add time)
   - `timesUsed` counter increment when coupon is applied (currently missing!)
   - Admin CRUD for coupons: create, list, edit, deactivate
   - Coupon analytics: usage count, revenue impact, redemption rate
2. Time-based pricing:
   ```ts
   // SpecialPrice model (embedded or separate)
   {
     menuItem: ObjectId,
     dayOfWeek: [Number],  // 0-6, empty = every day
     startTime: String,    // '11:00'
     endTime: String,      // '14:00'
     price: Number,
     label: String         // 'Lunch Special'
   }
   ```
   - Apply special prices during defined windows
   - Auto-revert to regular price outside window
   - Frontend: show "Lunch Special" badge with special price
3. Combo/bundle deals:
   ```ts
   // Combo model
   {
     name: String,
     items: [{ menuItem: ObjectId, quantity: Number }],
     price: Number,        // Combo price (below sum of individual)
     available: Boolean,
     startDate: Date,
     endDate: Date
   }
   ```
   - Add combo as special menu item
   - When added to cart, add all component items with combo pricing
4. Admin marketing dashboard:
   - Coupon management (create, track, analytics)
   - Special pricing management (time-based, date-range)
   - Combo deal management
   - Promotional banner management

---

## 4.5 Analytics & Reports

### Files to modify:
- `server/src/modules/analytics/` — NEW module
- `apps/admin-dashboard/src/pages/AnalyticsPage.tsx` — Replace placeholder
- `apps/admin-dashboard/src/pages/DashboardPage.tsx` — Add real analytics

### Implementation:
1. Analytics service:
   - Revenue: daily, weekly, monthly, by branch, by category, by item
   - Orders: count, average value, fulfillment time trends
   - Customers: new vs returning, retention rate, lifetime value
   - Menu performance: top sellers, slow movers, profitability
   - Peak hours: orders by hour/day for staffing optimization
2. Report generation:
   - PDF export (PDFKit or Puppeteer)
   - CSV export for spreadsheet analysis
   - Scheduled email reports (daily sales summary, weekly performance)
3. Admin dashboard analytics widgets:
   - Revenue chart (with period comparison)
   - Order volume trends
   - Customer acquisition chart
   - Top 10 selling items
   - Staff performance metrics
   - Real-time sales counter

---

## Testing Criteria for Phase 4

- [ ] CartContext removed, all cart operations use useCartStore with server sync
- [ ] Real-time order tracking shows live status updates on OrderDetail page
- [ ] PWA installable with offline fallback
- [ ] SEO: each page has unique meta tags + JSON-LD structured data
- [ ] Email notifications sent and rendered correctly (order confirm, status, welcome)
- [ ] SMS notifications sent for delivery updates
- [ ] In-app notification bell shows unread count, clicking navigates to relevant page
- [ ] Reorder adds previous order items to current cart
- [ ] Favorites toggle works and persists
- [ ] Loyalty points accrue per order and can be redeemed
- [ ] Reservation booking flow works end-to-end
- [ ] Coupon management admin UI: create, edit, track usage
- [ ] Time-based pricing applies automatically during specified windows
- [ ] Combo/bundle deals price correctly in cart
- [ ] Analytics dashboard shows real data with charts and exports
