const router = require('express').Router();
const Topic = require('./topic.function');
const moment = require('../../utils/moment')

router.post('/addTopic',(req,res)=>{
    var owner = req.user.uuid;
    var title = req.body.title;
    var side1 = req.body.side1;
    var side2 = req.body.side2;
    if(owner && title && side1 && side2){
        var data ={};
        data.title = title;
        data.side1 = side1;
        data.side2 = side2;
        data.owner = owner;
        Topic.getTopicByTitle({title:title},(err,topic)=>{
            if(!topic){
                Topic.addTopic(data,(err,topic)=>{
                    res.redirect('/topic/public/thoughtbox');   
                })
            }else{
                res.redirect(`/room/${topic.uuid}`);        
            }
        })
    }else{
        res.redirect('/public/thoughtbox');
    }
})


router.get('/room/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    Topic.getTopicById({uuid:uuid},(err,topic)=>{
        if(topic){
            Topic.getCommentsByRoomid({uuid:uuid},(err,comments)=>{
                if(err){
                    res.redirect('/public/thoughtbox');
                }else{
                    res.render('room',{topic:topic,user:req.user,comments:comments,moment:moment});
                }
            })
        }else{
            res.redirect('/public/thoughtbox');
        }
    })
})

router.post('/room/:roomid/user/:userid/addComment/:side',(req,res)=>{
    var topicId = req.params.roomid;
    var owner = req.params.userid;
    var choice = req.params.side;
    var msg = req.body.comment;
    if(topicId && owner && choice && msg){
        var data = {};
        data.uuid = topicId;
        data.owner = owner;
        data.msg = msg;
        Topic.getTopicById(data,(err,topic)=>{
            if(err || !topic){
                res.redirect(`/public/thoughtbox`)
            }else{
                var side = ''
                if(choice == 's1' || choice == 's2'){
                    if(choice == 's1'){
                        side = topic.side1;
                        topic.side1Count++
                    }else if(choice == 's2'){
                        side = topic.side2;
                        topic.side2Count++
                    }
                    // addding comment to db
                    data.side = side;
                    topic.total++
                    Topic.addComment(data,(err,comment)=>{
                        if(err){
                            res.redirect(`/topic/room/${topicId}`)
                        }else{
                            topic.save(err=>{
                                res.redirect(`/topic/room/${topicId}`)  
                            })
                        }
                    })

                }else{
                    res.redirect(`/public/thoughtbox`)            
                }
            }
        })
    }else{
        res.redirect(`/public/thoughtbox`)
    }
})
module.exports = router;