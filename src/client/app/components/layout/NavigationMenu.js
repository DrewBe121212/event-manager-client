import React from 'react';
import Collapse from 'material-ui/transitions/Collapse';
import { MenuList } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
import PeopleOutlineIcon from 'material-ui-icons/PeopleOutline';
import ScheduleIcon from 'material-ui-icons/Schedule';
import SettingsIcon from 'material-ui-icons/Settings';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { NavigationMenuItem } from './NavigationMenuItem';
import { hasAbility } from 'libs/abilities';

const maxDepth = 1;

const icons = {
  PersonOutline: PersonOutlineIcon,
  PeopleOutline: PeopleOutlineIcon,
  Schedule: ScheduleIcon,
  Settings: SettingsIcon
}

const renderExpandIcon = (expanded) => {
  if (expanded) {
    return <ExpandLessIcon />;
  } else {
    return <ExpandMoreIcon />;
  }
}

export const NavigationMenu = (props) => {
  const { links, activeLink, handleNavigationMenuItemClick, navigationDrawerOpenMenus } = props;

  const renderNavigationMenuItem = (link, activeLink, nested = false, currentlyExpanded = false, depth) => {
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

  const renderMenuItem = (link, activeLink, depth) => {
    const isAuthorizedLink = link.can && link.can.perform && link.can.on;
    const hasNestedLinks = link.nested_links && link.nested_links.length > 0 ? true : false;
    const nestedLinks = hasNestedLinks && renderMenuList(link.nested_links, activeLink, depth+1);
    const hasVisibleNestedLinks = hasNestedLinks && (isAuthorizedLink || nestedLinks);
    const currentlyExpanded = hasVisibleNestedLinks && navigationDrawerOpenMenus.indexOf(link.position) >= 0;

    if (!hasNestedLinks) {
      return renderNavigationMenuItem(link, activeLink, false, false, depth);
    } else if (hasVisibleNestedLinks) {
      return (
        <React.Fragment>
          {renderNavigationMenuItem(link, activeLink, nestedLinks, currentlyExpanded, depth)}
          <Collapse in={currentlyExpanded} timeout="auto" unmountOnExit>
            {nestedLinks}
          </Collapse>
        </React.Fragment>
      );
    }
  }
  
  const renderMenuList = (links, activeLink, depth = 0) => {
    let authorizedLinks = [];
  
    if (depth <= maxDepth) {
      links.map((link) => {
        const hasNestedLinks = link.nested_links && link.nested_links.length > 0;
  
        if (link.can && link.can.perform && link.can.on) {
          const hasAuthorization = hasAbility(link.can.perform, link.can.on);
  
          if (hasAuthorization) {
            authorizedLinks.push(renderMenuItem(link, activeLink, depth));
          }
        } else {
          authorizedLinks.push(renderMenuItem(link, activeLink, depth));
        }
      });
    }
  
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
}
