var mongoose = require("mongoose");


// DEFINING THE SCHEMA
const TopicSchema = new mongoose.Schema({
    uuid:String,
    createdAt:Number,
    owner:String,
    title:String,
    side1:String,
    side2:String,
    total:0,
    side1Count:0,
    side2Count:0,
    deletion:String
});


// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Topic",TopicSchema);