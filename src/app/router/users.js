const Users = require('../controller/users')

module.exports = (server) => {
    server.get('/user', Users.getAllUsers)

    server.get('/user/:id', Users.getUserById)

    server.post('/user/login', Users.userLogin)

    server.post('/user/new', Users.newUser)

    server.post('/user/edit', Users.editUser)

    server.del('/user', Users.deleteUser)
}