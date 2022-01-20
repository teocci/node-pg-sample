const Users = require('../controller/users')

module.exports = (server) => {
    server.get('/user', Users.listAll)
    // server.get('/user/:id', Users.byId)
    // server.post('/user/login', Users.login)
    // server.post('/user/new', Users.new)
    // server.post('/user/edit', Users.edit)
    // server.delete('/user', Users.delete)
}