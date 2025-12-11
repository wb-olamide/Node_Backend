const cartModel = require("../Models/cartModel");

const addToCart = async (req, res) => {
  try {
    const user = await cartModel.create(req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unable to create Cart",
      });
    }
    res.status(201).json({
      success: true,
      message: "Cart created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.messsage || "Unable to fetch Users",
    });
  }
};

module.exports = {
  addToCart,
};
