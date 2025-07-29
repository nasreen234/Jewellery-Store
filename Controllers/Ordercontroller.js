const Order = require('../models/Ordermodel.js');

 const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed' });
  }
};

 const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
  res.json(orders);
};

 const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').populate('orderItems.product');
  res.json(orders);
};

 const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = req.body.isDelivered ?? order.isDelivered;
    order.deliveredAt = req.body.isDelivered ? new Date() : order.deliveredAt;

    order.isPaid = req.body.isPaid ?? order.isPaid;
    order.paidAt = req.body.isPaid ? new Date() : order.paidAt;

    const updated = await order.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
 module.exports ={ createOrder,getMyOrders,getAllOrders,updateOrderStatus }