import React from 'react';
import PropTypes from 'prop-types';

const Login = props => (
  <div>
    <button onClick={props.logIn} >Log In</button>
  </div>
);

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default Login;


// Login.propTypes = {
//   logIn: propTypes.boolean.isRequired,
// }
