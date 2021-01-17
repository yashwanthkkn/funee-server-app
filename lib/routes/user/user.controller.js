const express = require('express')
const router = express.Router()
const link = require('../link/link')
const moment = require('../../utils/moment')
const sort = require('../../utils/sort')
const User = require('./user.function')
const Topic = require('../topic/topic.function')

router.get('/mylinks',(req,res)=>{
   
    var owner = req.user.uuid;
    var data = {}
    data.owner = owner;
    if(owner){
        link.getLinks(data,(err,links)=>{
            if(err){
                console.log(err)
            }else{
                res.render('mylinks',{links:links,user:req.user})
            }
        })
    }else{
        res.redirect('/user/home')
    }
    
})


router.get('/home',(req,res)=>{
    Topic.getTopics((err,topics)=>{
        if(err){
            res.render('box',{user:req.user,topics:null})
        }else{
            res.render('box',{user:req.user,topics:topics})
        }
        
    })
})


router.get('/responses/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    var owner = req.user.uuid;
    if(uuid && owner){
        var data = {}
        data.uuid = uuid;
        data.owner = owner;
        link.getLink(data,(err,link)=>{
            if(err){
                res.redirect('/user/mylinks')
            }else{
                var arr = sort.sortByTime(link.responses);
                link.responses = arr;
                res.render('response',{link:link,user:req.user,moment:moment});
            }
        })
    }else{
        res.redirect('/user/mylinks')
    }
})

router.get('/profile',(req,res)=>{
    res.render('profile',{user:req.user,msg:null})
})

router.get('/profile/us',(req,res)=>{
    res.render('profile',{user:req.user,msg:"Name Updated Successfully"})
})

router.get('/profile/ue',(req,res)=>{
    res.render('profile',{user:req.user,msg:"The Given Name Already Exists"})
})

router.get('/profile/ps',(req,res)=>{
    res.render('profile',{user:req.user,msg:"Password Changed Successfully"})
})

router.get('/profile/pe',(req,res)=>{
    res.render('profile',{user:req.user,msg:"Could not Change Password..Check Password Provided"})
})



router.post('/addName',(req,res)=>{
    var uuid = req.user.uuid;
    var name = req.body.name;
    if(name && uuid){
        if(name.length <= 15){
            var data = {};
            data.name = name.toLowerCase();
            data.uuid = uuid;
            User.addName(data,(err,user)=>{
                if(err && err=='exists'){
                    res.redirect('/user/profile/ue')
                }else if(user){
                    res.redirect('/user/profile/us')
                }else{
                    res.redirect('/user/profile')
                }
            })
        }else{
            res.redirect('/user/profile')
        }
    }else{
        res.redirect('/user/profile')
    }
})


router.get('/admin/topics',(req,res)=>{
    Topic.getTopics((err,topics)=>{
        if(err){
            res.render('adminTopic',{user:req.user,topics:null})
        }else{
            res.render('adminTopic',{user:req.user,topics:topics})
        }
        
    })
})

router.get('/admin/removeTopic/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    var data= {};
    data.uuid = uuid;
    if(uuid){
        Topic.removeTopicAdmin(data,(err)=>{
            if(err){
                res.send(err)
            }else{
                res.redirect('/user/admin/topics')
            }     
        })
    }else{
        res.send("infs")
    }
})


router.get('/admin/msg',(req,res)=>{
    res.render('adminMsg')
})
module.exports = router