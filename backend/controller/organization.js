const counsoler = require("../models/counsolers");
const organisation = require("../models/organization");

const organizationVolunteer = async (req, res) => {
  let data = req.body;
  console.log(data.id);
  const myData = await counsoler
    .find({ organizationID: data.id }, "counsoler email description status")
    .exec();
  res.json({ response: myData });
};

const allowVolunteer = async (req, res) => {
  try {
    let data = req.body;
    const myData = await counsoler
      .findOneAndUpdate(
        { organizationID: data.organizationID, _id: data.id },
        { status: "ACTIVE" }
      )
      .exec();
    res.json({ response: myData });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const removeVolunteer = async (req, res) => {
  try {
    let data = req.body;
    const myData = await counsoler.findOneAndDelete({
      _id: data.id,
      organizationID: data.organizationID,
    });
    if (!myData) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res.status(200).json({ message: "Volunteer Removed Successfully" });
  } catch (error) {
    console.error("Error in removeVolunteer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const editVolunteer = async (req, res) => {
  try {
    let data = req.body;
    const myData = await counsoler.findOneAndUpdate(
      { organizationID: data.organizationID, _id: data.id },
      { description: data.description }
    );
    if (!myData) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res.status(200).json({ message: "Description edit Successfull" });
  } catch (error) {
    console.error("Error in removeVolunteer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const allOrganization = async (req, res) => {
  try {
    let data = req.body;
    const myData = await organisation.find({}, "name id logo").exec();
    if (myData.length === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res.status(200).json({ response: myData });
  } catch (error) {
    console.error("Error in allOrganization:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  organizationVolunteer,
  allowVolunteer,
  removeVolunteer,
  editVolunteer,
  allOrganization,
};
