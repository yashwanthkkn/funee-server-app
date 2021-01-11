const express = require('express')
const router = express.Router()
const notes = require('./notes/notes.controller')
const test = require('./test/test.controller')
const user = require('./ui/ui.controller')
const auth = require('./auth/auth.controller')
const authMiddleWare = require('./auth/auth')
router.use('/notes', notes)
// router.use('/test',test)
router.use('/user',authMiddleWare.isLoggedIn,user)
router.use('/',auth)

// Add more routes here if you want!
module.exports = router