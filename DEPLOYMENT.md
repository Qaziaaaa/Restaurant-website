# Production Deployment Guide

## Infrastructure Requirements
- **Node.js**: v20+
- **MongoDB**: Atlas or Managed Instance
- **Redis**: v7+ (Cloud or Container)
- **Container Registry**: GitHub Packages or Docker Hub

## Deployment Steps

### 1. Environment Configuration
Create a `.env` file with:
- `MONGO_URI`
- `REDIS_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NODE_ENV=production`

### 2. Docker Deployment
```bash
docker compose -f docker-compose.yml up -d --build
```

### 3. Monitoring Setup
- **Prometheus**: Scrape `/api/v1/metrics`
- **Grafana**: Use Prometheus as datasource
- **Loki**: Stream logs from `logs/*.log`

## Scaling Strategy
The backend is stateless and supports horizontal scaling.
- Use a Load Balancer (Nginx/ALB) to distribute traffic.
- The **Socket.io Redis Adapter** handles cross-instance communication.
- Increase `replica` count in your container orchestrator.
