const express = require("express")
const router = express.Router()
const auth = require('./auth')
const passport = require('passport')


router.get("/",(req,res)=>{
    res.redirect('/login')
})

router.get('/login',(req,res)=>{
    var redirect = '';
    if(req.query.redirect){
        redirect = req.query.redirect
    }
    res.render('login',{msg:null,redirect:redirect})
})

router.get('/login/err',(req,res)=>{
    var redirect = '';
    if(req.query.redirect){
        redirect = req.query.redirect
    }
    res.render('login',{msg:"Incorrect Username",redirect:redirect})
})

router.get('/signup',(req,res)=>{
    var redirect = '';
    if(req.query.redirect){
        redirect = req.query.redirect
    }
    res.render('signup',{msg:null,redirect:redirect})
})

router.get('/signup/err',(req,res)=>{
    var redirect = '';
    if(req.query.redirect){
        redirect = req.query.redirect
    }
    res.render('signup',{msg:"Username Already Exists",redirect:redirect})
})

router.post('/login',passport.authenticate('local', { failureRedirect: '/login/err' }),(req,res)=>{
    res.redirect("/user/home")
})

router.post('/signup',(req,res)=>{
    var data = req.body
    var redirect = req.query.redirect;
    auth.Signup(data,(err,user)=>{
        if(err){
            res.redirect('/signup/err')
        }else{
            passport.authenticate('local',{failureRedirect:"/login"})(req,res,()=>{
                if(redirect){
                    res.redirect(`/topic/room/${redirect}`)
                }else{
                    res.redirect("/user/home")
                }
            })
        }
    })
})

router.post('/changePassword',(req,res)=>{
    var uuid = req.user.uuid;
    var cPassword = req.body.cPassword;
    var nPassword = req.body.nPassword;
    if(cPassword && nPassword){
        var data = {};
        data.uuid = uuid;
        data.cPassword = cPassword;
        data.nPassword = nPassword;
        auth.changePassword(data,(err,user)=>{
            if(err || !user){
                res.redirect('/user/profile/pe')
            }else{
                res.redirect('/user/profile/ps')
            }
        })
    }else{
        res.redirect('/user/profile')
    }
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/login")
})

router.get('/verifyEmail',(req,res)=>{
    if(req.user){
        res.render('otp',{msg:null});
    }else{
        res.redirect('/login')
    }
})

router.get('/verifyEmail/ve',(req,res)=>{
    if(req.user){
        res.render('otp',{msg:"Invalid Code"});
    }else{
        res.redirect('/login')
    }
})

router.get('/verifyEmail/ss',(req,res)=>{
    if(req.user){
        res.render('otp',{msg:"Verification Code Sent"});
    }else{
        res.redirect('/login')
    }
})

router.get('/verifyEmail/ve',(req,res)=>{
    if(req.user){
        res.render('otp',{msg:"Could not send Verification code"});
    }else{
        res.redirect('/login')
    }
})

router.post('/verifyEmail',(req,res)=>{
    var code = req.body.code;
    if(req.user){
        var email = req.user.email;
        var uuid = req.user.uuid;
        var data = {};
        data.uuid =uuid;
        data.email = email;
        data.code = code;
        auth.verifyEmailCode(data,(err,result)=>{
            if(err){
                res.redirect('/verifyEmail/ve')
            }else{
                res.redirect('/user/home')
            }
        })
    }else{
        res.redirect('/login')
    }
})

router.get('/resendEmailCode',(req,res)=>{
    if(req.user){
        var uuid = req.user.uuid;
        var data = {}
        data.uuid = uuid;
        auth.resendVerificationCode(data,(err,result)=>{
            if(err){
                res.redirect('/verifyEmail/se');
            }else{
                res.redirect('/verifyEmail/ss');
            }
        })
    }else{
        res.redirect('/login')
    }
})

module.exports = router