import React, { useState, useEffect } from "react";
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

// import Posts from "./Posts";
import axios from "axios";
import * as yup from "yup";
import registerschema from "../schemata/registerschema";
// import styled from "styled-components";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://joshlovins.com/">
        Josh Lovins
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialRegisterFormValues = {
    username: "",
    password: "",
};

const initialRegisterErrors = {
    username: "",
    password: "",
};

const initialRegisterDisabled = true;

export default function RegisterForm(props) {
  const classes = useStyles();

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
    .catch(err => {
        console.log(err)
    });
  }, [registerFormValues]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div style={{ color: "red" }} className="errors">
          {registerErrors.username}
          <br />
          {registerErrors.password}
          <br />
        </div>
        <form className={classes.form} onSubmit={register}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={registerFormValues.username}
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={registerFormValues.password}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={registerDisabled}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => props.history.push("/")} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}