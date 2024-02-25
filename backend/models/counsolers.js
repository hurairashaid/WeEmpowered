const mongoose = require("mongoose");

const counsolersSchema = mongoose.Schema(
    {
        counsoler : {
            type : String , 
            required : true
        },
        description:{
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        organizationID : {
            type :  mongoose.Schema.Types.ObjectId,
            required : true
        },
        status : {
            type : String,
            enum: ["ACTIVE", "DEACTIVE"],
            default: "DEACTIVE"
        }
      
    },
    { timestamp: true }
)


const counsoler = mongoose.model("counsoler", counsolersSchema)

module.exports = counsoler;
