const express = require("express");
const {
  organizationCounsoler,
  messageRecord,
} = require("../controller/victim");
const router = express.Router();

router.route("/organizationcounsoler").post(organizationCounsoler);
router.route("/messagerecord").post(messageRecord);

module.exports = router;
