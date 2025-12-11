const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is importanter"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must at least 6 chacters"],
  },
  age: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"], // set of options
  },
  verificationToken: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;




