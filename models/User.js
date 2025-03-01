const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  age: { type: Number, min: 18 },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
  },
  profilePic: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    zip: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
