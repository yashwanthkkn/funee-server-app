const mongoose = require('mongoose')

try{
    mongoose.connect('mongodb+srv://funee-user:XIObAt32p6QSiidP@cluster0.f0akj.mongodb.net/funeeDev?retryWrites=true&w=majority',{useUnifiedTopology: true,useNewUrlParser:true});
}catch(err){
    console.log(err);
}

// 
// mongodb://localhost:27017/funee

module.exports = mongoose.connection
