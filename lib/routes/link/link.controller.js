const router = require('express').Router();
const link = require('./link');
router.post('/getLink',(req,res)=>{
    var owner = req.user.uuid;
    var caption = req.body.caption;
    var data = {
        owner:owner,
        caption:caption
    }
    link.createNewLink(data,(err,link)=>{
        if(err){
            res.redirect('/oops')
        }else{
            res.redirect('/user/home')
        }
    })
})

router.get('/remove/:uuid',(req,res)=>{
    var owner = req.user.uuid;
    var uuid = req.params.uuid;
    var data = {}
    data.owner = owner;
    data.uuid = uuid;
    if(owner && uuid){
        link.removeLink(data,(err)=>{
            res.redirect('/user/home')
        })
    }else{
        res.redirect('/user/home')
    }
})




module.exports = router