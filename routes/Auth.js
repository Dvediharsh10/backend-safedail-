const express=require('express')
const router=express.Router();

// importing routes
const {login,signUp,sendOtp,refreshAccessToken, verifyOtp}=require("../controllers/auth")
const {auth}=require('../middlewares/auth');
const { editFunc, deleteFunc } = require('../controllers/modify');

router.post('/login',login)
router.post('/signUp',signUp)
router.post('/sendOtp',sendOtp)
router.post('/verifyotp',verifyOtp)
router.delete('/deleteUser',auth,deleteFunc)
router.get("/refresh-token", refreshAccessToken);




router.post('/logout', (req, res) => {
  res.clearCookie("loginToken");
  res.status(200).json({ message: "Logged out" });
})


router.post('/home',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        messag:"welcome to home "
    })
})
module.exports=router;