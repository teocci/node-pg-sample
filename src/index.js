const server = require('./app/server')
const log = require('loglevel')

server.listen(3000, () => {
    log.info({ server: 'localhost', port: 3000 }, 'Server listen')
})