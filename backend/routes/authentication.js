const express = require("express");
const router = express.Router();

const {
  organisationAuthentication,
  counsolerAuthentication,
  victimAuthentication,
  CounsolerRejistration,
  VictimRejistration
} = require("../controller/authentication");

router.route("/organizationSignin").post(organisationAuthentication);
router.route("/counsolerSignin").post(counsolerAuthentication);
router.route("/victimSignin").post(victimAuthentication);
router.route("/counsolerRejistration").post(CounsolerRejistration);
router.route("/victimRejistration").post(VictimRejistration);

module.exports = router;
