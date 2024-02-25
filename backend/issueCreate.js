const connectDB = require("./database/connect")
const IssueJson = require("./Issues.json");
const Issue = require("./models/issues");

const start = async() =>{
  try {
    await connectDB();
    await Issue.create(IssueJson);
    console.log("success");
  } catch (error) {
    console.log(error)
  }
}

start();