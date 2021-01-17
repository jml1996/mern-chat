import React, { useState, useEffect } from "react";
// import Posts from "./Posts";
import axios from "axios";
import * as yup from "yup";
import registerschema from "../schemata/registerschema";
// import styled from "styled-components";

const initialRegisterFormValues = {
  username: "",
  password: "",
};

const initialRegisterErrors = {
  username: "",
  password: "",
};

const initialRegisterDisabled = true;

function RegisterForm(props) {
  const [registerDisabled, setRegisterDisabled] = useState(
    initialRegisterDisabled
  );
  const [registerErrors, setRegisterErrors] = useState(initialRegisterErrors);
  const [registerFormValues, setRegisterFormValues] = useState(
    initialRegisterFormValues
  );

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterFormValues( prev => {
      return ({
        ...prev,
        [name]: value,
      })
    })

    yup
        .reach(registerschema, name)
        .validate(value)
        .then(() => {
            console.log("reach: ",registerFormValues)
            setRegisterErrors({
                ...registerErrors,
                [name]: "",
            });
        })
        .catch((err) => {
            setRegisterErrors({
                ...registerErrors,
                [name]: err.errors[0],
        });
        });
  };

  const register = (e) => {
    e.preventDefault();
    // const abbreviatedRegistrationCredentials = {
    //   username: registerFormValues.username,
    //   password: registerFormValues.password,
    // };
    // console.log(abbreviatedRegistrationCredentials);

    // console.log(abbreviatedRegistrationCredentials);

    const credentials = registerFormValues;

    console.log(credentials);

    axios
      .post(
        "https://mern-chat-login-server.herokuapp.com/api/register",
        credentials
      )
      .then((res) => {
        console.log(res);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    registerschema.isValid(registerFormValues).then((valid) => {
      setRegisterDisabled(!valid);
      valid && setRegisterErrors(initialRegisterErrors) 
      console.log('useeffect', registerFormValues)
    })
    .catch();
  }, [registerFormValues]);

  return (
    <div>
      <div className="Form">
        <div style={{ color: "red" }} className="errors">
          {registerErrors.username}
          <br />
          {registerErrors.password}
          <br />
        </div>
        <form className="form container" onSubmit={register}>
          <h1>Registration</h1>
          <label className="name">
            Username:
            <input
              value={registerFormValues.username}
              onChange={onChange}
              name="username"
              type="text"
            />
          </label>
          <label className="name">
            Password:
            <input
              value={registerFormValues.password}
              onChange={onChange}
              name="password"
              type="password"
            />
          </label>
          <button disabled={registerDisabled}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
