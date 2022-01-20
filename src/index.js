const server = require('./app/server')
const log = require('loglevel')

server.listen(3000, () => {
    console.log({ server: 'localhost', port: 3000 }, 'Server listen')
})