import React from 'react';
import withNavigationAuthorization from 'components/withNavigationAuthorization';

const AdminAccount = ({ match }) => {
    const id = match.params.id || null;

    return 'AdminAccount: ' + id;
}

export default withNavigationAuthorization(AdminAccount);