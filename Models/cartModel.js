const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartModel = mongoose.model("carts", cartSchema);
module.exports = cartModel;
