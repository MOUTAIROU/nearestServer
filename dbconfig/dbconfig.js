const mysql = require('mysql')

require('dotenv').config()

const config = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  multipleStatements: true
}

const pool = mysql.createPool(config)

pool.getConnection((err, connection) => {

    if (err) {

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) {
      console.log('mysql connect');
      connection.release()
    }
})


module.exports = pool
