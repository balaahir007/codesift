const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const { username, email, password, mobileNumber } = req.body;
  console.log(username, email, password, mobileNumber);

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorMsg: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    generateToken(res, newUser._id);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ errorMsg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errorMsg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errorMsg: "Invalid credentials" });
    }
    generateToken(res, user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errorMsg: "Server error" });
  }
};
exports.logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 0,
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error during logout" });
  }
};
