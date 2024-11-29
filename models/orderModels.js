const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  order_number: String,
  amount: Number,
  orderDate: Date,
});

module.exports = mongoose.model('Order', OrderSchema);
