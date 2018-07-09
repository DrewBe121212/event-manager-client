import { Policies } from './policies';

class Pundit {

  constructor() {
    this.policies = new Policies();
  }

  setPolicies = (policies) => {
    this.policies.setPolicies(policies);
  }

}

export const pundit = new Proxy(new Pundit(), {
  get: (target, prop, receiver) => {
    
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }

    // policy specific check
    return target.policies.policy(prop).authorize;
  }
});


//pundit.MenuPolicy.authorize('index?')