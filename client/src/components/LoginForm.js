import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import loginschema from "../schemata/loginschema";
// import styled from "styled-components";

import { setCurrentUsername } from "./../actions";
import { connect } from "react-redux";

const initialLoginFormValues = {
  username: "",
  password: "",
};

const initialLoginErrors = {
  username: "",
  password: "",
};

const initialLoginDisabled = true;

function LoginForm(props) {
  const [loginDisabled, setLoginDisabled] = useState(initialLoginDisabled);
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors);
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );

  const loginInputChange = (name, value) => {
    yup
      .reach(loginschema, name)
      .validate(value)
      .then(() => {
        setLoginErrors({
          ...loginErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setLoginErrors({
          ...loginErrors,
          [name]: err.errors[0],
        });
      });

    setLoginFormValues({
      ...loginFormValues,
      [name]: value,
    });
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    loginInputChange(name, value);
  };

  const login = (e) => {
    e.preventDefault();

    const credentialsTest = loginFormValues;

    console.log(credentialsTest);

    axios
      .post("https://mern-chat-login-server.herokuapp.com/api/login", credentialsTest)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "currentUsernameLocalStorage",
          credentialsTest.username
        );
        props.setCurrentUsername();
        props.history.push("/chat");
      })
      .catch((err) => {
        setLoginErrors({
          ...loginErrors,
          password: "You entered an incorrect username or password",
        });
      });
    console.log(props.currentUsername);
  };
  useEffect(() => {
    loginschema.isValid(loginFormValues).then((valid) => {
      setLoginDisabled(!valid);
    });
  }, [loginFormValues]);

  useEffect(() => {}, [loginErrors]);

  return (
    <div>
        <div className="Form">
            <div className="errors" style={{ color: "red" }}>
            {loginErrors.username}
            <br />
            {loginErrors.password}
            <br />
            </div>
            <form className="form container" onSubmit={login}>
                <h1>Log in</h1>
                <label className="name">
                    Username:
                    <input
                    value={loginFormValues.username}
                    onChange={onChange}
                    name="username"
                    type="text"
                    />
                </label>
                <br />
                <label className="name">
                    Password:
                    <input
                    value={loginFormValues.password}
                    onChange={onChange}
                    name="password"
                    type="password"
                    />
                </label>
                <br />
                <button className="loginButton" disabled={loginDisabled}>
                    Login
                </button>
            </form>
            <div className="register">
            <p>No account yet?</p>
            <button onClick={() => props.history.push("/register")}>
                Register
            </button>
            </div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      currentUsername: state.currentUsername,
    };
};

export default connect(mapStateToProps, { setCurrentUsername })(LoginForm);

// export default LoginForm;

// const mapStateToProps = (state) => {
//   return {
//     currentUsername: state.currentUsername,
//   };
// };

// export default connect(mapStateToProps, { setCurrentUsername })(LoginForm);