const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../Controllers/Cartcontroller');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.patch('/update', protect, updateCartItem);
router.delete('/remove/:productId', protect, removeCartItem);
router.delete('/clear', protect, clearCart);

module.exports = router;
