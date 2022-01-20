const express = require('express')
const serveUsers = require('./router/users')

const server = express()
// const router = express.Router()

serveUsers(server)

module.exports = server