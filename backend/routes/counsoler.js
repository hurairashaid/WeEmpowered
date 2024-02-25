const express = require("express");
const { myVictim } = require("../controller/counsoler");
const router = express.Router();

router.route("/myvictim").post(myVictim);


module.exports = router; 