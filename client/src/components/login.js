import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Login = props => (
  <div>
    <button onClick={props.logIn} >Log In</button>
  </div>
  <div>
    < a href = "https://slack.com/oauth/authorize?scope=identity.basic&client_id=371272898032.373869995077" > < img alt = "Sign in with Slack"
    height = "40"
    width = "172"
    src = "https://platform.slack-edge.com/img/sign_in_with_slack.png"
    srcset = "https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" / > < /a>
    </div>

);

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};


export default Login;


// Login.propTypes = {
//   logIn: propTypes.boolean.isRequired,
// }
