const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.set("view engine","ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const helmet = require('helmet')
app.use(helmet())

require('./db')
const routes = require('./routes')
app.use(routes)

module.exports = app