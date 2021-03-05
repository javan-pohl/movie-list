const mysql = require('mysql')
const dbConfig = require('../../keys/mysql.js')

var dbConnection = (mysql.createPool = {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.db,
  insecureAuth: true
})

module.exports = dbConnection

// // above for Heroku, below for local

// module.exports.config = {
//   host : 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'movielist',
//   insecureAuth : true
// };
