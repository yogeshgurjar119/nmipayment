const router = require("express").Router();
const { authenticateJWT, auth } = require("../middleware/auth.middleware");

const {contactus} = require("../controller/auth.controller");

router.post("/contactus", contactus);
module.exports = router;
