const jwt = require("jsonwebtoken");

const generateToken = (res, id, name, email) => {
  const token = jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
