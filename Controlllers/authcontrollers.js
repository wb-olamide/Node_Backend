const userModel = require("../Models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendWelcomeEmail = require("../emailTemplates/welcomeEmail");

// const handleSignup = async (req, res) => {
//   try {
//     console.log("hgf");

//     const user = await userModel.create(req.body);
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Unable to create User",
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// create verification Token
const verification = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const handleSignup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    //Check if Email already exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exist",
      });
    }
    // Hash the Password wg7wwwwwww7w9rd97dchshkkkkkf7sfhskmnksfh
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create verification Token
    const verificationToken = verification(email);
    console.log(verificationToken);

    // save to db
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
      verificationToken,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unable to signup",
      });
    }
    // send Welcom mail
    sendWelcomeEmail(fullName, email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.code || "Unable to signup",
    });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user with email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password incorrect: email",
      });
    }

    //compare the plain password (test1234) with the hashed password (34hkh3333h53khkhhkskhk44)
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is incorrect: password",
      });
    }
    if (!user.isVerified) {
      const verificationToken = verification(email);
      console.log(verificationToken);
      sendWelcomeEmail(user.fullName, email, verificationToken);
      return res.status(400).json({
        success: false,
        message: "User is not verified",
        user,
      });
    }

    //generate a accestoken(JSONWEBTOKEN)
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXP }
    );

    //SEND Token to frontend
    res.status(200).json({
      success: true,
      message: "Login Succesfull",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong at login contoller",
    });
  }
};

const verificationLink = async (req, res) => {
  try {
    // Get our token from params
    const { token } = req.params;
    // console.log(token);

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.email);
    // find user
    const user = await userModel.findOne({ email: decoded.email });
    if (!user || !user.verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }
    // console.log(user);
    // verify token
    user.isVerified = true;
    user.verificationToken = undefined;

    res.status(200).json({
      success: true,
      message: `Your email address is ${decoded.email} and profile is ${user}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const forgetPassword = (req, res) => {
  const { email } = req.body;
  res.status(200).json({
    success: true,
    message: `Password reset link has been sent to your email: ${email}`,
  });
};

// Named Export
module.exports = {
  forgetPassword,
  handleSignup,
  loginHandler,
  verificationLink,
};
