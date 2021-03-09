var mysql = require('mysql')
// var dbConnection = require('./config.js')
var config = require('../../keys/mysql.js')

// let config = {
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'movielist',
//   insecureAuth: true
// }

class Database {
  constructor(config) {
    // this.connection = mysql.createConnection(config)
    this.connection = mysql.createPool(config)
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}

let testUser = {
  displayName: 'Javan Pohl',
  email: 'javanpohl@gmail.com',
  firstName: 'Javan',
  googleId: '102965437531014883896',
  lastName: 'Pohl',
  picUrl:
    'https://lh4.googleusercontent.com/-y3CGnI5Sn3Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck9OfXPQfhC8Gwlj-SfK-DxWuQwzw/s96-c/photo.jpg'
}

function getList(database, userId, res) {
  // let table = `SAVEDMOVIES`;
  // let sql = `SELECT MOVIEID FROM ${table} WHERE GOOGLEID like "${userId}"`;  database.query(sql)
  let table = `MOVIES`
  let table2 = `SAVEDMOVIES`
  let sql = `
    SELECT *
    FROM ${table}
    INNER JOIN ${table2}
    ON ${table}.MOVIEID = ${table2}.MOVIEID
    WHERE ${table2}.GOOGLEID like "${userId}"`
  // let database = new Database(config);
  database
    .query(sql)
    .then(data => {
      console.log('getList success!')
      res.status(200).send(data)
      database.close()
    })
    .catch(err => {
      console.log('get list error: ', err)
      res.status(404).send(err)
      database.close()
    })
}

function insertUser(user, res) {
  // user = req.body.user;
  // console.log('insertUser, user: ', user)
  let table = `USERS`
  let sql = `INSERT IGNORE INTO ${table}(GOOGLEID, FIRSTNAME, LASTNAME, PICURL, EMAIL, DISPLAYNAME) VALUES('${user.kR}', '${user.QS}', '${user.SQ}', '${user.jI}', '${user.nt}', '${user.sd}')`
  let database = new Database(config)
  database
    .query(sql)
    .then(() => {
      console.log('database insert user success!')
      getList(database, user.kR, res)

      // res.status(200).send('user added!')
      // database.close()
    })
    .catch(err => {
      console.log('database insert error: ', err)
      // res.status(404).send(err)
      database.close()
    })
}

function saveMovieInfo({ id, title, vote_average, overview, poster_path }) {
  // console.log('saveMovieInfo, vote_average: ', vote_average)
  overview = overview.replace(/"/g, "'")
  overview = overview.replace(/--/g, '')
  // console.log('overview length: ', overview.length)
  // console.log('new overview: ', overview)
  let table = `MOVIES`
  let sql = `INSERT IGNORE INTO ${table}(MOVIEID, TITLE, DESC_BODY, SCORE, POSTER) VALUES("${id}", "${title}", "${overview}", "${vote_average}", "${poster_path}")`
  let database = new Database(config)
  database
    .query(sql)
    .then(data => {
      // console.log('saved movieInfo!: ', data)
      // because this one is designed to be called alongside another that will send back an http response, we can send back two
      // res.status(200).send('successfully added to list!')
      database.close()
    })
    .catch(err => {
      console.log('save movieInfo error: ', err)
      // res.status(404).send(err)
      database.close()
    })
}

function saveToList(googleId, movieId, res) {
  // console.log('saveToList, googleid & movieId: ', googleId, movieId);
  // let googleId = userId;
  // let movieId = id;
  // console.log('saveToList googleid: ', googleId)
  let id = '' + googleId + movieId
  // console.log('saveToList id: ', id)
  let table = `SAVEDMOVIES`
  let sql = `INSERT IGNORE INTO ${table}(ID, GOOGLEID, MOVIEID) VALUES(${id}, '${googleId}', '${movieId}')`
  let database = new Database(config)
  database
    .query(sql)
    .then(() => {
      console.log('added to list!')
      res.status(200).send('successfully added to list!')
      database.close()
    })
    .catch(err => {
      console.log('add to list error: ', err)
      res.status(404).send(err)
      database.close()
    })
}

function removeFromList(reqBody, res) {
  // console.log('removeFromList body: ', reqBody)
  let googleId = reqBody.googleId;
  let movieId = reqBody.movie;
  // console.log('saveToList googleid: ', googleId)
  let id = '' + googleId + movieId
  // console.log('saveToList id: ', id)
  let table = `SAVEDMOVIES`
  let sql = `DELETE FROM ${table} WHERE ID=${id}`
  let database = new Database(config)
  database
    .query(sql)
    .then(() => {
      console.log('removed from list!')
      res.status(200).send('successfully removed from list!')
      database.close()
    })
    .catch(err => {
      console.log('remove from list error: ', err)
      res.status(404).send(err)
      database.close()
    })
}
// insertUser(testUser);
// let database = new Database(config)

module.exports = {
  insertUser: insertUser,
  saveMovieInfo: saveMovieInfo,
  saveToList: saveToList,
  removeFromList: removeFromList
}
