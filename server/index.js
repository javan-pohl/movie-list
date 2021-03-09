const express = require('express');
const db = require('../database/db/index.js');
const path = require('path');
const cors = require('cors');
require('newrelic');
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

// // Redirect
app.get('/*', function(req, res){
  console.log('in that redirect get function')
  res.redirect('/');
  // res.sendFile(path.join(__dirname, '..', 'public'), function(err) {
  //   if (err) {
  //     res.status(500).send(err)
  //   }
  // })
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
  db.saveMovieInfo(req.body.movie)
  db.saveToList(req.body.googleId, req.body.movie.id, res)
});

app.delete('/deleteMovie', cors(), (req, res) => {
  // console.log(req.body);
  db.removeFromList(req.body, res)
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at localhost:${PORT}!`);
});