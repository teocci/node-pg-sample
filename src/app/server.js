const restify = require('restify')
const usersRouter = require('./router/users')

const server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

usersRouter(server)

module.exports = server