const express = require('express');
const router = express.Router();
const { authUser, updateUserProfile, changeUserPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, changeUserPassword);

module.exports = router;