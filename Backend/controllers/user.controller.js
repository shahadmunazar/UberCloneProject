const UserModel = require("../models/user.model");
const UserServices = require("../services/user.services");
const { validationResult } = require("express-validator");

const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const { fullname, email, password } = req.body;
console.log("Incoming payload:", req.body);

    const dummy = new UserModel();
    const hashedPassword = await dummy.hashPassword(password);
    const user = await UserServices.createUser({ fullname, email, password });


    // Generate auth token
    const token = user.generateAuthToken();

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.fullname
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

module.exports = { registerUser };
