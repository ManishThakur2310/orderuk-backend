const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* 
----------------------------------------------------
  ✅ SIGNUP CONTROLLER
----------------------------------------------------
*/
exports.Signup = async (req, res) => {
  console.log("📥 Incoming request in Signup");

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      return res.status(422).json({
        success: false,
        message: "All fields (name, email, password) are required.",
      });
    }


    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login instead.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: newUser,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your signup request.",
      error: error.message,
    });
  }
};



/* 
----------------------------------------------------
  ✅ LOGIN CONTROLLER
----------------------------------------------------
*/
exports.Login = async (req, res) => {
  console.log("📥 Incoming request in Login");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please signup first.",
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in.",
      error: error.message,
    });
  }
};


/* 
----------------------------------------------------
  ✅ LOGOUT CONTROLLER
----------------------------------------------------
*/
exports.Logout = async (req, res) => {
  try {
      console.log("📥 Incoming request in Logout");

    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "You have been logged out successfully.",
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging out.",
      error: error.message,
    });
  }
};


