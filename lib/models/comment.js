var mongoose = require("mongoose");


// DEFINING THE SCHEMA
const CommentSchema = new mongoose.Schema({
    uuid:String,
    createdAt:Number,
    owner:String,
    topicId:String,
    side:String,
    upvotes:Number,
    downvotes:Number,
    rank:Number,
    msg:String
});


// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Comment",CommentSchema);