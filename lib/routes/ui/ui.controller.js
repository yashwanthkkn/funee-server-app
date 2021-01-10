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

module.exports = router