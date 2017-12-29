import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';

const styles = () => ({
  root: {

  }
});

class SignInComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      guestLogin: false
    };
  }

  handleOptionClick = (type) => {
    switch(type) {
      case 'osu':
        alert('redirect to shiboleth');
      break;

      case 'guest':
        this.setState({
          guestLogin: !this.state.guestLogin
        });
      break;
    }
  }

  SignInOptions = () => {
    return (
      <List>
        <ListItem button divider onClick={() => this.handleOptionClick('osu')} >
          <ListItemAvatar>
            <Avatar>
              <PersonOutlineIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="OSU User Login" secondary="Ohio State University Login via Single Sign On" />
          <ListItemSecondaryAction>
            <IconButton aria-label="OSU User Login">
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => this.handleOptionClick('guest')}>
          <ListItemAvatar>
            <Avatar>
              <PersonOutlineIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Guest Login" secondary="Sign in using a username and password that is not affiliated with OSU." />
          <ListItemSecondaryAction>
            <IconButton aria-label="Guest Login">
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }

  GuestSignInForm = () => {
    return 'tom';
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={4}>
          <Paper>
            {this.state.guestLogin ? this.GuestSignInForm() : this.SignInOptions()}
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
};

const mapActionsToProps = {

};

const SignIn = compose(
  withStyles(styles),
  connect(mapStateToProps, mapActionsToProps)
)(SignInComponent);

export {SignIn};
