const express = require('express')
const router = express.Router()
const test = require('./test/test.controller')
const user = require('./user/user.controller')
const auth = require('./auth/auth.controller')
const authMiddleWare = require('./auth/auth')
const link = require('./link/link.controller')
const public = require('./public/public.controller')
const topic = require('./topic/topic.controller')
const message = require('./message/message.controller')
// router.use('/test',test)
router.use('/user',authMiddleWare.isLoggedIn,user)
router.use('/',auth)
router.use('/link',authMiddleWare.isLoggedIn,link)
router.use('/topic',authMiddleWare.isLoggedIn,topic)
router.use('/public',public)
router.use('/user/msg',authMiddleWare.isLoggedIn,message)

// Add more routes here if you want!
module.exports = router