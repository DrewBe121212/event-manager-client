import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { hasAbility } from 'libs/abilities';
import withNavigationAuthorization from 'hoc/withNavigationAuthorization';

const SignInOptions = ({ match, history }) => {
  let options = [];

  if (hasAbility('new', 'session_sso')) {
    options.push({
      key: 'osu',
      primary: 'OSU User Login',
      secondary: 'Ohio State University Login via Single Sign On',
      icon: <PersonOutlineIcon />,
      onClick: () => {
        alert('sign into sso');
      }
    });
  }

  if (hasAbility('new', 'session')) {
    options.push({
      key: 'guest',
      primary: 'Guest Login',
      secondary: 'Sign in using a username and password that is not affiliated with OSU.',
      icon: <PersonOutlineIcon />,
      onClick: () => {
        history.push(`${match.path}/guest`);
      }
    });
  }

  if (options.length > 0) {
    return (
      <List>
        {options.map((option, index) => (
          <ListItem button disableGutters divider={index < options.length - 1} onClick={option.onClick} key={option.key}>
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
};

SignInOptions.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withNavigationAuthorization(
  SignInOptions
);