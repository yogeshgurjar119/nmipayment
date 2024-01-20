const mongoose = require("mongoose");

module.exports.orderModel = mongoose.model("orderdetail",new mongoose.Schema(
  {
     orderId: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    contactId: {
      type: String,
      ref : "contact",
      trim: true,
    },
    paymentId: {
      type: String,
      ref : "payment",
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
    },
    response: {
      type: Object,
    },
    status: {
      type: String,
      default : "Pending",
      trim:true,
    },
  },
  { timestamps: true }
));

