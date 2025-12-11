// Create New schema for blacklisted
const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
  token: { type: String, required: [true, "Token is required"] },
});

const blacklistedTokenModel = mongoose.model("blacklistedTokens", tokenSchema);

module.exports = blacklistedTokenModel;
