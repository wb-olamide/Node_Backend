const express = require("express");
const cartRouter = express.Router();
const { addToCart } = require("../Controlllers/cartConttoller");

cartRouter.post("/addCart", addToCart);

module.exports = cartRouter;


