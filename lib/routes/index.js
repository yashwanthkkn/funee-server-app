const express = require('express')
const router = express.Router()
const test = require('./test/test.controller')
const user = require('./ui/ui.controller')
const auth = require('./auth/auth.controller')
const authMiddleWare = require('./auth/auth')
const link = require('./link/link.controller')
// router.use('/test',test)
router.use('/user',authMiddleWare.isLoggedIn,user)
router.use('/',auth)
router.use('/link',authMiddleWare.isLoggedIn,link)

// Add more routes here if you want!
module.exports = router