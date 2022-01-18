const Users = require('../controller/users').default

module.exports = (server) => {
    server.get('/user', getAllUsers)

    server.get('/user/:id', getUserById)

    server.post('/user/login', userLogin)

    server.post('/user/new', newUser)

    server.post('/user/edit', editUser)

    server.del('/user', deleteUser)
}