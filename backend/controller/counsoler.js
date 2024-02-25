const counsoler = require("../models/counsolers");
const Message = require("../models/messages");
const organisation = require("../models/organization");
const victim = require("../models/victim");

const express = require("express");
const app = express();
const myVictim = async (req, res) => {
  try {
    let data = req.body;
    const myData = await Message.find({ recipient: data.id }, "sender").exec();

    const results = await victim
      .find({ _id: { $in: myData.map((doc) => doc.sender) } })
      .exec();

    console.log(results);
    res.status(200).json(results); // Assuming you're returning the results as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error"); // Handle error appropriately
  }
};

module.exports = {
  myVictim,
};
