# PHASE 3: Real Restaurant Operations

**Goal**: Build the features that make this actually usable by a restaurant — kitchen display, multi-branch, delivery management, inventory.

---

## 3.1 Kitchen Display System (KDS)

### New files:
- `server/src/modules/kitchen/` — NEW module directory
- `server/src/modules/kitchen/kitchen.controller.ts`
- `server/src/modules/kitchen/kitchen.service.ts`
- `server/src/modules/kitchen/kitchen.routes.ts`
- `server/src/modules/kitchen/kitchen.validator.ts`

### Files to modify:
- `server/src/routes/index.ts` — Register kitchen routes
- `server/src/modules/orders/orders.service.ts` — Add KDS event emissions
- `apps/admin-dashboard/src/pages/KitchenPage.tsx` — Full rewrite with real data

### Implementation:
1. Kitchen controller:
   - `GET /api/v1/kitchen/orders` — Returns all active orders grouped by status
     - Groups: NEW (just confirmed), PREPARING, READY
     - Each order includes: items, prep time elapsed, assigned chef (optional)
   - `POST /api/v1/kitchen/orders/:id/accept` — Chef accepts order, status → PREPARING
   - `POST /api/v1/kitchen/orders/:id/complete` — Order ready, status → READY
   - `GET /api/v1/kitchen/metrics` — Average prep time, orders waiting, critical items
2. Kitchen service:
   - Add timer tracking (time elapsed since status → CONFIRMED)
   - SLA alerts: if prep time > expected time, flag as critical
3. Socket events:
   - When order is accepted: emit `kds_order_accepted` to admin room
   - When order is ready: emit `kds_order_ready` to admin room
   - When SLA is breached: emit `kds_sla_alert`
4. Admin KitchenPage:
   - Real order cards with item list, timer, action buttons
   - Grouped by status tabs
   - Critical orders highlighted in red
   - Sound alert for new orders
   - Filter by station/chef

---

## 3.2 Multi-Branch Support

### Files to modify:
- `server/src/models/RestaurantBranch.ts` — Already exists
- `server/src/modules/branch/` — NEW module
- `server/src/modules/menu/menu.service.ts` — Add branch filter
- `server/src/modules/orders/orders.service.ts` — Add branch awareness
- `apps/admin-dashboard/src/components/Sidebar.tsx` — Branch selector

### Implementation:
1. Branch CRUD:
   - `POST /api/v1/admin/branches` — Create branch
   - `GET /api/v1/branches` — List branches (public)
   - `PATCH /api/v1/admin/branches/:id` — Update branch
   - `DELETE /api/v1/admin/branches/:id` — Deactivate branch
2. Branch-aware menu:
   - Menu items have `branchAvailability` field (already exists in MenuItem model)
   - Filter menu items by branch when querying
   - Different pricing per branch (optional)
3. Branch-aware orders:
   - Associate order with branch
   - Kitchen view scoped to branch
   - Delivery radius validation per branch
4. Admin dashboard:
   - Branch selector dropdown in header
   - All views filter by selected branch
   - Branch-specific stats (revenue, orders, etc.)

---

## 3.3 Delivery Management

### New files:
- `server/src/modules/delivery/` — NEW module
- `server/src/modules/delivery/delivery.controller.ts`
- `server/src/modules/delivery/delivery.service.ts`
- `server/src/modules/delivery/delivery.routes.ts`

### Files to modify:
- `server/src/models/Order.ts` — Add `deliveryPersonnel`, `estimatedDeliveryTime`
- `server/src/models/User.ts` — Add `isAvailable` for delivery role
- `src/pages/OrderDetail.tsx` — Show live delivery tracking

### Implementation:
1. Delivery endpoints:
   - `GET /api/v1/admin/delivery/orders` — Orders ready for dispatch
   - `POST /api/v1/admin/delivery/assign` — Assign delivery person to order
   - `GET /api/v1/delivery/my-deliveries` — Rider's assigned orders
   - `PATCH /api/v1/delivery/orders/:id/status` — Rider updates status (picked up, en route, delivered)
2. Delivery service:
   - Auto-assign based on proximity (if geo-coordinates available)
   - Calculate estimated delivery time based on distance (Haversine formula)
   - Track delivery status: ASSIGNED → PICKED_UP → IN_TRANSIT → DELIVERED
3. Frontend OrderDetail:
   - Show live map with delivery person location (Leaflet/Mapbox)
   - Show estimated delivery time
   - SMS notification when out for delivery

---

## 3.4 Menu Management Admin UI

### Files to modify:
- `apps/admin-dashboard/src/pages/MenuPage.tsx` — Full rewrite
- `apps/admin-dashboard/src/lib/api.ts` — Add menu CRUD API functions
- `server/src/modules/menu/menu.service.ts` — Add bulk operations

### Implementation:
1. Admin menu management:
   - Menu items grid/list view with search, filter by category
   - Add/edit modal with all fields:
     - Name, description, category, base price
     - Image upload (with preview)
     - Variants (name, price) — dynamic add/remove
     - Addons (name, price) — dynamic add/remove
     - Spice level (0-3), prep time
     - Availability toggle, featured toggle
   - Delete with confirmation
   - Bulk operations: bulk price update, bulk category change, bulk delete
2. Category management:
   - CRUD for categories
   - Drag-and-drop reorder
   - Assign menu items to categories
3. Image upload:
   - `POST /api/v1/admin/upload` — Image upload endpoint
   - Process with sharp (resize, optimize)
   - Upload to CDN/cloud storage (Cloudinary, S3)

---

## 3.5 Inventory Management

### New files:
- `server/src/modules/inventory/` — NEW module
- `server/src/modules/inventory/inventory.controller.ts`
- `server/src/modules/inventory/inventory.service.ts`
- `server/src/modules/inventory/inventory.routes.ts`

### Files to modify:
- `server/src/models/MenuItem.ts` — Add `currentStock`, `lowStockThreshold`
- `apps/admin-dashboard/src/pages/InventoryPage.tsx` — NEW or replace placeholder

### Implementation:
1. Inventory model:
   ```ts
   ingredient: string;          // e.g., "Tomatoes"
   quantity: number;             // e.g., 50 (units)
   unit: string;                 // e.g., "kg", "units", "liters"
   minStockLevel: number;        // Alert when below this
   costPerUnit: number;
   supplier: string;
   lastRestocked: Date;
   ```
2. Inventory endpoints:
   - `GET /api/v1/admin/inventory` — List with search/filter
   - `POST /api/v1/admin/inventory` — Add ingredient
   - `PATCH /api/v1/admin/inventory/:id` — Update stock count
   - `POST /api/v1/admin/inventory/:id/restock` — Record restock
   - `GET /api/v1/admin/inventory/alerts` — Low stock alerts
3. Stock deduction:
   - When order status → CONFIRMED: deduct ingredients based on item recipe
   - If insufficient stock: flag order, notify kitchen
4. Admin UI:
   - Inventory dashboard with stock levels, low stock warnings
   - Restock log
   - Cost tracking

---

## 3.6 Order Enhancement

### Files to modify:
- `server/src/models/Order.ts` — Add order type, notes, table number
- `server/src/modules/orders/orders.service.ts` — Add new order types
- `src/pages/Checkout.tsx` — Add order type selection
- `src/pages/OrderDetail.tsx` — Show order type, notes

### Implementation:
1. Add to Order model:
   ```ts
   orderType: { type: String, enum: ['delivery', 'pickup', 'dine_in'], default: 'delivery' },
   dineInTable: { type: String }, // Table number for dine-in
   customerNotes: { type: String, maxlength: 500 },
   scheduledAt: { type: Date },   // Scheduled pickup/delivery time
   ```
2. Update order creation to support all types
3. Update frontend checkout:
   - Radio buttons for delivery/pickup/dine-in
   - Conditional fields based on type (address for delivery, table for dine-in)
   - Notes textarea
   - Optional scheduled time picker
4. Add auto-cancellation of unpaid orders after 30 minutes (cron job or TTL index)

---

## Testing Criteria for Phase 3

- [ ] Kitchen display shows real orders with live timer and SLA tracking
- [ ] Chef can accept and complete orders from kitchen view
- [ ] Multi-branch: each branch sees its own menu, orders, and stats
- [ ] Delivery: rider can be assigned and update delivery status
- [ ] Customer sees live delivery tracking with ETA
- [ ] Admin can fully manage menu items (CRUD, categories, images)
- [ ] Inventory tracks stock levels and triggers low-stock alerts
- [ ] Stock auto-deducts when order is confirmed
- [ ] Order types (delivery/pickup/dine-in) work end-to-end
- [ ] Unpaid orders auto-cancel after 30 minutes
