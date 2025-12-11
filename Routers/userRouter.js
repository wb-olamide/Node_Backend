const express = require("express");
const {
  getAllUsers,
  getModifeiedUser,
  updateUserProfile,
  getUserbyID,
  getSingleUser,
  deleteUser,
} = require("../Controlllers/userController");
const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "User fetched succesfully",
//   });
// });

// userRouter.post("/postuser", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "User Posted succesfully",
//   });
// });

userRouter.get("/", getAllUsers);
userRouter.get("/search", getModifeiedUser);
userRouter.patch("/profile/:id", updateUserProfile);
userRouter.get("/profile/:id", getUserbyID);
userRouter.get("/profile", getSingleUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
