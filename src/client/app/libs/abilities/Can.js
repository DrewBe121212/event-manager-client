import {hasAbility} from './abilities';

const Can = (props) => {
  const {perform, on, children} = props;

  if (hasAbility(perform, on)) {
    return children;
  }

  return null;
};

export {Can};
