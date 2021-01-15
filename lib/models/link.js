var mongoose = require("mongoose");


// DEFINING THE SCHEMA
const LinkSchema = new mongoose.Schema({
    uuid:String,
    createdAt:String,
    owner:String,
    caption:String,
    responses:[],
    privacy:String,
    name:String
});


// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Link",LinkSchema);