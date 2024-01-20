const {contactModel} = require("../models/contact.models");
const {paymentModel} = require("../models/payment.models");
const {orderModel} = require("../models/order.models");

const {isEmailValid,isValidphonenumber} =require("../helper/validation.helper")
require("dotenv").config();

module.exports.contactus = async(req,res)=>{
    try{
        const {email,city,contact,whatsapp} = req.body;
        if(email &&contact && city && whatsapp != null){
            if(isEmailValid(email)){
                if(isValidphonenumber(contact)){
                        const newInfo = new contactModel({
                            firstname: name,
                            lastname:contact,
                            email:email,
                            billing:description
                        })
                        newInfo.save().then((result)=>{
                            return res.status(200).json({
                                success : true,
                                messsage : "Successfully Requested"
                            });
                        }).catch((error)=>{
                            return res.status(500).json({
                                success : false,
                                messsage : "Internal server error"
                            });
                        });
                }else{
                    return res.status(201).json({
                        success : false,
                        messsage : "Invalid contact number"
                    });
                }
            }else{
                return res.status(201).json({
                    success : false,
                    messsage : "Invalid email address"
                });
            }
        }else{
            return res.status(400).json({
                success : false,
                messsage : "Bad request"
            });
        }
    }catch(er){
        console.error(er);
        return res.status(500).json({
            success : false,
            messsage : "Internal server error"
        });
    }
}
