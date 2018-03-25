import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from 'material-ui/styles';
import {CSSTransition} from 'react-transition-group';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';

import {loadForm, saveForm} from 'actions/forms';
import {authenticateUser} from 'actions/user';
import {setMenuTitle} from 'actions/navigation';
import {GuestSignInForm} from 'components/forms/user/GuestSignInForm';
import {withAuthorization} from 'libs/abilities';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class SignInComponent extends React.Component {

  static authorize = {action: 'login', object: 'guest'};

  static propTypes = {
    classes: PropTypes.object.isRequired,
    hasAbility: PropTypes.func.isRequired,
    setMenuTitle: PropTypes.func.isRequired,
    authenticateUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    props.setMenuTitle('Account Login');

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

  shibolethLogin = () => {
    alert('redirect to shiboleth');
  }

  guestLogin = () => {
    this.setState({
      guestLogin: true,
      fadeIn: true
    });
  }

  cancelGuestLogin = () => {
    this.setState({
      guestLogin: false,
      fadeIn: true
    });
  }

  SignInOptions = () => {

    const {hasAbility} = this.props;

    let options = [];

    if (hasAbility('login_osu', 'guest')) {
      options.push({
        key: 'osu',
        primary: 'OSU User Login',
        secondary: 'Ohio State University Login via Single Sign On',
        icon: <PersonOutlineIcon />,
        onClick: this.shibolethLogin
      });
    }

    if (hasAbility('login', 'guest')) {
      options.push({
        key: 'guest',
        primary: 'Guest Login',
        secondary: 'Sign in using a username and password that is not affiliated with OSU.',
        icon: <PersonOutlineIcon />,
        onClick: this.guestLogin
      });
    }

    if (options.length > 0) {
      return (
        <List>
          {options.map((option, index) => (
            <ListItem button divider={index < options.length-1} onClick={option.onClick} key={option.key}>
              <ListItemAvatar>
                <Avatar>
                  {option.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={option.primary} secondary={option.secondary} />
              <ListItemSecondaryAction>
                <IconButton aria-label={option.primary}>
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
    } else {
      return 'No login options are available';
    }
  }

  render() {
    const {classes, loadForm, saveForm, form, loginForm, authenticateUser} = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Paper className={classes.paper} >
            <CSSTransition in={this.state.fadeIn} classNames="fade" timeout={1000} exit={false} onEntered={this.resetFadeIn}>
              <div>
                {this.state.guestLogin ? <GuestSignInForm authenticateUser={authenticateUser} loadForm={loadForm} saveForm={saveForm} form={form} handleCancel={this.cancelGuestLogin} /> : this.SignInOptions()}
              </div>
            </CSSTransition>
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = (state) => ({
  form: state.forms
});

const mapDispatchToProps = {
  loadForm,
  saveForm,
  setMenuTitle,
  authenticateUser
};

const SignIn = compose(
  withStyles(styles),
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps)
)(SignInComponent);

export {SignIn};
