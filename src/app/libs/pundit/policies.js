class Policies {
  constructor(policies) {
    if (policies) {
      this.setPolicies(policies);
    }
  }

  setPolicies = (policies = {}) => {
    this.policies = policies;
  }

  policy = (Policy) => {
    const methods = this.policies[Policy];

    return {
      authorize: (method) => {
        const methods = this.policies[Policy];
        return methods && methods.indexOf(method) >= 0;
      }
    }
  }
}

export { Policies };