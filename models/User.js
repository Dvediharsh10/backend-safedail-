const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        // required:true,
        trim:true
    },
    phoneNumber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Number",
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        // required:true,
        default:'Customer',
        enum:["Admin","Customer"]
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdditionalDetails",
    },
    lastContactSync: {
    type: Date,
    default: null,
  },

})
module.exports=mongoose.model('User',userSchema);