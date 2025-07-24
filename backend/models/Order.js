const { text } = require('express');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: String,
      productTitle: String,
      quantity: Number,
      price: Number,
      total: Number,
      selectedColor: String,
      selectedSize: String,
      designImage: String,
      text: String,       
      description: String, 
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
