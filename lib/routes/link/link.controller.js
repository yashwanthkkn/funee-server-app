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
        res.send(link)
    })
})




module.exports = router