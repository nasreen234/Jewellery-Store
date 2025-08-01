const User = require('../models/Usermodel.js');
const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1m' });
};

// Register Admin/User
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });  

  const user = await User.create({ name, email, password, isAdmin });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  
  });

};

// Login Admin/User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
// Get All Users - Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({isAdmin:false}).select('-password'); // remove password from results
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get current user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json(user);
};


// Update current logged-in user

  const updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;
        user.address = req.body.address || user.address;


        // Update password only if provided
        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          mobile: updatedUser.mobile,
          address: updatedUser.address,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


module.exports = { registerUser, loginUser, getAllUsers,getUserProfile,updateUserProfile};

