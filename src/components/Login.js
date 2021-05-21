import axios from "axios";
import React, { useState, useEffect } from "react";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  console.log(props);

  const initialLoginInfo = {
    username: "",
    password: ""
  }

  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
  const [loginError, setLoginError] = useState("");

  const loginChange = (event) => {
    setLoginInfo({...loginInfo, [event.target.name]:event.target.value})
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post("http://localhost:5000/api/login", loginInfo)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      props.history.push("/bubblepage");
    })
    .catch(error => {
      console.log(error);
      setLoginError("Username or Password not valid");
    })
  }

  useEffect(()=>{
    console.log(loginInfo);
  },[loginInfo]);
  
  const error = loginError;
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={submitHandler}>

          <input 
          type="text"
          name="username"
          value={loginInfo.username}
          onChange={loginChange}
          data-testid="username"
          />

          <input 
          type="text"
          name="password"
          value={loginInfo.password}
          onChange={loginChange} 
          data-testid="password"
          />

          <button>Login</button>

        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.