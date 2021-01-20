import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';

import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';

import { setCurrentUsername } from "./../actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'gray',
    bottom: 0,
    top: 'auto',
  },
  inputContainer: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    position: 'relative',
    width: '100%',
  },
  icon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: 'auto',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    width: '100%',  },
}));

function BottomBar(props) {
  const classes = useStyles();
  console.log(props.currentUsername);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div style={{maxWidth: '200px', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
          <div>
            {props.currentUsername}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <form onSubmit={props.handleSubmit}>
            <div className={classes.icon}>
              <ChatIcon />
            </div>
            <InputBase
              onChange={props.handleContent}
              value={props.content}
              placeholder="Type your message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'content' }}
            />
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUsername: state.currentUsername,
  };
};

export default connect(mapStateToProps, { setCurrentUsername })(BottomBar);