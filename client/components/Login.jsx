import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { Link } from 'react-router-dom'

const responseGoogle = response => {
  console.log(response)
}

const Login = ({ handleLogin }) => {
  return (
    <Link to="/search">
      <div className="login">
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
