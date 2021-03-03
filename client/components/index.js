import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
// import Login from './Login.js';
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('main')
)
