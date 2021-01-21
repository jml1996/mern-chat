import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import loginschema from '../schemata/loginschema';
import axios from 'axios';

import { setCurrentUsername } from "./../actions";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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
  const classes = useStyles();
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  const [loginDisabled, setLoginDisabled] = useState(initialLoginDisabled);
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors);

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
        // .post("http://localhost:8000/api", credentialsTest)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <div className="errors" style={{ color: "red" }}>
            {loginErrors.username}
            <br />
            {loginErrors.password}
            <br />
        </div>
        <form className={classes.form} onSubmit={login} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={loginFormValues.username}
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginFormValues.password}
            onChange={onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loginDisabled}
          >
            Log In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link  variant="body2">
                Register
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={() => props.history.push("/register")} variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
    return {
      currentUsername: state.currentUsername,
    };
};

export default connect(mapStateToProps, { setCurrentUsername })(LoginForm);
