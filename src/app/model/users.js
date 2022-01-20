/**
 * Responsible for communication with users database and sending a response.
 * @module Users
 */

const DB = require('../../core/db/db')
const md5 = require('md5')
const ModelPDO = require('../../core/db/model-pdo')

module.exports = class Users extends ModelPDO {
    static table = 'users'

    /**
     * Capture all users.
     *
     * @method
     * @param {function} request - Mapped request for controller.
     * @param {function} response - Function to return response callback.
     * @return
     */
    static async listAll() {
        let promise = new Promise(resolve => {

            try {
                return resolve(this.execQuery('SELECT * FROM users;'))
            } catch (e) {
                console.log({e})
            }


            // const promise = new Promise(resolve => {
            //     let result = {}
            //     DB.instance((errClient, client) => {
            //         if (errClient) {
            //             result = { status: 503, err: errClient }
            //             return resolve(result)
            //         }
            //
            //         DB.query('SELECT * FROM users;', (err, res) => {
            //             client.end()
            //             if (err) result = { status: 500, err: err }
            //             else {
            //                 if (res.rows.length > 0) res = res.rows
            //                 result = { status: 200, data: res }
            //             }
            //
            //             return resolve(result)
            //         }, client)
            //     })
            // })

        })

        return await promise
    }

    /**
     * Search the user with past user's id.
     *
     * @method
     * @param {function} request - Mapped request for controller.
     * @param {function} response - Function to return response callback.
     */
    static
    async byId(userId) {
        const promise = new Promise(resolve => {
            let result = {}

            DB.instance((errClient, client) => {
                if (errClient) {
                    response.send(503, errClient)
                }

                DB.queryParams("SELECT * FROM users WHERE code_user = $1", [userId], (err, res) => {
                    client.end();
                    if (err) response.send(500, err)
                    else {
                        let users = []
                        if (res.rows.length > 0) users = res.rows
                        response.send(200, users)
                    }
                }, client)
            })
        })

        return await promise
    }

    /**
     * Check if user can login.
     *
     * @method
     * @param {function} request - Mapped request for controller
     * @param {function} response - Function to return response callback
     */
    static userLogin(request, response) {
        if (request.body) {
            const user = {
                email: request.body.email,
                password: md5(request.body.password)
            }

            DB.instance((errClient, client) => {
                if (errClient) response.send(503, errClient)

                DB.queryParams('SELECT * FROM users WHERE email = $1 AND password = $2', [user.email, user.password], (err, res) => {
                    client.ed()
                    if (err) response.send(500, err)
                    else {
                        let logged = res.rows.length > 0
                        response.send(logged ? 200 : 203, {success: logged})
                    }

                    client.end()
                }, client)
            })
        }
    }

    /**
     * Create new user.
     *
     * @method
     * @param {function} request - Mapped request for controller.
     * @param {function} response - Function to return response callback.
     */
    static newUser(request, response) {
        if (request.body) {
            const user = {
                name: request.body.name,
                email: request.body.email,
                password: md5(request.body.password)
            }

            DB.instance((errClient, client) => {
                if (errClient) response.send(503, errClient)

                DB.queryParams("INSERT INTO users (email, name, password) VALUES ($1, $2, $3);", [user.email, user.name, user.password], (err) => {
                    client.end()
                    const created = err ? true : false
                    response.send(created ? 201 : 200, {success: created})
                }, client)
            })
        } else {
            response.send(300)
        }
    }

    /**
     * Edit the user according to email.
     *
     * @method
     * @param {function} request - Mapped request for controller.
     * @param {function} response - Function to return response callback.
     */
    static editUser(request, response) {
        if (request.body) {
            const user = {
                name: request.body.name,
                email: request.body.email,
                password: md5(request.body.password)
            }

            DB.instance((errClient, client) => {
                if (errClient) response.send(503, errClient)

                DB.queryParams('UPDATE users SET (name, password) = ($1, $2) WHERE email = $3 RETURNING *;', [user.name, user.password, user.email], (err, res) => {
                    client.end()

                    const updated = err || res.rows.length <= 0

                    response.send(updated ? 200 : 203, {success: updated})
                }, client)
            })
        } else {
            response.send(300)
        }
    }

    /**
     * Deletes user according to last email.
     *
     * @method
     * @param {function} request - Mapped request for controller.
     * @param {function} response - Function to return response callback.
     */
    static deleteUser(request, response) {
        if (request.body) {
            const user = {
                email: request.body.email,
                password: md5(request.body.password)
            }

            DB.instance((errClient, client) => {
                if (errClient) response.send(503, errClient)

                DB.queryParams('UPDATE users SET status = false WHERE email = $1 AND password = $2;', [user.email, user.password], (err) => {
                    client.end()
                    let created = err ? true : false

                    response.send(200, {success: created})
                }, client)
            })
        } else {
            response.send(300)
        }
    }
}