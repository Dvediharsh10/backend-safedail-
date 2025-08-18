const mongoose = require("mongoose");
const { mailSender } = require("../utils/OtpSender");
const emailTemplate=require('../mailTemplates/otpTemplate');
const { ref } = require("firebase-functions/v1/database");
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
  },
  number:{
    type:String,
    required:true,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60 ,
  },
});

// function to send mail
async function sendVerificationEmail(email, otp) {
  try {
    console.log("in otp model "+email,otp)
    const mailResponse = await mailSender(
      email,
      "Verification Email From Safe Dial",
      emailTemplate(otp)
    );
    console.log("email sent succesfully " + mailResponse);
  } catch (error) {
    console.log("error occured while sending mail " + error);
    throw error;
  }
}
otpSchema.post("save", async (doc,next) => {
	console.log("New document saved to database");
  console.log('OTP Sent To mobile',doc.number)
		// await sendVerificationEmail(doc.email, doc.otp);

  next();
});

module.exports = mongoose.model("Otp", otpSchema);
