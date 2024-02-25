const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required:true,
        },
        description: {
            type: String,
            required:true,
        },
        status : {
            type:String,
            enum: ["ACTIVE", "DEACTIVE"],
            default: "DEACTIVE"

        }
      
    },
    { timestamp: true }
)


const organization = mongoose.model("organization", organizationSchema)

module.exports = organization;
