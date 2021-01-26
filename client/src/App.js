// import "./App.css";
import React, { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./components/PrivateRoute";
import Chat from './components/Chat';
// import SignUp from './components/SignUp';
// import NavBar from './components/NavBar';
// import styled from "styled-components";
import axios from "axios";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import MyPosts from "./components/MyPosts";

function App() {
    // const logout = () => {
    //     localStorage.removeItem("token");
    //     // localStorage.removeItem("currentUsernameLocalStorage");
    // }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <PrivateRoute path="/chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;