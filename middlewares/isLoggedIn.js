const userModel = require("../Models/userModels");
const blacklistedTokenModel = require("./blackListedToken");

const user = {
  name: "WB Olamide",
  role: "user",
  isLoggedIn: false,
};

// const isLoggedIn = (req, res, next) => {
//   console.log(req.body);
//   console.log("First Middleware");
//   if (!user.isLoggedIn) {
//     return res.status(403).json({
//       success: false,
//       message: "You have to be logged in to perform this action",
//     });
//   }
//   next();
// };

// fetch("", {
//     headers: {
//         authorization: `Bearer ${token}`
//     }
// })

const isLoggedIn = async (req, res, next) => {
  try {
    // 1. Check if user has token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      //   console.log(token);
    }
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }
    // 2.  confirm the token has not being blacklisted
    const blacklisted = await blacklistedTokenModel.findOne({ token });
    if (blacklisted) {
      return res.status(400).json({
        success: false,
        message: "Token has been blacklisted",
      });
    }
    // 3. check the token's validity and expiration. if valid, decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. find the token's user from DB
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    next();
  } catch (error) {}
};
// 2. check the token's validity and expiration
// 3. confirm the token has not been blacklisted
// 4. decode the token
// 5. find the token's user from DB
//6. Add the user to the re object

module.exports = isLoggedIn;
