const Order = require('../models/Order');
const Counter = require('../models/Counter');

const createOrder = async (req, res) => {
  const { items, totalPrice, paymentMethod } = req.body;
  const userId = req.user.id;

  if (!items || !totalPrice) {
    return res.status(400).json({ message: 'Missing order data' });
  }

  try {
    let counter = await Counter.findOneAndUpdate(
      { name: 'orderId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const newOrder = new Order({
      orderId: `ORDER-${counter.value}`,
      user: userId,
      items,
      totalPrice,
      paymentMethod: paymentMethod || 'cod',
      status: 'pending',
      date: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', orderId: newOrder.orderId });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
