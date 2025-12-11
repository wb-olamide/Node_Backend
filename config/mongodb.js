const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const mongoDbUri = process.env.MONGODB_URI

const connectToDb = async () => {
  try {
    const connected = await mongoose.connect(mongoDbUri);
    if (connected) {
      console.log("MongoDB connected 😎");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;


