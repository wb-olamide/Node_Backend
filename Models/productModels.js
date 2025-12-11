const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  Image: {
    type: String,
  },
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
