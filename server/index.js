const express = require('express');
const db = require('../database/db/index.js');
const path = require('path');
const cors = require('cors');

const app = express();
// const PORT = 3002;
const PORT = process.env.PORT || 3002

// middleware
const morgan = require('morgan');
const parser = require('body-parser');

// router
// var router = require('./routes.js');

// logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// app.use(function(req, res) {
//   res.redirect('/')
// })

// serve the client files (webpage)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', function(req, res){
  console.log('in that redirect get function')
  res.redirect('/');
});
// app.post('/', )
// database
// const db = require('../database/getProps.js');

app.get('/list/:user', cors(), (req, res) => {
  // db.getById(req, res);
  // console.log(req.body);
});

app.post('/createUser', cors(), (req, res) => {
  // console.log('in create user, req.body: ', req.body)
  db.insertUser(req.body, res)
  /// oohh, here's where we can get list if it exists

});

app.post('/saveMovie', cors(), (req, res) => {
  // db.getById(req, res);
  // console.log(req.body);
  db.saveMovieInfo(req.body.movie)
  db.saveToList(req.body.googleId, req.body.movie.id, res)
});

app.post('/deleteMovie', cors(), (req, res) => {
  db.removeFromList(req.body.googleId, req.body.movie.id, res)
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at localhost:${PORT}!`);
});