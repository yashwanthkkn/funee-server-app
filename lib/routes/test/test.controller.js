const express = require('express');
const router = express.Router();

router.get("/get",(req,res)=>{
    res.send("Successfully Connected");
})

router.post("/post",(req,res)=>{
    res.send(req.body);
})

module.exports = router;