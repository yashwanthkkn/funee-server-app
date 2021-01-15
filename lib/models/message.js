var mongoose = require("mongoose");


// DEFINING THE SCHEMA
const MessageSchema = new mongoose.Schema({
    uuid:String,
    createdAt:Number,
    current:String,
    currentTime:String,
    prevTime:String,
    prev:String,
    sender:String,
    senderName:String,
    receiver:String,
    receiverName:String,
    set:[],
});


// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Message",MessageSchema);