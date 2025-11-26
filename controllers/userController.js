const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const generateToken = require('../utils/generateToken');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Admin
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, fullName, role, jobTitle, department, email, extension } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    password,
    fullName,
    role,
    jobTitle,
    department,
    email,
    extension,
    avatar: `https://picsum.photos/200/200?random=${Date.now()}`
  });

  if (user) {
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'CREATE_USER',
      details: `Created user: ${user.username} as ${user.role}`,
    });
    res.status(201).json({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Initial Admin Setup
// @route   POST /api/users/setup
// @access  Public (Only works if 0 users exist)
const setupAdmin = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  
  if (count > 0) {
    res.status(400);
    throw new Error('Admin account already exists. Please login to create more users.');
  }

  const { username, password, fullName, email } = req.body;

  const user = await User.create({
    username,
    password,
    fullName,
    email,
    role: 'ADMIN', // Force role to ADMIN
    jobTitle: 'System Administrator',
    department: 'IT',
    extension: '000',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
  });

  if (user) {
    await AuditLog.create({
      actorName: 'System',
      action: 'SYSTEM_INIT',
      details: 'Initial Admin account created via setup route',
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'DELETE_USER',
      details: `Deleted user: ${user.username} (${user.fullName})`,
    });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Reset User Password (Admin)
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
const resetUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { newPassword } = req.body;

  if (user) {
    user.password = newPassword;
    await user.save();

    await AuditLog.create({
      actorName: req.user.fullName,
      action: 'RESET_PASSWORD',
      details: `Admin ${req.user.fullName} reset password for user: ${user.fullName} (ID: ${user.id})`,
    });

    res.json({ message: 'Password reset successful' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get Audit Logs
// @route   GET /api/users/logs
// @access  Private
const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLog.find({}).sort({ timestamp: -1 });
  res.json(logs);
});

module.exports = { getUsers, registerUser, setupAdmin, deleteUser, resetUserPassword, getAuditLogs };