const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {

        name: String,
        qty: Number,
        price: Number,
        image: String,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);