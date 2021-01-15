const router = require('express').Router()
const link = require('../link/link')
const Topic = require('../topic/topic.function')
const moment = require('../../utils/moment')
const sort = require('../../utils/sort')

// get link page
router.get('/link/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    var data = {}
    data.uuid = uuid;
    if(uuid){
        link.getLinkById(data,(err,link)=>{
            if(err){
                res.redirect('/oops');
            }else{
                res.render('public',{link:link,msg:null,user:req.user})
            }
        })
    }else{
        res.redirect('/oops')
    }
})

// add private comment to secret link
router.post('/link/addComment/:uuid',(req,res)=>{
    var response = req.body.response;
    var uuid = req.params.uuid;
    var data = {
        response:response,
        uuid:req.params.uuid
    }
    if(response && uuid){
        link.addComment(data,(err,link)=>{
            if(link){
                res.render('public',{link:link,msg:"Your Response was recorded",user:req.user})
            }else{
                res.redirect('/oops');
            }
        })
    }else{
        res.redirect('/oops');
    }
    
})

// get responses if they were set to public
router.get('/link/responses/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    if(uuid){
        var data = {}
        data.uuid = uuid;
        link.getPublicLink(data,(err,link)=>{
            if(err || !link){
                res.redirect(`/public/link/${uuid}`)
            }else{
                var arr = sort.sortByTime(link.responses);
                link.responses = arr;
                res.render('response',{link:link,user:req.user,moment:moment});
            }
        })
    }else{
        res.redirect('/oops')
    }
})

router.get('/room/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    Topic.getTopicById({uuid:uuid},(err,topic)=>{
        if(topic){
            Topic.getPublicCommentsByRoomid({uuid:uuid},(err,comments)=>{
                if(err){
                    res.redirect('/user/home');
                }else{
                    res.render('room',{topic:topic,user:null,comments:comments,moment:moment});
                }
            })
        }else{
            res.redirect('/user/home');
        }
    })
})

router.get('/oops',(req,res)=>{
    res.send("Something went wrong...We are on it")
})

module.exports = router