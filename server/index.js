const express = require('express');
// const expressStaticGzip = require("express-static-gzip");
// var compression = require('compression')
const db = require('../database/db/index.js');
const path = require('path');
const cors = require('cors');
require('newrelic');
const app = express();
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

// Trying to configure the server to serve compressed assets
app.get('*.jsx', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    console.log(req.header('Accept-Encoding'));
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});
// app.use(compression())
// app.use(expressStaticGzip(path.join(__dirname, '..', 'public')));

// serve the client files (webpage)
app.use(express.static(path.join(__dirname, '..', 'public')));

// // Redirect
app.get('/*', function(req, res){
  console.log('in that redirect get function')
  res.redirect('/');
});

app.get('/list/:user', cors(), (req, res) => {
  // db.getById(req, res);
  // console.log(req.body);
});

app.post('/createUser', cors(), (req, res) => {
  // console.log('in create user, req.body: ', req.body)
  db.insertUser(req.body, res)
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