import React from 'react';
import config from '../config';
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Link } from "react-router-dom";

import BottomBar from './BottomBar';
import '../Chat.css';

import { setCurrentUsername } from "./../actions";
import { connect } from "react-redux";

class Chat extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.
  state = {
    chat: [],
    content: '',
    name: this.props.currentUsername,
  };

  // }

  componentDidMount() {
    // this.socket = io(config[process.env.NODE_ENV].endpoint);
    this.socket = io();

    // Load the last 10 messages in the window.
    this.socket.on('init', (msg) => {
      let msgReversed = msg.reverse();
      this.setState((state) => ({
        chat: [...state.chat, ...msgReversed],
      }), this.scrollToBottom);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
    });
    this.setState({
      ...this.state,
      name: this.props.currentUsername
    })
  }

  logout() {
    localStorage.removeItem("token");
    this.props.setCurrentUsername();
    // localStorage.removeItem("currentUsernameLocalStorage");
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }
  
  // handleName(event) {
  //   this.setState({
  //     name: event.target.value,
  //   });
  // }

  handleSubmit(event) {
    // Prevent the form to reload the current page.
    event.preventDefault();

    // Send the new message to the server.
    this.socket.emit('message', {
      name: this.state.name,
      content: this.state.content,
    });

    this.setState((state) => {
      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
          name: state.name,
          content: state.content,
        }],
        content: '',
      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div className="Chat">
        <nav className="nav">
            <Link to={"/chat"} style={{ color: "black", textDecoration: "none" }}>
                <p>Chat</p>
            </Link>
            <Link to={"/"} onClick={this.logout} style={{ color: "black", textDecoration: "none" }}>
                <p>Log Out</p>
            </Link>
        </nav>
        <Paper id="chat" elevation={3}>
          {this.state.chat.map((el, index) => {
            return (
              <div key={index}>
                <Typography variant="caption" className="name">
                  {el.name}
                </Typography>
                <Typography variant="body1" className="content">
                  {el.content}
                </Typography>
              </div>
            );
          })}
        </Paper>
        <BottomBar
          content={this.state.content}
          handleContent={this.handleContent.bind(this)}
          name={this.state.name}
          handleSubmit={this.handleSubmit.bind(this)}
          // name={this.state.name}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUsername: state.currentUsername,
  };
};

export default connect(mapStateToProps, { setCurrentUsername })(Chat);
