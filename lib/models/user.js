var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 


// DEFINING THE SCHEMA
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    joined:String,
    claim:String,
    emailVerified:false,
    uuid:String
});

UserSchema.plugin(passportLocalMongoose);
// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("User",UserSchema);