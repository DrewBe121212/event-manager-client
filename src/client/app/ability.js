import {setAbility} from 'utils/abilities';

const ability = (role) => {

  

  switch(role) {

    case 'super_admin':

    break;

    case 'admin':

    break;

    case 'contractor':

    break;

    case 'user':
      setAbility('user.logout', 'view');
      setAbility('daily_schedule', 'view');
    break;

    case 'guest':
      setAbility('guest.sign_in,guest.register', 'view');
    break;
  }

}

export {ability};
