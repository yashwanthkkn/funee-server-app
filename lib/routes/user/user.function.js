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

module.exports.toggleNotification = async (data,callback)=>{
    var sender = data.sender;
    var receiver = data.receiver;
    var user1 = await User.findOne({uuid:sender});
    if(user1){
        if(user1.MsgNotification == null || user1.MsgNotification == undefined || user1.MsgNotification == NaN){
            user1.MsgNotification = 0;
        }
        user1.MsgNotification++;
        await user1.save();
        var user2 = await User.findOne({uuid:receiver});
        if(user2){
            if(user2.MsgNotification == null || user2.MsgNotification == undefined || user2.MsgNotification == NaN){
                user2.MsgNotification = 0;
            }
            if(!(user2.MsgNotification <= 0)){
                user2.MsgNotification--;
            }
            await user2.save();
            callback(null,"ok")
        }else{
            callback('no user')
        }
    }else{
    }
}
