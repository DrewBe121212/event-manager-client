class Pundit {
  constructor() {
    this.policies = {};
  }

  setPolicies = (policies = {}) => {
    this.policies = policies;
  };

  authorize = (policy, method) => {
    const policyName = policy.endsWith('Policy') ? policy : policy.concat('Policy');
    const methods = this.policies[policyName];

    if (methods) {
      return methods.indexOf(method) >= 0;
    }
    
    return false;
  };
}

export const pundit = new Pundit();