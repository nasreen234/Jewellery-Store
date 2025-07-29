const express = require ("express");
const{
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require ('../Controllers/Ordercontroller.js');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my',protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports =router;
