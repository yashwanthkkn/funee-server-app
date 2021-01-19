const Message = require('../../models/message');
const {v4:uuidv4} = require('uuid');
const User = require('../user/user.function')
module.exports.createMsg = (data,callback)=>{
    var sender = data.sender;
    var receiver  = data.receiver;
    var msg = data.msg;
    var senderName = data.senderName;
    var receiverName = data.receiverName;
    var message = new Message({
        uuid:uuidv4(),
        sender:sender,
        receiver:receiver,
        current:msg,
        currentTime:Date.now()+19800000,
        prevTime:null,
        prev:null,
        set:[sender,receiver],
        createdAt:Date.now()+19800000,
        senderName:senderName,
        receiverName:receiverName
    })
    message.save(err=>{
        if(err){
            callback(err)
        }else{
            callback(null,message)
        }
    })
}

module.exports.checkMsgObject = (data,callback)=>{
    var sender = data.sender;
    var receiver = data.receiver;
    Message.find(
        {
            $and:[{
                set:{$in:[sender]}}
                ,{set:{$in:[receiver]}}
            ]
        },(err,messages)=>{
        if(err || messages.length!=0){
            callback(messages[0])
        }else{
            callback(null,'ok')
        }
    })
}

module.exports.getMsgById = (data,callback)=>{
    var uuid = data.uuid;
    Message.findOne({uuid:uuid},(err,message)=>{
        if(err || !message){
            callback('no message')
        }else{
            callback(null,message)
        }
    })
}

module.exports.update = (data,callback)=>{
    var uuid = data.uuid;
    var msg = data.msg;
    Message.findOne({uuid:uuid},(err,message)=>{
        if(err || !message){
            callback('no message')
        }else{
            var temp = message.current;
            var tempTime = message.currentTime;
            message.current = msg;
            message.currentTime = Date.now()+19800000;
            message.prev = temp;
            message.prevTime = tempTime;
            temp = message.sender;
            message.sender = message.receiver;
            message.receiver = temp;
            temp = message.senderName;
            message.senderName = message.receiverName;
            message.receiverName = temp;
            User.toggleNotification({sender:message.sender,receiver:message.receiver},(err,result)=>{
                if(result){
                    message.save(err=>{
                        callback(null,message)
                    })
                }
            })
        }
    })
    
}

module.exports.getMsgList = (data,callback)=>{
    var userid = data.userid;
    Message.find({set:{$in:[userid]}}).sort('-currentTime').find((err,messages)=>{
        if(err){
            callback(err)
        }else{
            callback(err,messages)
        }
    })
}

