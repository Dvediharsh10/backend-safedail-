const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required:true,
  },
  address: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("AdditionalDetails", detailsSchema);
