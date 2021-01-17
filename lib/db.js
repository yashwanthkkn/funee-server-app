const mongoose = require('mongoose');
let conn = null;
if(!conn){
    try{
        mongoose.connect('mongodb+srv://funee-user:XIObAt32p6QSiidP@cluster0.f0akj.mongodb.net/funeeProd?retryWrites=true&w=majority',{useUnifiedTopology: true,useNewUrlParser:true});
        conn = mongoose.connection;
    }catch(err){
        console.log(err);
    }
}


<<<<<<< HEAD
module.exports = conn

=======
module.exports = mongoose.connection
>>>>>>> parent of 2af3f01... bug fix :msg list contents were static
