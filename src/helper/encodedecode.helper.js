var CryptoJS = require("crypto-js");
const KEY = process.env.ENCODE_KEY;


function decode(message) {
    // Encrypt
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(message, KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(originalText); // 'my message'
    return originalText;
  }
  
  function encode(message) {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      message,
      KEY
    ).toString();
    console.log(ciphertext);
    return ciphertext;
  }
  
  module.exports ={
    encode,decode
  }