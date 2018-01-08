import {setUserAuthorization, resetUserAuthorization} from 'actions/user';

const canManage = (also, except) => {
  return ['read', 'create', 'update', 'remove'];
}

const setAbility = (objects, actions, roles) => {

  let ability = {};

  if (!Array.isArray(objects)) {
    objects = objects.split(',');
  }
  if (!Array.isArray(actions)) {
    actions = actions.split(',');
  }
  if (!Array.isArray(roles)) {
    roles = roles.split(',');
  }

  roles.forEach((role) => {
    console.log(role);
  });

}

const withAbilities = (store) => {
  const {user} = store.getState();
  const {roles} = user;

  let abilities = {};

  if (roles.indexOf('guest') >= 0 || 1 == 1) {
    abilities['guest_sign_in'] = ['view'];
  }

  store.dispatch(setUserAuthorization(abilities));

}


export {withAbilities};
