const express = require('express')
const router = express.Router()
const link = require('../link/link')
const moment = require('../../utils/moment')

router.get('/home',(req,res)=>{
    var owner = req.user.uuid;
    var data = {}
    data.owner = owner;
    if(owner){
        link.getLinks(data,(err,links)=>{
            if(err){
                console.log(err)
            }else{
                res.render('home',{links:links,user:req.user})
            }
        })
    }else{
        res.redirect('/oops')
    }
    
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
                console.log(err);
            }else{
                res.render('response',{link:link,user:req.user,moment:moment});
            }
        })
    }else{
        res.redirect('/oops')
    }
})


router.get('/confession',(req,res)=>{
    res.render('confession');
})

router.get('/room',(req,res)=>{
    res.render('room');
})

module.exports = router