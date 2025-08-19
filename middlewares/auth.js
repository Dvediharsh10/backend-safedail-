const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    // extract the token
    const token =
      req.cookies?.loginToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.body?.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token missing",
      });
    }
    // verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      console.log("Payload here",payload)
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token invalid",
      });
    }
    next();
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "something went wrong while verifying token",
    });
  }
};
// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protected Route for Only Admins",
      });
    }
    next();
  } catch (error) {
    console.log("error in authenticating Admin " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// isCustomer
exports.isCustomer = async (req, res, next) => {
  try {
    if (req.user.role !== "Customer") {
      return res.status(401).json({
        success: false,
        message: "Protected Route for Only Customers",
      });
    }
    next();
  } catch (error) {
    console.log("error in authenticating Customer " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
