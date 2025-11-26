const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    // Log login
    await AuditLog.create({
      actorName: user.fullName,
      action: 'LOGIN',
      details: 'User successfully logged in',
    });

    res.json({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      jobTitle: user.jobTitle,
      department: user.department,
      email: user.email,
      extension: user.extension,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.department = req.body.department || user.department;
    user.extension = req.body.extension || user.extension;

    const updatedUser = await user.save();

    await AuditLog.create({
      actorName: user.fullName,
      action: 'UPDATE_PROFILE',
      details: 'User updated their profile details',
    });

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      fullName: updatedUser.fullName,
      role: updatedUser.role,
      jobTitle: updatedUser.jobTitle,
      department: updatedUser.department,
      email: updatedUser.email,
      extension: updatedUser.extension,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (user && (await user.matchPassword(oldPassword))) {
    user.password = newPassword;
    await user.save();

    await AuditLog.create({
      actorName: user.fullName,
      action: 'CHANGE_PASSWORD',
      details: 'User changed their own password',
    });

    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid old password');
  }
});

module.exports = { authUser, updateUserProfile, changeUserPassword };