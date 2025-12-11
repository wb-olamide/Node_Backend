// Model.find
// Model.findbyId
// Model.findbyQuery

const userModel = require("../Models/userModels");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Unable to fetch Users",
        })
      );
    }
    res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      total: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch Users",
    });
  }
};
const getModifeiedUser = async (req, res) => {
  try {
    const user = await userModel.find({ age: 10 });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch User",
    });
  }
};

const getUserbyID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndUpdate(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch User",
    });
  }
};

const getSingleUser = async (req, res) => {
  const { email } = req.query;
  // /api/user/details?email=bwaliu8@gmail.com
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch User",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch User",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not Deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch User",
    });
  }
};

module.exports = {
  getAllUsers,
  getModifeiedUser,
  getUserbyID,
  getSingleUser,
  updateUserProfile,
  deleteUser,
};
