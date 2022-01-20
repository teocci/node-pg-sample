/** 
 * Module responsible for communication directly with database.
 * @module DB 
 */

const { Client } = require('pg')
const { configDB } = require('../../app/config/config')

module.exports = class DB {
    /**
      * Function that renders a simple query string without parameters.
      * @function
      * @param {string} text - Query to be processed [example: "SELECT * FROM users;"]
      * @param {function} callback - Function that will be called after processing the query
      * @param {pg.Client} client - Database client already connected
    */
    static query(text, callback, client) {
        // const start = Date.now()
        return client.query(text, (err, res) => {
            // const duration = Date.now() - start

            // log.debug({text: text, duration: duration}, "Executed Simple Query")
            callback(err, res)
        })
    }

    /**
     * Function thant render query with parameters.
     * @function
     * @param {string} text - Query to be processed [example: "SELECT users WHERE email = 'gustavo@email.com';"]
     * @param {function} callback - Function that will be called after processing the query
     * @param {pg.Client} client - Database client already connected
     */
    static queryParams(text, params, callback, client) {
        // const start = Date.now()

        return client.query(text, params, (err, res) => {
            // const duration = Date.now() - start

            // log.info({text: text, params: params, duration: duration}, "Executed Query:")
            callback(err, res)
        })
    }

    /**
     * Function that returns a database client connected.
     * @function
     * @param {function} callback - Function that will be called after connecting to database client
     */
    static async instance(callback) {
        // const start = Date.now()

        const client = new Client(configDB)

        await client.connect((err, client, done) => {
            // const duration = Date.now() - start

            console.log('DB connected')
            callback(err, client, done)
        })

        return client
    }
}

