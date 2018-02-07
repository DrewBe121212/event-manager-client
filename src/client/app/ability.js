const ability = (setAbility, role) => {

  switch(role) {

    case 'super_admin':

      break;

    case 'admin':

      break;

    case 'contractor':

      break;

    case 'user':
      setAbility('user', 'view,logout');
      setAbility('daily_schedule', 'view');
      break;

    case 'guest':
      setAbility('guest', 'register,login');
      setAbility('guest', 'login_osu', true);
      break;
  }

};

export {ability};
