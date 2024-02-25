const express = require("express");
const {organizationVolunteer , allowVolunteer , removeVolunteer , editVolunteer, allOrganization , } = require("../controller/organization");
const router = express.Router();


router.route("/organizationvolunteer").post(organizationVolunteer);
router.route("/allowvolunteer").post(allowVolunteer);
router.route("/removevolunteer").post(removeVolunteer);
router.route("/editvolunteer").post(editVolunteer);
router.route("/allorganization").post(allOrganization);


module.exports = router;