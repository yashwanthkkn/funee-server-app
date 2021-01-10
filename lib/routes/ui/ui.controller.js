const express = require('express')
const router = express.Router()

router.get('/home',(req,res)=>{
    res.render('home');
})

router.get('/public',(req,res)=>{
    res.render('public');
})

router.get('/responses',(req,res)=>{
    res.render('response');
})

router.get('/confession',(req,res)=>{
    res.render('confession');
})

router.get('/room',(req,res)=>{
    res.render('room');
})

module.exports = router