
import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';


export const GuestSignInOptions = (props) => {

  const { hasAbility, shibolethLogin, guestLogin } = props;

  let options = [];

  if (hasAbility('login_osu', 'guest')) {
    options.push({
      key: 'osu',
      primary: 'OSU User Login',
      secondary: 'Ohio State University Login via Single Sign On',
      icon: <PersonOutlineIcon />,
      onClick: shibolethLogin
    });
  }

  if (hasAbility('login', 'guest')) {
    options.push({
      key: 'guest',
      primary: 'Guest Login',
      secondary: 'Sign in using a username and password that is not affiliated with OSU.',
      icon: <PersonOutlineIcon />,
      onClick: guestLogin
    });
  }

  if (options.length > 0) {
    return (
      <List>
        {options.map((option, index) => (
          <ListItem button divider={index < options.length - 1} onClick={option.onClick} key={option.key}>
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