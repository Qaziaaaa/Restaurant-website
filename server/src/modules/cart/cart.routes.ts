import express from 'express';

const router = express.Router();

// Cart routes will go here
router.get('/', (req, res) => {
  res.send('Cart module');
});

export default router;
