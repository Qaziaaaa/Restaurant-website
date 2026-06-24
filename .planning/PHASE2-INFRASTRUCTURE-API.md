# PHASE 2: Operations & Infrastructure

**Goal**: Production-grade infrastructure, API quality, and developer workflow.

---

## 2.1 CI/CD Pipeline

### Files to modify:
- `.github/workflows/main.yml` — Full build/test/deploy pipeline
- `Dockerfile.frontend` — NEW: frontend container
- `Dockerfile.admin` — NEW: admin dashboard container
- `docker-compose.yml` — NEW: multi-service compose (root level)

### Implementation:
1. Full CI pipeline:
   ```yaml
   jobs:
     validate:
       - Install dependencies (all 3 packages)
       - TypeScript check (all 3)
       - Lint (all 3)
       - Run tests (server + frontend)
     build:
       - Build server Docker image
       - Build frontend static files
       - Build admin dashboard static files
     deploy:
       - Deploy API to Railway/Render/Fly.io
       - Deploy frontend to Vercel/Cloudflare Pages
       - Deploy admin dashboard to Vercel/Cloudflare Pages
   ```
2. Create Dockerfiles for frontend and admin dashboard
3. Create root-level docker-compose.yml with all 3 services + MongoDB + Redis
4. Add healthcheck directives to each service

---

## 2.2 Monitoring & Observability

### Files to modify:
- `server/src/monitoring/metrics.ts` — Add more metrics
- `server/src/middlewares/metricsMiddleware.ts` — Track more request data
- `server/src/queues/queue.service.ts` — Add queue metrics
- `server/src/sockets/socket.service.ts` — Add socket metrics
- `server/src/app.ts` — Add Sentry/Datadog integration
- `server/src/server.ts` — Add correlation ID to all logs

### Implementation:
1. Prometheus metrics additions:
   ```ts
   // Database query duration
   const dbQueryDuration = new Histogram({ name: 'db_query_duration_seconds', ... });
   // Active WebSocket connections gauge
   const activeSocketConnections = new Gauge({ name: 'active_socket_connections', ... });
   // Queue job counts
   const queueJobCount = new Gauge({ name: 'queue_job_count', ... });
   // Memory/CPU by process
   const processMemory = new Gauge({ name: 'process_memory_bytes', ... });
   ```
2. Add MongoDB mongoose plugin to instrument query duration
3. Track socket connection/disconnection events
4. Add Sentry for error tracking:
   - Install `@sentry/node` on server
   - Install `@sentry/react` on frontend
   - Add performance tracing
5. Add structured logging with correlationId on every log entry

---

## 2.3 Infrastructure

### Files to modify:
- `server/nginx.conf` — NEW: reverse proxy config
- `server/src/middlewares/securityMiddleware.ts` — NEW: HTTPS redirect, HSTS
- `server/src/config/db.ts` — Add retry logic + health check
- `server/src/server.ts` — Add liveness/readiness probes

### Implementation:
1. Create nginx config:
   ```nginx
   # Static file serving for frontend
   # API proxy to Express
   # SSL termination with certbot
   # Gzip, caching headers
   # Rate limiting per IP
   ```
2. Add security middleware:
   - HTTP → HTTPS redirect (production only)
   - Strict-Transport-Security header
   - X-Frame-Options, X-Content-Type-Options
   - Referrer-Policy
3. Database connection with retry:
   ```ts
   // Retry connection up to 5 times with exponential backoff
   // Wait for MongoDB to be ready before proceeding
   ```
4. Add `/health/live` and `/health/ready` endpoints:
   - Liveness: just returns 200 (process is alive)
   - Readiness: checks DB, Redis, queue connections

---

## 2.4 API Quality & Input Validation

### Files to modify:
- `server/src/modules/cart/cart.validator.ts` — NEW: Zod schemas for cart
- `server/src/modules/orders/orders.validator.ts` — NEW: Zod schemas for orders
- `server/src/modules/menu/menu.validator.ts` — NEW: Zod schemas for menu CRUD
- `server/src/modules/orders/orders.controller.ts` — Add validate middleware
- `server/src/modules/menu/menu.controller.ts` — Add validate middleware
- `server/src/modules/cart/cart.controller.ts` — Add validate middleware
- `server/src/docs/openapi.yaml` — NEW: OpenAPI spec

### Implementation:
1. Cart validators:
   ```ts
   const addItemSchema = z.object({
     body: z.object({
       menuItem: z.string(),
       quantity: z.number().min(1).max(100),
       selectedAddons: z.array(z.object({ name: z.string(), price: z.number() })).optional(),
       selectedVariant: z.object({ name: z.string(), price: z.number() }).optional(),
     }),
   });
   ```
2. Order validators:
   ```ts
   const createOrderSchema = z.object({
     body: z.object({
       deliveryAddress: z.object({ street: z.string(), city: z.string(), ... }),
       couponCode: z.string().optional(),
     }),
   });
   ```
3. Menu validators for admin CRUD
4. Generate OpenAPI 3.0 spec from Zod schemas using `zod-to-openapi`:
   - Auto-generate from all route schemas
   - Serve at `/api/v1/docs`
   - Add Swagger UI at `/api/v1/docs/ui`
5. Standardize pagination:
   - All paginated endpoints return: `{ items, pagination: { total, page, limit, totalPages } }`
   - Fix orders controller to match this format

---

## 2.5 Request Logging & Auditing

### Files to modify:
- `server/src/middlewares/correlationMiddleware.ts` — Enhance with timing
- `server/src/app.ts` — Add structured request logging

### Implementation:
1. Enhance correlation middleware:
   - Generate correlationId if not present in headers
   - Track request start time
   - On response, log: method, URL, status, duration, correlationId, userId (if authenticated)
2. Morgan integration with Winston:
   - Log all HTTP requests in structured JSON format
   - Include correlationId in every log line

---

## Testing Criteria for Phase 2

- [ ] CI pipeline validates, builds, and deploys all 3 services
- [ ] Docker Compose starts all services and they communicate
- [ ] Prometheus metrics dashboards show meaningful data
- [ ] Sentry captures errors with full context traces
- [ ] Input validation exists on ALL API endpoints
- [ ] OpenAPI docs are served and accurate
- [ ] Nginx reverse proxy serves frontend + proxies API
- [ ] HTTPS redirect works in production
- [ ] Health check endpoints work correctly
- [ ] Request logging includes correlation IDs and timing
