const express = require('express');
const router = express.Router();
const { getUsers, registerUser, deleteUser, resetUserPassword, getAuditLogs, setupAdmin } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/').get( getUsers).post(protect, adminOnly, registerUser);
router.post('/setup', setupAdmin); // Public route, only works if DB is empty
router.route('/logs').get(protect, getAuditLogs);
router.route('/:id').delete(protect, adminOnly, deleteUser);
router.route('/:id/reset-password').put(protect, adminOnly, resetUserPassword);

module.exports = router;