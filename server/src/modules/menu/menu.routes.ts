import express from 'express';

const router = express.Router();

// Menu routes will go here
router.get('/', (req, res) => {
  res.send('Menu module');
});

export default router;
