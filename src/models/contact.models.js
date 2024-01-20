const mongoose = require("mongoose");

module.exports.contactModel = mongoose.model("contact",new mongoose.Schema(
  {
    contactId: {
      type: String,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    billing :{
      address1: {
        type: String,
        trim:true,
      },
      address2: {
        type: String,
        trim:true,
      },
      country: {
        type: String,
        trim:true,
      },
      state: {
        type: String,
        trim:true,
      },
      city: {
        type: String,
        trim:true,
      },
      zipcode: {
        type: String,
        trim:true,
      },
    }
  
  },
  { timestamps: true }
));

