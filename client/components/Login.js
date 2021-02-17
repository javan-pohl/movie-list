import React, { useState, Fragment } from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const Login = ({handleLogin}) => {
  return (
    <GoogleLogin
    clientId="81847403346-qs5lbk3n4qtjac7bhsri2mrtvtj5t8e8.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  )
}

export default Login;
