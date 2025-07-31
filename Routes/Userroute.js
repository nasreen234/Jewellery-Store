const express = require('express');
const { registerUser, loginUser,getAllUsers,getUserProfile,
  updateUserProfile} = require('../Controllers/Usercontroller');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, admin, getAllUsers);
router.get('/me', protect, getUserProfile);       // Get current user's profile
router.put('/me', protect, updateUserProfile);   
router.patch('/me',protect, updateUserProfile) // Update current user's profile
module.exports = router;

