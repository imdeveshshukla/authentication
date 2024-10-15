const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.admin.username}! This is a protected route.` });
});

module.exports = router;
