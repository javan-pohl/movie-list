var mysql = require('mysql');

let config = {
  host : 'localhost',
  user: 'root',
  password: 'password',
  database: 'movielist',
  insecureAuth : true
};

class Database {
  constructor( config ) {
    this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
    return new Promise( ( resolve, reject) => {
      this.connection.query( sql, args, ( err, rows ) => {
        if (err)
          return reject( err );
        resolve( rows );
      });
    });
  }
  close() {
    return new Promise( ( resolve, reject ) => {
      this.connection.end( err => {
        if ( err )
          return reject( err ) ;
        resolve();
      });
    });
  }
}

let testUser = {
  displayName: "Javan Pohl",
  email: "javanpohl@gmail.com",
  firstName: "Javan",
  googleId: "102965437531014883896",
  lastName: "Pohl",
  picUrl: "https://lh4.googleusercontent.com/-y3CGnI5Sn3Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck9OfXPQfhC8Gwlj-SfK-DxWuQwzw/s96-c/photo.jpg"
};

function insertUser(user, res) {
  // user = req.body.user;
  console.log('insertUser, user: ', user)
  let table = `USERS`;
  let sql = `INSERT IGNORE INTO ${table}(GOOGLEID, FIRSTNAME, LASTNAME, PICURL, EMAIL, DISPLAYNAME) VALUES('${user.wR}', '${user.bT}', '${user.dR}', '${user.fI}', '${user.kt}', '${user.sd}')`;
  let database = new Database(config);
  database.query(sql)
    .then(() => {
      console.log('database insert success!')
      res.status(200).send('user added!')
      database.close()
    })
    .catch(err => {
      console.log('database insert error: ', err)
      res.status(404).send(err)
      database.close();
    })
}

function saveMovieInfo({id, title, vote_average, overview, poster_url}) {
  let table = `MOVIES`;
  let sql = `INSERT IGNORE INTO ${table}(MOVIEID, TITLE, DESC_BODY, SCORE, POSTER) VALUES('${id}', '${title}', '${overview}', '${vote_average}', '${poster_url}')`;
  let database = new Database(config);
  database.query(sql)
    .then(() => {
      console.log('added to list!')
      // because this one is designed to be called alongside another that will send back an http response, we can send back two
      // res.status(200).send('successfully added to list!')
      database.close()
    })
    .catch(err => {
      console.log('add to list error: ', err)
      // res.status(404).send(err)
      database.close();
    })
}

function saveToList(googleId, movieId, res) {
  console.log('saveToList, googleid & movieId: ', googleId, movieId);
  // let googleId = userId;
  // let movieId = id;
  let id = '' + googleId + movieId;
  let table = `SAVEDMOVIES`;
  let sql = `INSERT IGNORE INTO ${table}(ID, GOOGLEID, MOVIEID) VALUES(${id}, '${googleId}', '${movieId}')`;
  let database = new Database(config);
  database.query(sql)
    .then(() => {
      console.log('added to list!')
      res.status(200).send('successfully added to list!')
      database.close()
    })
    .catch(err => {
      console.log('add to list error: ', err)
      res.status(404).send(err)
      database.close();
    })
}
// insertUser(testUser);
// let database = new Database(config)


module.exports = {
  insertUser: insertUser,
  saveMovieInfo: saveMovieInfo,
  saveToList: saveToList
}