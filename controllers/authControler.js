const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bycrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    console.log(user);

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bycrypt.compare(password, user.password))) {
      generateToken(res, user._id, user.name, user.email);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Login", error.message);
    res.status(500).json({ message: error.message });
  }
};
const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};
module.exports = { registerUser, loginUser, logoutUser };
