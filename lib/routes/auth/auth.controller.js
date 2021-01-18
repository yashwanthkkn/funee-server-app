const express = require("express")
const router = express.Router()
const auth = require('./auth')
const passport = require('passport')
const User = require('../user/user.function')
const user = require("../../models/user")


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


router.get('/forgotPassword',(req,res)=>{
    res.render('forgotPassword',{msg:null,email:null});
})

router.get('/forgotPassword/err',(req,res)=>{
    res.render('forgotPassword',{msg:"No such User",email:null});
})

router.post('/forgotPassword/user',(req,res)=>{
    var email = req.body.username;
    if(email){
        User.getUserByEmail({email:email},(err,user)=>{
            if(user){
                auth.forgotPassword({uuid:user.uuid},(err,result)=>{
                    if(err){
                        res.redirect('/forgotPassword/err');
                    }else{
                        res.redirect(`/confirmPassword/${user.uuid}`)
                    }
                })
            }else{
                res.redirect('/forgotPassword/err');
            }
        })
    }else{
        res.redirect('/login')
    }
})

router.get('/confirmPassword/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    User.getUser({userid:uuid},(err,user)=>{
        if(user){
            res.render('verifyPassword',{msg:null,user:user});
        }else{
            res.redirect('/login')
        }
    })
})

router.get('/confirmPassword/:uuid/err',(req,res)=>{
    var uuid = req.params.uuid;
    User.getUser({userid:uuid},(err,user)=>{
        if(user){
            res.render('verifyPassword',{msg:"Incorrect Code",user:user});
        }else{
            res.redirect('/login')
        }
    })
})

router.get('/confirmPassword/:uuid/sc',(req,res)=>{
    var uuid = req.params.uuid;
    User.getUser({userid:uuid},(err,user)=>{
        if(user){
            res.render('verifyPassword',{msg:"Password Changed Successfully",user:user});
        }else{
            res.redirect('/login')
        }
    })
})

router.post('/confirmPassword/user',(req,res)=>{
    var email = req.body.email;
    var code = req.body.code;
    var password = req.body.password;
    if(email && code && password && password.length >=6){
        User.getUserByEmail({email:email},(err,user)=>{
            if(user){
                auth.confirmPassword({user:user,code:code,password:password},(err,result)=>{
                    if(result){
                        res.redirect(`/confirmPassword/${user.uuid}/sc`)
                    }else{
                        res.redirect(`/confirmPassword/${user.uuid}/err`)
                    }
                })
            }else{
                res.redirect('/login')
            }
        })
    }else{
        res.redirect('/login')
    }
})

module.exports = router