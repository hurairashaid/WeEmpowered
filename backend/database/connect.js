const mongoose = require("mongoose");

url="mongodb://localhost:27017/WomenEmpower"
const connectDB = () => {
    console.log("we are in database")
    return mongoose.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });
}

module.exports = connectDB

