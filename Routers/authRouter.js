const express = require("express");
const authRouter = express.Router();
const {
  forgetPassword,

  handleSignup,
  loginHandler,
  verificationLink,
} = require("../Controlllers/authcontrollers");

authRouter.post("/signup", handleSignup);
authRouter.post("/login", loginHandler);
authRouter.get("/verify/:token", verificationLink);

authRouter.post("/forgot-password", forgetPassword);

module.exports = authRouter;
