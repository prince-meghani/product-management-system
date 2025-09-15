const express = require('express');
const router = express.Router();
const User = require('../modals/user');
const authenticate =require('../middlewares/auth')

// GET /api/admin/users
router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    console.log('Fetched users:', users.length);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
