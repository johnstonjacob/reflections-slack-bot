import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Login = props => (
  <div>
    <Button outline color="secondary" onClick={props.logIn} >Log In</Button>


  </div>
);

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};


export default Login;


// Login.propTypes = {
//   logIn: propTypes.boolean.isRequired,
// }
