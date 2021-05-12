import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import Login from './Login.js';
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('main')
)
