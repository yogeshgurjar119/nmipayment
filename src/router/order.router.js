const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");

const {order,orderHistory} = require("../controller/order.controller");

router.post("/order",order);
router.post("/orderHistory",orderHistory);

module.exports = router;



