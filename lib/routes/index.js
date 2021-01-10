const express = require('express')
const router = express.Router()
const notes = require('./notes/notes.controller')
const test = require('./test/test.controller')
const user = require('./ui/ui.controller')
router.use('/notes', notes)
router.use('/test',test)
router.use('/user',user)
// Add more routes here if you want!
module.exports = router