const router = require('express').Router();
const User = require('../user/user.function');
const Message = require('./message.function')
const moment = require('../../utils/moment');

router.get('/list',(req,res)=>{
    var userid = req.user.uuid;
    if(userid){
        Message.getMsgList({userid:userid},(err,messages)=>{
            if(err){
                res.redirect('/user/home')
            }else{
                res.render('messageList',{user:req.user,messages:messages,moment:moment});
            }
        })
        
    }else{
        res.redirect('/user/home')
    }
})

router.get('/:userid',(req,res)=>{
    var userid = req.params.userid;
    var redirect = req.query.redirect;
    var sender = req.params.userid;
    var receiver = req.user.uuid;
    if(userid && userid!= req.user.uuid){
            Message.checkMsgObject({sender:sender,receiver:receiver},(err,result)=>{
                if(err){
                    res.redirect(`/user/msg/room/${err.uuid}`)
                }else{
                    User.getUser({userid:userid},(err,user)=>{
                        if(user){
                            res.render('message',{user:req.user,receiver:user,message:null});
                        }else{
                            res.redirect(`/topic/room/${redirect}`)                
                        }
                    })
                }
        })
        
    }else{    
        res.redirect(`/topic/room/${redirect}`)        
    }
    
})

router.post('/add/s/:sender/r/:receiver',(req,res)=>{
    var sender = req.params.sender;
    var receiver = req.params.receiver;
    var msg = req.body.msg;
    var senderName = req.user.name;
    if(sender && receiver && msg && sender == req.user.uuid){
            
            User.getUser({userid:receiver},(err,user)=>{
                if(user){
            
                    var receiverName = user.name;
                    Message.createMsg({sender:sender,receiver:receiver,msg:msg,senderName:senderName,receiverName:receiverName},(err,message)=>{
                        if(message){
            
                            res.redirect(`/user/msg/room/${message.uuid}`)
                        }else{
            
                            res.redirect('/user/home')            
                        }
                    })
                }else{
            
                    res.redirect('/user/home')
                }
            })
    }else{
        
        res.redirect('/user/home')
    }
})

router.get('/room/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    if(uuid){
        Message.getMsgById({uuid:uuid},(err,message)=>{
            if(err){
                res.redirect('/user/msg/list')
            }else{
                var userid = message.receiver;
                if(userid == req.user.uuid){
                    userid = message.sender;
                }
                User.getUser({userid:userid},(err,user)=>{
                    if(err){
                        res.redirect('/user/msg/list')
                    }else{
                        res.render('message',{user:req.user,receiver:user,message:message,moment:moment});
                    }
                })
            }
        })
    }else{
        res.redirect('/user/msg/list')
    }
})


router.post('/update/:uuid/s/:sender',(req,res)=>{
    var uuid = req.params.uuid;
    var msg = req.body.msg;
    var userid = req.params.sender;
    if(uuid && msg && userid == req.user.uuid){
            Message.update({uuid:uuid,msg:msg},(err,message)=>{
                if(message){
                    res.redirect(`/user/msg/room/${uuid}`)
                }else{
                    res.redirect(`/user/msg/room/${uuid}`)
                }
            })
    }else{
        res.redirect('/user/msg/list')
    }
})

module.exports = router