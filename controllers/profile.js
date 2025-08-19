const User = require("../models/User");
const AdditionalDetails = require("../models/AdditionalDetails");
const Number =require('../models/Number')
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const bcrypt = require("bcrypt");


exports.getUserProfile=async (req,res)=>{
   try {
     const token =
      req.cookies?.loginToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.body?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findById(decode.id).populate([
      {path:"additionalDetails"},
      {path:"phoneNumber",select:"number"}
    ]).exec();
    user.password=undefined
    return res.status(200).json({
        success:true,
        user
    })

   } catch (error) {
    console.log("Error in getting user details");
    res.status(401).json({
        success:false,
        message:error.message
    })
   }
}
exports.lookupFunc=async(req,res)=>{
  try {
    const {number}=req.query;
    if(!number){
      return res.status(401).json({
        success:false,
        message:"Please enter a number",
      })
    }
    if(number.length!=process.env.Number){
      return res.status(400).json({
        success:false,
        message:"Please Enter a Valid Phone Number"
      })
    }

    const exactNum='+'+number.replace(" ","");
    const num=await Number.findOne({number:exactNum}).populate([
      {path:"name"},
      {
        path:"reportedBy",
        select:"email additionalDetails",
        populate:{
          path:"additionalDetails",select:"name",
        },
        // populate:{
        //   path:"phoneNumber"
        // }
      }
    ]).exec();
    // const user=User.findOne({phoneNumber:num._id})
    console.log("lookup function number",num)
    if(!num){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }
    else {
      return res.status(200).json({
        success:true,
        data:num,
      })
    }
    
  } catch (error) {
     console.log("Error in lookup function",error.message);
    res.status(401).json({
        success:false,
        message:error.message
    })
  }
}