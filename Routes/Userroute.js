const express = require('express');
const { registerUser, loginUser,getAllUsers} = require('../Controllers/Usercontroller');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, admin, getAllUsers);

module.exports = router;

