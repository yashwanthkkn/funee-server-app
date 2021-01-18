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

module.exports.getUser = (data,callback)=>{
    var userid = data.userid;
    User.findOne({uuid:userid},(err,user)=>{
        if(err || !user){
            callback('no user');
        }else{
            callback(null,user);
        }
    })
}

module.exports.getUserByEmail = (data,callback)=>{
    var email = data.email;
    User.findOne({email:email},(err,user)=>{
        if(err || !user){
            callback('no user');
        }else{
            callback(null,user);
        }
    })
}