import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RegisterForm from './RegisterForm';
import withNavigationAuthorization from 'hoc/withNavigationAuthorization';

const Register = () => (
  <RegisterForm />
);


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigationAuthorization
)(Register);
