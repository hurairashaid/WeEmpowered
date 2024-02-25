const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            type: String,
        },
        text : {
            type: String
        }
        
    },
    { timestamps: true }
)


const Message = mongoose.model("Message", messageSchema)

module.exports = Message;
