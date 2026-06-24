# PHASE 5: Enterprise Scale & Compliance

**Goal**: Security hardening, compliance, scale to 100k+ orders, and third-party integrations.

---

## 5.1 Security Hardening

### Files to modify:
- `server/src/modules/auth/auth.controller.ts` — Add MFA flow
- `server/src/modules/auth/auth.service.ts` — MFA token management
- `server/src/modules/auth/auth.validator.ts` — MFA schemas
- `server/src/models/User.ts` — Add `mfaSecret`, `mfaEnabled`
- `server/src/middlewares/csrfMiddleware.ts` — NEW
- `server/src/modules/sessions/` — NEW: session management
- `apps/admin-dashboard/src/pages/SettingsPage.tsx` — Session management UI

### Implementation:
1. MFA/2FA:
   ```ts
   // Install speakeasy + qrcode
   // POST /auth/mfa/setup — Generate TOTP secret, return QR code
   // POST /auth/mfa/enable — Verify TOTP code, enable MFA
   // POST /auth/mfa/disable — Admin only or with password confirmation
   // Login flow: if mfaEnabled, return { mfaRequired: true, token: 'mfa_token' }
   // POST /auth/mfa/verify — Verify TOTP, complete login
   ```
   - Frontend: MFA setup page with QR code, verification input
   - Backup codes for account recovery
   - Required for all admin/manager accounts
2. CSRF Protection:
   - Install `csrf-csrf` package
   - Generate CSRF token, send via cookie
   - Frontend: read CSRF token cookie, send in `X-CSRF-Token` header
   - Apply to all state-changing requests (POST, PUT, PATCH, DELETE)
3. Session management:
   - `GET /api/v1/auth/sessions` — List all active sessions with device info
   - `DELETE /api/v1/auth/sessions/:id` — Revoke specific session
   - `DELETE /api/v1/auth/sessions` — Revoke all other sessions
   - `POST /api/v1/auth/sessions/set-limit` — Max concurrent sessions (admin)
   - Admin dashboard: session management UI for staff accounts
   - Device fingerprinting: hash of user-agent + IP + browser features
4. Additional security:
   - Harden JWT secrets: generate via crypto.randomBytes(64).toString('hex')
   - Add CORS for production origins only
   - Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`
   - Add `Content-Security-Policy` header
   - Add `Permissions-Policy` header

---

## 5.2 Compliance (GDPR / CCPA / PCI)

### Files to modify:
- `server/src/models/User.ts` — Add consent fields
- `server/src/modules/compliance/` — NEW module
- `server/src/middlewares/dataProtectionMiddleware.ts` — NEW
- `server/src/utils/auditLogger.ts` — NEW: comprehensive audit logging

### Implementation:
1. Data protection:
   ```ts
   // User consent fields
   marketingConsent: { type: Boolean, default: false },
   dataProcessingConsent: { type: Boolean, default: false },
   consentDate: Date,
   consentVersion: String
   ```
   - Consent collection at registration
   - Consent withdrawal endpoint
   - Consent history log
2. Data export:
   - `GET /api/v1/compliance/export-data` — Export all user data as JSON/ZIP
   - Includes: profile, orders, addresses, communications, consent history
   - Async: generate file, email download link when ready
3. Account deletion:
   - `DELETE /api/v1/compliance/delete-account` — Full GDPR right to erasure
   - Anonymize personal data (keep orders for analytics but remove PII)
   - 30-day grace period for undo
4. Audit logging enhancement:
   - Log all data access events (who viewed what data, when)
   - Log all admin actions (status changes, user modifications)
   - Immutable audit log (append-only, with hash chain)
   - Audit log viewer in admin dashboard
5. PCI compliance considerations:
   - Never store raw card numbers (use Stripe Elements)
   - No card data in logs
   - Encryption at rest for sensitive data
   - Regular security scanning

---

## 5.3 Performance & Scale

### Files to modify:
- `server/src/models/*.ts` — Add database indexes
- `server/src/config/db.ts` — Connection pooling, read replicas
- `server/src/services/cache.service.ts` — Enhanced caching
- `server/src/app.ts` — Cluster mode
- `infra/k8s/` — NEW: Kubernetes manifests

### Implementation:
1. Database optimization:
   ```ts
   // Review and add compound indexes for all query patterns
   // Examples:
   OrderSchema.index({ user: 1, createdAt: -1 });           // User's orders
   OrderSchema.index({ orderStatus: 1, createdAt: -1 });    // Kitchen view
   OrderSchema.index({ branch: 1, orderStatus: 1 });        // Branch kitchen
   OrderSchema.index({ 'items.menuItem': 1 });              // Menu item sales
   MenuItemSchema.index({ category: 1, basePrice: 1 });     // Menu browsing
   MenuItemSchema.index({ name: 'text', description: 'text' }); // Full text search
   ```
   - Use MongoDB Atlas or replica sets for production
   - Configure read preference: primary for writes, secondary for reads (where acceptable)
   - Connection pool tuning (default 10 → 50-100 for production)
2. Caching strategy:
   - Cache menu items (TTL: 5 min) — already implemented
   - Cache popular menu lists (TTL: 1 min)
   - Cache user profile (TTL: 10 min)
   - Cache order for 30 seconds (frequent re-fetches on order detail page)
   - Invalidate cache on mutations (already partially implemented)
   - Add cache warming on server start
3. Horizontal scaling:
   - Docker Compose → Kubernetes manifests
   - Stateless API servers behind load balancer
   - Redis adapter for Socket.io (already implemented)
   - Node.js cluster mode for multi-core utilization
   - Auto-scaling based on CPU/memory metrics
4. CDN configuration:
   - Serve static assets (images, fonts, CSS, JS) via CDN
   - Cache menu images with CDN
   - Set proper Cache-Control headers
   - Use content hash filenames for cache busting
5. Compression:
   - Enable Brotli compression (better than gzip)
   - Compress API responses (already using compression middleware)
   - Configure nginx for static asset compression

---

## 5.4 Third-Party Integrations

### New files:
- `server/src/modules/integrations/` — NEW module
- `server/src/modules/integrations/accounting/`
- `server/src/modules/integrations/pos/`
- `server/src/modules/integrations/delivery-aggregators/`

### Implementation:
1. Accounting integration (QuickBooks / Xero):
   - `POST /api/v1/admin/integrations/quickbooks/auth` — OAuth2 flow
   - Sync orders as invoices in QuickBooks
   - Sync menu items as products/items
   - Daily/weekly revenue sync
   - Webhook for invoice status updates
2. POS integration:
   - Toast / Square / Clover integration
   - Menu sync: push menu from app to POS
   - Order sync: orders from app appear in POS
   - Inventory sync: stock changes in either system reflected in both
3. Delivery aggregator integration:
   - Uber Eats / DoorDash / Grubhub integration
   - Menu sync: push menu to all platforms
   - Order ingestion: receive orders from platforms via webhook
   - Status sync: update platform order status from kitchen
   - Inventory sync: update platform when items sell out
4. Embeddable online ordering widget:
   - JavaScript embed snippet for restaurant's existing website
   - iframe or React widget
   - Supports: menu browsing, cart, checkout with Stripe
   - Customizable styling to match existing site

---

## 5.5 Intelligent Features

### New files:
- `server/src/modules/ai/` — NEW module (using existing @google/genai dependency)

### Implementation:
1. Smart predictions:
   - Predict busy hours based on historical data
   - Suggest menu item prep counts based on day/season
   - Recommend inventory ordering quantities
2. Customer insights:
   - Personalized menu recommendations based on order history
   - "Frequently bought together" suggestions
   - Next order date prediction for re-engagement
3. Operational insights:
   - Anomaly detection (unusual order patterns, fraud detection)
   - Kitchen performance analytics (prep time trends, bottlenecks)
   - Revenue forecasting

---

## 5.6 Documentation & Knowledge Base

### New files:
- `server/src/docs/` — Populate with full API docs
- `docs/ARCHITECTURE.md` — System architecture doc
- `docs/API.md` — Generated OpenAPI spec
- `docs/DEVELOPER.md` — Local dev setup, contribution guide
- `docs/ADMIN_GUIDE.md` — Admin dashboard usage guide

### Implementation:
1. API documentation:
   - Complete OpenAPI 3.0 spec from Phase 2
   - Add descriptions for all endpoints, parameters, response schemas
   - Include example requests/responses
   - Authentication flow documentation
2. Architecture documentation:
   - System diagram (services, data flow, external integrations)
   - Tech stack decisions and rationale
   - Database schema diagram
   - Deployment architecture
3. Developer onboarding:
   - Setup instructions (clone, install, configure, run)
   - Testing guide
   - Contribution guidelines
   - Code style guide
4. Admin user guide:
   - How to use admin dashboard features
   - Troubleshooting common issues
   - Disaster recovery procedures (from existing DISASTER_RECOVERY.md)

---

## Testing Criteria for Phase 5

- [ ] MFA setup and verification works for admin accounts
- [ ] CSRF protection applied to all state-changing endpoints
- [ ] Session management: view active sessions, revoke specific/all
- [ ] GDPR data export produces complete user data JSON
- [ ] Account deletion anonymizes data correctly
- [ ] Audit log captures all admin actions
- [ ] Database indexes optimized for all query patterns
- [ ] Redis caching reduces response times by 60%+
- [ ] Kubernetes deployment scales horizontally
- [ ] CDN serves static assets with proper cache headers
- [ ] QuickBooks integration syncs orders as invoices
- [ ] Delivery aggregator can receive orders from external platforms
- [ ] Embeddable widget renders on external website
- [ ] AI predictions provide actionable insights
- [ ] All documentation is complete and accurate
