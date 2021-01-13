const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/funee",{useUnifiedTopology: true,useNewUrlParser:true})
// mongodb+srv://funee-user:XIObAt32p6QSiidP@cluster0.f0akj.mongodb.net/funeeDev?retryWrites=true&w=majority

module.exports = mongoose.connection