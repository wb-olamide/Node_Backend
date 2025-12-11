const express = require("express");
const productRouter = express.Router();
const { postProduct } = require("../Controlllers/productcontrollers");
const isLoggedIn = require("../middlewares/isLoggedIn");
productRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product fetched succesfully",
  });
});
productRouter.get("/mm", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Single Product fetched succesfully",
  });
});

productRouter.post("/", isLoggedIn, postProduct);
// productRouter.post("/mm", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Product Posted fetched succesfully",
//   });
// });


module.exports = productRouter;
