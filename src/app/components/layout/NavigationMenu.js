import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import MenuList from '@material-ui/core/MenuList';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigationMenuItem from './NavigationMenuItem';
import { hasAbility } from 'libs/abilities';

const icons = {
  PersonOutline: PersonOutlineIcon,
  PeopleOutline: PeopleOutlineIcon,
  Schedule: ScheduleIcon,
  Settings: SettingsIcon
};

const renderExpandIcon = (expanded) => {
  if (expanded) {
    return <ExpandLessIcon />;
  } else {
    return <ExpandMoreIcon />;
  }
};

const NavigationMenu = (props) => {
  const { links, activeLink, handleNavigationMenuItemClick, navigationDrawerOpenMenus } = props;

  const renderNavigationMenuItem = (link, activeLink, nested = false, currentlyExpanded = false) => {
    const LinkIcon = icons[link.icon];

    return (
      <NavigationMenuItem
        link={link}
        activeLink={activeLink}
        handleNavigationMenuItemClick={handleNavigationMenuItemClick}
      >
        {LinkIcon &&
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
        }
        <ListItemText inset primary={link.title} />
        {nested && renderExpandIcon(currentlyExpanded)}
      </NavigationMenuItem>
    );
  };  

  const renderMenuItem = (link, activeLink) => {
    const isAuthorizedLink = link.can && link.can.perform && link.can.on;
    const hasNestedLinks = link.nested_links && !link.url && link.nested_links.length > 0 ? true : false;
    const nestedLinks = hasNestedLinks && renderMenuList(link.nested_links, activeLink);
    const hasVisibleNestedLinks = hasNestedLinks && (isAuthorizedLink || nestedLinks);
    const currentlyExpanded = hasVisibleNestedLinks && navigationDrawerOpenMenus.indexOf(link.position) >= 0;

    if (!hasNestedLinks) {
      return renderNavigationMenuItem(link, activeLink, false, false);
    } else if (hasVisibleNestedLinks) {
      return (
        <React.Fragment>
          {renderNavigationMenuItem(link, activeLink, nestedLinks, currentlyExpanded)}
          <Collapse in={currentlyExpanded} timeout="auto" unmountOnExit>
            {nestedLinks}
          </Collapse>
        </React.Fragment>
      );
    }
  };
  
  const renderMenuList = (links, activeLink) => {
    let authorizedLinks = [];
    
      links.forEach((link) => {
        const visible = link.visible || true;

        if (visible) {
          if (link.can && link.can.perform && link.can.on) {
            const hasAuthorization = hasAbility(link.can.perform, link.can.on);
    
            if (hasAuthorization) {
              authorizedLinks.push(renderMenuItem(link, activeLink));
            }
          } else {
            authorizedLinks.push(renderMenuItem(link, activeLink));
          }
        }
      });
    
    if (authorizedLinks.length > 0) {
      return (
        <MenuList>
          {authorizedLinks}
        </MenuList>
      );
    }
  
    return false;
  };  

  return renderMenuList(links, activeLink);
};

NavigationMenu.propTypes = {
  links: PropTypes.array.isRequired,
  activeLink: PropTypes.string.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired,
  navigationDrawerOpenMenus: PropTypes.array.isRequired
};

export default NavigationMenu;