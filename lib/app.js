const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
app.set("view engine","ejs")
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors({origin:true}))
app.use(bodyParser.urlencoded({ extended: true }))

require('./db')
const routes = require('./routes')
app.use(routes)

module.exports = app