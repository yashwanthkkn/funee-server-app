const express = require('express')
const router = express.Router()
const notes = require('./notes/notes.controller')
const test = require('./test/test.controller')
router.use('/notes', notes)
router.use('/test',test)
// Add more routes here if you want!
module.exports = router