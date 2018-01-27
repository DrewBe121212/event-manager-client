import {ability} from 'ability';

let abilities = {};

const setAbilitiesFromStore = (store) => {
  /*roles.forEach((role) => {
    ability(role);
  });*/

}

const canManage = (also, except) => {
  return ['view', 'create', 'update', 'remove'];
}

const setAbility = (objects, actions, can = true) => {

  if (!Array.isArray(objects)) {
    objects = objects.split(',');
  }

  if (!Array.isArray(actions)) {
    actions = actions.split(',');
  }

  objects.forEach((object) => {

    if (typeof abilities[object] === 'undefined') {
      abilities[object] = {};
    }

    actions.forEach((action) => {
      if (typeof abilities[object][action] === 'undefined') {
        abilities[object][action] = can;
      }
    });
  });

}

const hasAbility = (action, object) => {

  if (typeof abilities[object] !== 'undefined' && typeof abilities[object][action] !== 'undefined') {
    return abilities[object][action];
  }

  return false;
}

const hasAbilityToViewRoute = (object) => {
  return hasAbility('view', object);
}

export {setAbility, hasAbility, hasAbilityToViewRoute, setAbilitiesFromStore};
