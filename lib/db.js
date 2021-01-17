require('dotenv').config()
const mongoose = require('mongoose');
let conn = null;
if(!conn){
    try{
        mongoose.connect(process.env.Mongo_URI,{
            useUnifiedTopology: true,
            useNewUrlParser:true
        });
        conn = mongoose.connection;
    }catch(err){
        console.log(err);
    }
}


module.exports = conn

