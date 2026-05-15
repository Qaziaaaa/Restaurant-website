import express from 'express';

const router = express.Router();

// Orders routes will go here
router.get('/', (req, res) => {
  res.send('Orders module');
});

export default router;
