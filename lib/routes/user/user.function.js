const User = require('../../models/user');

module.exports.addName = (data,callback)=>{
    var name = data.name;
    var uuid = data.uuid;
    User.findOne({name:name},(err,user)=>{
        if(err){
            callback(err);
        }else if(user){
            callback("exists")
        }else{
            User.findOne({uuid:uuid},(err,newuser)=>{
                if(err){
                    callback(err)
                }else{
                    newuser.name = name;
                    newuser.save(()=>{
                        callback(null,newuser)
                    })
                }
            })
        }

    })
}