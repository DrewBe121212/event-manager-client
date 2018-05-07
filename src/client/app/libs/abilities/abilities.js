import { store } from 'store';

const canManage = (can = true) => {

  const actions = {
    'view': can,
    'new': can,
    'update': can,
    'destroy': can
  };

  return actions;
};

const setAbility = (objects = [], actions = [], can = true) => {

  let abilities = {};

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
      switch (action) {
        case 'manage':
          abilities[object] = { ...abilities[object], ...canManage(can) };
          break;

        default:
          abilities[object][action] = can;
      }
    });
  });

  return abilities;
};

export const formatAbilities = ({ can, cannot }) => {
  let abilities = {};

  // rebuild
  for (let action in can) {
    abilities = Object.assign({}, abilities, setAbility(can[action], action, true));
  }

  for (let action in cannot) {
    abilities = Object.assign({}, abilities, setAbility(cannot[action], action, false));
  }

  return abilities;
};

export const hasAbility = (action, object) => {
  const { abilities } = store.getState().user.authorization;

  if (typeof abilities[object] !== 'undefined' && typeof abilities[object][action] !== 'undefined') {
    return abilities[object][action];
  }

  return false;
};