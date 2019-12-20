import React, { useState } from "react";
import styled from "styled-components";
import axiosWithAuth from "../utils/axiosWithAuth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const LoginStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .formContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    -webkit-box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
    -moz-box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);

    h1 {
      text-transform: uppercase;
      font-weight: 900;
      border-bottom: 1px solid black;
      padding: 3px;
    }

    h3 {
      text-transform: uppercase;
      margin-bottom: -5px;
    }
  }

  button {
    width: 5rem;
    height: 2rem;
    background: none;
    border: 2px solid black;
    border-radius: 15px;
    text-transform: uppercase;
    
    &:hover {
      border: 2px solid #ff652f;
      background: #272727;
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const Login = props => {
  const classes = useStyles();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/login", data)
      .then(response => {
        window.localStorage.setItem("token", response.data.payload);
        props.history.push("/bubbles");
      })
      .catch(error => console.log(error));
  };

  return (
    <LoginStyles>
      <div className="formContainer">
        <h1>Welcome to the Bubble App!</h1>
        <h3>Sign In</h3>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              value={data.username}
              type="text"
              name="username"
              label="Username"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              value={data.password}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </LoginStyles>
  );
};

export default Login;
