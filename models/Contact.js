const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // owner of the contact list
  },
  name: {
    type: String,
    trim: true,
  },
  isFavourite:{
    type:Boolean,
    default:false
  },
  phone: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Number",
    trim: true,
  },
  isAppUser: {
    type: Boolean,
    default: false, // true if this contact is already registered
  },
});

module.exports = mongoose.model("Contact", contactSchema);
