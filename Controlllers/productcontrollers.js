const productModel = require("../Models/productModels");

const postProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Products added Succesfully",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products added Succesfully",
      product
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  postProduct,
};

