const express = require("express")
const router = express.Router()
const auth = require('./auth')
const passport = require('passport')

router.get("/",(req,res)=>{
    res.redirect('/login')
})

router.get('/login',(req,res)=>{
    res.render('login',{msg:null})
})

router.get('/login/err',(req,res)=>{
    res.render('login',{msg:"Incorrect Username"})
})

router.get('/signup',(req,res)=>{
    res.render('signup',{msg:null})
})

router.get('/signup/err',(req,res)=>{
    res.render('signup',{msg:"Username Already Exists"})
})

router.post('/login',passport.authenticate('local', { failureRedirect: '/login/err' }),(req,res)=>{
    res.redirect("/user/home")
})

router.post('/signup',(req,res)=>{
    var data = req.body
    auth.Signup(data,(err,user)=>{
        if(err){
            res.redirect('/signup/err')
        }else{
            passport.authenticate('local',{failureRedirect:"/login"})(req,res,()=>{
                res.redirect("/user/home")
            })
        }
    })
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/login")
})
module.exports = router