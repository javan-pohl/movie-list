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

function insertUser(user) {
  let table = `USERS`;
  let sql = `INSERT INTO ${table}(GOOGLEID, FIRSTNAME, LASTNAME, PICURL, EMAIL, DISPLAYNAME) VALUES('${user.googleId}', '${user.firstName}', '${user.lastName}', '${user.picUrl}', '${user.email}', '${user.displayName}')`;
  let database = new Database(config);
  database.query(sql)
    .then(() => {
      console.log('database insert success!')
      database.close()
    })
    .catch(err => {
      console.log('database insert error: ', err)
      database.close();
    })
}

insertUser(testUser);