const mongoose = require("mongoose");

const victimSchema = mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
            unique : true
        },
        password: {
            type: String,
            required: true,
        }
        
    },
    { timestamps: true }
)


const Victim = mongoose.model("Victim", victimSchema)

module.exports = Victim;
