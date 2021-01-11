const router = require('express').Router()
const link = require('../link/link')
router.get('/link/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    var data = {}
    data.uuid = uuid;
    if(uuid){
        link.getLinkById(data,(err,link)=>{
            if(err){
                console.log(err);
                res.redirect('/oops');
            }else{
                res.render('public',{link:link,msg:null,user:req.user})
            }
        })
    }else{
        res.redirect('/oops')
    }
})

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

router.get('/oops',(req,res)=>{
    res.send("Something went wrong...We are on it")
})

module.exports = router