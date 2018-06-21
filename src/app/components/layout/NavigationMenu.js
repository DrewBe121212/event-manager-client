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
  const { navigationMenu, handleNavigationMenuItemClick, navigationDrawerOpenMenus } = props;

  const renderNavigationMenuItem = (menu, activeMenu, children = false, currentlyExpanded = false) => {
    const MenuIcon = icons[menu.icon];

    return (
      <NavigationMenuItem
        key={menu.id}
        menu={menu}
        activeMenu={activeMenu}
        handleNavigationMenuItemClick={handleNavigationMenuItemClick}
      >
        {MenuIcon &&
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
        }
        <ListItemText inset primary={menu.menu_title} />
        {children && renderExpandIcon(currentlyExpanded)}
      </NavigationMenuItem>
    );
  };

  const renderMenuItem = (menu, activeMenu) => {
    const hasChildren = menu.visibleChildren > 0 ? true : false;
    const childMenus = hasChildren && renderMenuList(menu.children, activeMenu);
    const currentlyExpanded = childMenus && navigationDrawerOpenMenus.indexOf(menu.id) >= 0;

    if (!hasChildren) {
      return renderNavigationMenuItem(menu, activeMenu, false, false);
    } else {
      return (
        <React.Fragment key={menu.id}>
          {renderNavigationMenuItem(menu, activeMenu, childMenus, currentlyExpanded)}
          <Collapse in={currentlyExpanded} timeout="auto" unmountOnExit>
            {childMenus}
          </Collapse>
        </React.Fragment>
      );
    }
  };

  const renderMenuList = (menus, activeMenu) => {
    let menuList = [];

    menus.forEach((menu) => {
      if (menu.visible) {
        menuList.push(renderMenuItem(menu, activeMenu));
      }
    });

    if (menuList.length > 0) {
      return (
        <MenuList>
          {menuList}
        </MenuList>
      );
    }

    return false;
  };

  if (navigationMenu.loaded && navigationMenu.error === null) {
    return renderMenuList(navigationMenu.menus, navigationMenu.active);
  }

  return null;
};

NavigationMenu.propTypes = {
  navigationMenu: PropTypes.object.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired,
  navigationDrawerOpenMenus: PropTypes.array.isRequired
};

export default NavigationMenu;