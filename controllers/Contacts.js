require("dotenv").config();
const User = require("../models/User");
const Contact = require("../models/Contact");
const Number=require("../models/Number")


exports.syncContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const contacts = req.body.contacts;

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({
        message: "Contacts must be a non-empty array",
      });
    }

    const bulkOps = [];

    for (const contact of contacts) {
      const phoneStr = contact.phone;

      // Step 1: Find or create Number document
      let numberDoc = await Number.findOne({ number: phoneStr });
      if (!numberDoc) {
        numberDoc = await Number.create({ number: phoneStr });
      }

      // Step 2: Check if this number is used by a User
      const existingUser = await User.findOne({ phoneNumber: numberDoc._id });

      // Step 3: Prepare upsert operation
      bulkOps.push({
        updateOne: {
          filter: { user: userId, phone: numberDoc._id },
          update: {
            $set: {
              name: contact.name,
              isAppUser: !!existingUser,
            },
          },
          upsert: true,
        },
      });
    }

    if (bulkOps.length > 0) {
      await Contact.bulkWrite(bulkOps);
    }

    // Update last sync timestamp
    await User.findByIdAndUpdate(userId, {
      lastContactSync: new Date(),
    });

    return res.status(200).json({
      message: "Contacts synced successfully",
      total: bulkOps.length,
    });
  } catch (error) {
    console.error("Error syncing contacts:", error);
    return res.status(500).json({
      message: "Something went wrong while syncing contacts",
      error: error.message,
    });
  }
};

exports.getAllContacts=async(req,res)=>{
  try {
    const userId=req.user.id;  // ID of the logged-in user

    const allContactsOfUSer=await Contact.find({user:userId}).select("name phone").populate({path:"phone",
      select:"number"
    });
    return res.status(200).json({
      success:true,
      allContactsOfUSer,
    })
    
  } catch (error) {
    console.error("Error inFetching Contacts:", error);
    res.status(500).json({
      message: "Something went wrong while Fetching contacts",
      error: error.message,
    });
  }
}
exports.markUnmarkFav=async(req,res)=>{
  try {
    const {phone}=req.body;
    if(!phone){
      return res.status(400).json({
        success:false,
        message:"missing field"
      })
    }
    const number=await Number.findOne({number:phone});
    if(!number){
      return res.status(404).json({
        success:false,
        message:"Contact Not Present"
      })
    }
    
    const contact=await Contact.findOne({phone:number._id});
    contact.isFavourite=!contact.isFavourite;
    await contact.save();
    return res.status(200).json({
      success:false,
      message:(contact.isFavourite?"Marked":"UnMarked")+" Favourite"
    })

  } catch (error) {
    console.log("Error in MarkUnmarkFav controller",error.message);
    return res.status(500).json({
      success:false,
      message:"Could Not Mark Unmark Favourite"
    })
  }
}
exports.getFavourites=async(req,res)=>{
try {
  const favourites=await Contact.find({isFavourite:true}).populate("user").populate("phone").exec();
  return res.status(200).json({
    success:true,
    data:favourites
  })
} catch (error) {
  console.log("Error in getting Favourites",error.message);
    return res.status(500).json({
      success:false,
      message:"Could Not get Favourites"
    })
}
}
