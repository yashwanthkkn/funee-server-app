const router = require('express').Router();
const topic = require('./topic.function');

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
        topic.addTopic(data,(err,topic)=>{
            res.redirect('/public/thoughtbox');   
        })
    }else{
        res.redirect('/public/thoughtbox');
    }
})

module.exports = router;