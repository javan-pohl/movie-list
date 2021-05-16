import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { Link } from 'react-router-dom'

// css for this module is now directly in the html file

const Login = ({ handleLogin, onClick }) => {
  return (
    <Link to="/search">
      <div className="login" onClick={() => onClick()}>
        <GoogleLogin
          clientId="81847403346-qs5lbk3n4qtjac7bhsri2mrtvtj5t8e8.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </Link>
  )
}

export default Login
