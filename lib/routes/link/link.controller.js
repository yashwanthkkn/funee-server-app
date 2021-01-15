const router = require('express').Router();
const link = require('./link');
router.post('/getLink',(req,res)=>{
    var owner = req.user.uuid;
    var caption = req.body.caption;
    var privacy = 'private';
    var name = req.user.name;
    if(req.body.privacy){
        privacy = 'public'
    }
    var data = {
        owner:owner,
        caption:caption,
        privacy:privacy,
        name:name
    }
    if(owner && caption){
        link.createNewLink(data,(err,link)=>{
            if(err){
                res.redirect('/oops')
            }else{
                res.redirect('/user/mylinks')
            }
        })
    }else{
        res.redirect('/user/mylinks')
    }
    
})

router.get('/remove/:uuid',(req,res)=>{
    var owner = req.user.uuid;
    var uuid = req.params.uuid;
    var data = {}
    data.owner = owner;
    data.uuid = uuid;
  
    if(owner && uuid){
        link.removeLink(data,(err)=>{
            res.redirect('/user/mylinks')
        })
    }else{
        res.redirect('/user/mylinks')
    }
})


router.get('/privacy/toggle/:uuid',(req,res)=>{
    var owner = req.user.uuid;
    var uuid  = req.params.uuid;
    var data = {};
    data.owner = owner;
    data.uuid = uuid;
    if(owner && uuid){
        link.togglePrivacy(data,(err,link)=>{
            if(link){
                res.redirect('/user/mylinks')        
            }else{
                res.redirect('/user/mylinks')        
            }
        })
    }else{
        res.redirect('/user/mylinks')
    }
})

module.exports = router