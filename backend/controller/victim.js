const counsoler = require("../models/counsolers");
const Message = require("../models/messages");
const organisation = require("../models/organization");
const organizationCounsoler = async (req, res) => {
  let data = req.body;
  console.log(data.id);
  const myData = await counsoler
    .find(
      { organizationID: data.id, status: "ACTIVE" },
      "counsoler email description _id"
    )
    .exec();
  res.json({ response: myData });
};

const messageRecord = async (req, res) => {
  let data = req.body;
  const myData = await Message.find({
    sender: { $in: [data.firstId, data.secondId] },
    recipient: { $in: [data.firstId, data.secondId] },
  }).sort({createdAt:1});
  res.json(myData)
};

module.exports = {
  organizationCounsoler,
  messageRecord
};
