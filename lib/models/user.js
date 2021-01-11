var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 


// DEFINING THE SCHEMA
const UserSchema = new mongoose.Schema({
    email:String,
    username:String,
    joined:String,
    claim:String,
    emailVerified:false
});

UserSchema.plugin(passportLocalMongoose);
// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("User",UserSchema);