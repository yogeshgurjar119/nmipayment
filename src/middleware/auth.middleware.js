require("dotenv").config();
const Authkey = process.env.Authkey;

class JWT {
  async auth(req, res, next) {
    try {
      if (req.headers) {
        const authKey = req.headers.authkey;
        if (Authkey === authKey) {
          next();
        } else {
          return res.status(201).json({
            success : false,
            messsage : "Invalid token"
        });
        }
      } else {
        return res.status(400).json({
          success : false,
          messsage : "Bad request"
      });
      }
    } catch (error) {
      return res.status(500).json({
        success : false,
        messsage : "Internal server error"
    });
    }
  }


}

module.exports = new JWT();
