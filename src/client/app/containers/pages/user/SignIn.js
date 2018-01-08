import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';
import {CSSTransition} from 'react-transition-group';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';

import {GuestSignInForm} from 'components/forms/user/GuestSignInForm';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class SignInComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      guestLogin: false,
      fadeIn: false
    };
  }

  resetFadeIn = () => {
    this.setState({
      fadeIn: false
    });
  }

  handleOptionClick = (type) => {
    switch(type) {

      case 'osu':
        alert('redirect to shiboleth');
        break;

      case 'guest_cancel':
        this.setState({
          guestLogin: false,
          fadeIn: true
        });
        break;

      case 'guest':
        this.setState({
          guestLogin: true,
          fadeIn: true
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

  render() {

    const {classes} = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={3}>
          <Paper className={classes.paper} >
            <Typography type="headline" gutterBottom>Account Login</Typography>
            <CSSTransition in={this.state.fadeIn} classNames="fade" timeout={1000} exit={false} onEntered={this.resetFadeIn}>
              <div key={this.state.guestLogin ? 1 : 0}>
                {this.state.guestLogin ? <GuestSignInForm guestLogin={this.state.guestLogin} handleCancel={() => this.handleOptionClick('guest_cancel')} /> : this.SignInOptions()}
              </div>
            </CSSTransition>
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
