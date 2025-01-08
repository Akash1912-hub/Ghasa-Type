const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users and stats
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    const stats = {
      totalUsers: users.length,
      averageWpm: users.reduce((acc, user) => acc + user.bestWpm, 0) / users.length || 0,
      totalGamesPlayed: users.reduce((acc, user) => acc + user.gamesPlayed, 0)
    };

    res.json({ users, stats });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;