import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be below 500ms
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000/api/v1';

export default function () {
  // 1. Get Menu
  const menuRes = http.get(`${BASE_URL}/menu`);
  check(menuRes, {
    'menu status is 200': (r) => r.status === 200,
    'menu has items': (r) => JSON.parse(r.body).data.items.length > 0,
  });

  sleep(1);

  // 2. Health Check
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
