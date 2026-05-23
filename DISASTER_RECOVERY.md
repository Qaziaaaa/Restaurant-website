# Disaster Recovery & Backup Plan

## Backup Strategy

### 1. Database (MongoDB)
- **Frequency**: Daily Automated Backups via MongoDB Atlas.
- **Retention**: 30 days.
- **Manual Export**: `mongodump --uri="<uri>"`

### 2. Logs
- All logs are stored in `logs/` and should be shipped to a centralized logging platform (e.g., Datadog, ELK).

## Recovery Procedures

### 1. Database Failure
1. Identify the latest healthy backup in MongoDB Atlas.
2. Restore to a new cluster if the current cluster is corrupted.
3. Update `MONGO_URI` in the environment variables.
4. Restart all backend instances.

### 2. Regional Outage
1. Deploy infrastructure to a secondary region (DR region).
2. Point DNS to the DR region Load Balancer.
3. Synchronize MongoDB using Global Clusters if possible.

## Incident Response
1. **Detect**: Alerts from Grafana/Prometheus.
2. **Contain**: Isolate the failing component or instance.
3. **Eradicate**: Fix the root cause or rollback to the previous stable version.
4. **Recover**: Scale back up and monitor metrics.
