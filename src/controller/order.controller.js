const {contactModel} = require("../models/contact.models");
const {paymentModel} = require("../models/payment.models");
const {orderModel} = require("../models/order.models");
const getNextSequenceValue = require("../helper/counter.helper");
const axios = require("axios");
const url = process.env.PAYMENT_URL;
const {isEmailValid,isValidphonenumber} =require("../helper/validation.helper")
const {decode,encode} =require("../helper/encodedecode.helper");
const querystring = require('querystring');
require("dotenv").config();

module.exports.order = async(req,res)=>{
    try{
        const {email,contact,firstname,lastname,address1,address2,country,state,city,zipcode,cardnumber,card_expire,cvv,description,amount} = req.body;
        if(email &&contact && city && address1 && country && state && city && zipcode && firstname && lastname && card_expire && cardnumber && amount){
            if(isEmailValid(email)){
                if(isValidphonenumber(contact)){
                    if (cardnumber.length > 12 && cardnumber.length < 20) {
                        if (card_expire.length == 4) {
                         const contactseq = "C" + await getNextSequenceValue("contact");
                        const billing ={
                            address1: address1,
                            address2:address2,
                            country: country,
                            state: state,
                            city:city,
                            zipcode: zipcode,
                        }
                          //Contact Detail Save

                        const newInfo = new contactModel({
                            contactId : contactseq,
                            firstname: firstname,
                            lastname:lastname,
                            contact: contact,
                            email:email,
                            billing:billing
                        })
                        await newInfo.save();
                          //Payment Detail Save
                        const paymentseq = "PA" + await getNextSequenceValue("payment");
                        const paymentInfo = new paymentModel({
                            paymentId : paymentseq,
                            cardId: encode(cardnumber),
                            expiry :card_expire,
                            cvv: cvv,
                            description : description,
                            amount : amount,
                        })
                        await paymentInfo.save();
                        const orderseq  = "O_" + await getNextSequenceValue("payment");
                        const transactionId = Date.now() + Math.floor(Math.random() * 100000);
                        const paymentDetails = {
                            // username: 'your_nmi_username',
                            // password: 'your_nmi_password',
                            amount: amount,
                            ccnumber: cardnumber,
                            ccexp: card_expire,
                            cvv: cvv,
                            type: 'sale',
                            security_key: process.env.SECURITY_KEY,
                            last_name : lastname,
                            address1  : address1,
                            address2   : address2,
                            city : city,
                            state : state,
                            zip : zipcode,
                            country  :country,
                            email  :email,
                            phone: contact,
                            orderid:orderseq,
                          };
                          //Order Detail Save
                          const orderInfo = new orderModel({
                            orderId : orderseq,
                            transactionId : transactionId,
                            paymentId :paymentseq,
                            contactId : contactseq,
                            amount : amount,
                          })
                          await orderInfo.save();
                        const result = await axios.post(url,paymentDetails,{
                            headers: {
                              'content-type': 'application/x-www-form-urlencoded',
                            },
                        })
                        if(result.data){
                                // console.log(result.data);

                                const parsedResponse = querystring.parse(result.data);
                                console.log(parsedResponse);

                                if(parsedResponse?.response == '1' && parsedResponse?.responsetext == 'SUCCESS'){
                                    const response_orderId = parsedResponse?.orderid;
                                    const updateStatus = await  orderModel.findOneAndUpdate({orderId:response_orderId},{
                                        status : "Completed",
                                        response : parsedResponse
                                    });
                                    if(updateStatus){
                                        return res.status(200).json({
                                            success : true,
                                            messsage : "successfully purchased"
                                        });
                                    }else{
                                        return res.status(500).json({
                                            success : false,
                                            messsage : "Internal server error"
                                        });
                                    }
                                }else{
                                    return res.status(500).json({
                                        success : false,
                                        messsage : "Internal server error"
                                    });
                                }
                                // response=3&responsetext=Invalid
                                    // Username&authcode=&transactionid=0&avsresponse=&cvvresponse=&orderid=&type=&response_code=300
                              
                        }else{
                            return res.status(500).json({
                                success : false,
                                messsage : "Internal server error"
                            });
                        }
                    }else{
                        return res.status(201).send({
                            status: false,
                            message: "Expire length exact 4",
                          });
                    }
                }else{
                    return res.status(201).send({
                        status: false,
                        message: "CardNumber is between 12 to 19",
                      });
                }

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



module.exports.orderHistory = async (req,res) => {
    try{
        orderModel.find({})
        .populate([
            {
          path: "contactId",
          foreignField: "contactId",
        },
        {
            path: "paymentId",
            foreignField: "paymentId",
          }
        ])
        .sort({ _id: -1 })
        .then((response) => {
            return res.status(200).json({
                success : true,
                message : "success",
                data : response
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success : false,
                messsage : "Internal server error"
            });
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            messsage : "Internal server error"
        });
    }
}