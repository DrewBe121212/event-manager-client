import {ability} from 'ability';

let abilities = {};

const setAbilitiesFromState = (state) => {

  const {user: {roles}} = state;

  abilities = {};

  roles.forEach((role) => {
    ability(role);
  });

  return abilities;
};

const canManage = (can = true) => {

  const actions = {
    'view' : can,
    'create': can,
    'update': can,
    'remove': can
  };

  return {...actions};
};

const setAbility = (objects = [], actions = [], can = true) => {

  if (!Array.isArray(objects)) {
    objects = objects.split(',');
  }

  if (!Array.isArray(actions)) {
    actions = actions.split(',');
  }

  if (objects.length === 0 || actions.length === 0) {
    throw new Error('Objects and Actions paramaters are required for the setAbility method');
  }

  objects.forEach((object) => {

    if (typeof abilities[object] === 'undefined') {
      abilities[object] = {};
    }

    actions.forEach((action) => {

      switch(action) {
        case 'manage':
          abilities[object] = {...abilities[object], ...canManage(can)};
          break;

        default:
          abilities[object][action] = can;

      }

    });
  });

};

const hasAbility = (action, object) => {

  if (typeof abilities[object] !== 'undefined' && typeof abilities[object][action] !== 'undefined') {
    return abilities[object][action];
  }

  return false;
};

export {setAbility, hasAbility, setAbilitiesFromState};
