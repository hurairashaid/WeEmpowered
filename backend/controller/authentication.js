const counsoler = require("../models/counsolers");
const organisation = require("../models/organization");
const victim = require("../models/victim");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const organisationAuthentication = async (req, res) => {
  let data = req.body;
  const myData = await organisation
    .find(
      { email: data.email, password: data.password },
      "name description _id status"
    )
    .exec();
  res.json({ response: myData });
};

const counsolerAuthentication = async (req, res) => {
  const data = req.body;
  const myData = await counsoler
    .find(
      { email: data.email, password: data.password },
      "counsoler description organizationID"
    )
    .exec();
  res.json({ response: myData });
};

const CounsolerRejistration = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // Assuming you have a Mongoose model named Counsoler
    const newCounsoler = new counsoler(data);
    await newCounsoler.save(); // Save the new record to the database
    res.status(201).json({
      message: "Counsoler registration successful",
      counsoler: newCounsoler,
    });
  } catch (error) {
    console.error("Error in CounsolerRejistration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const VictimRejistration = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // Assuming you have a Mongoose model named Counsoler
    const newVictim = new victim(data);
    await newVictim.save(); // Save the new record to the database
    res.status(201).json({
      message: "Victim registration successful",
      victim: newVictim,
    });
  } catch (error) {
    console.error("Error in CounsolerRejistration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const victimAuthentication = async (req, res) => {
  try {
    const data = req.body;
    const myData = await victim
      .find({ name: data.name, password: data.password }, "_id name")
      .exec();
    const userID = myData[0]._id;

    // Set the user ID in a cookie
    console.log(userID.toString())
    res.cookie("userID", userID.toString());

    res.json({ response: myData });
  } catch (error) {
    // Handle errors
    console.error("Error occurred in victimAuthentication:", error);
    res.status(500).json({ error: "An error occurred while authenticating" });
  }
};

module.exports = {
  organisationAuthentication,
  counsolerAuthentication,
  victimAuthentication,
  CounsolerRejistration,
  VictimRejistration,
};
