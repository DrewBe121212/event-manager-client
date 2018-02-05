import {setAbility} from 'libs/abilities/abilities';

const ability = (role) => {

  switch(role) {

    case 'super_admin':

      break;

    case 'admin':

      break;

    case 'contractor':

      break;

    case 'user':
      setAbility('user,user.logout', 'view');
      setAbility('daily_schedule', 'view');
      break;

    case 'guest':
      setAbility('guest.sign_in,guest.register', 'view');
      setAbility('guest.sign_in.osu', 'login');
      setAbility('guest.sign_in.guest', 'login');
      break;
  }

};

export {ability};
