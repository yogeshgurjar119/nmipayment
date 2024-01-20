const mongoose = require("mongoose");

module.exports.paymentModel = mongoose.model("payment",new mongoose.Schema(
  {
    paymentId: {
      type: String,
      trim: true,
    },
    cardId: {
      type: String,
      trim: true,
    },
    expiry: {
      type: String,
      trim: true,
    },
    cvv: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim:true,
    },
  },
  { timestamps: true }
));

