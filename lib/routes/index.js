const express = require('express')
const router = express.Router()
const test = require('./test/test.controller')
const user = require('./user/user.controller')
const auth = require('./auth/auth.controller')
const authMiddleWare = require('./auth/auth')
const link = require('./link/link.controller')
const public = require('./public/public.controller')
// router.use('/test',test)
router.use('/user',authMiddleWare.isLoggedIn,user)
router.use('/',auth)
router.use('/link',authMiddleWare.isLoggedIn,link)
router.use('/public',public)

// Add more routes here if you want!
module.exports = router