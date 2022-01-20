const DB = require('./db')

module.exports = class ModelPDO {
    static table

    static async dbInstance() {
        return await DB.instance((errClient, client) => {
            if (errClient) throw Error(errClient)

            return client
        })
    }

    static async execQuery(query, params) {
        let promise = new Promise(async (resolve, reject) => {
            const db = await this.dbInstance()
            const res = await db.query(query, params)
            await db.end()

            resolve(res)
        })

        return await promise
    }

    static getTable() {
        return this.table
    }
}