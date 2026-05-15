import express from 'express';

const router = express.Router();

// User routes will go here
router.get('/', (req, res) => {
  res.send('Users module');
});

export default router;
