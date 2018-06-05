import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Login = (props) => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">LindenBot</h1>
    </header>
    <div>
      <Button outline color="secondary" onClick={props.logIn}>
        Log In
      </Button>
    </div>
    <div>
      <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=371272898032.373869995077&redirect_uri=http://206.189.170.211/slack/auth">
        <img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
      </a>
    </div>
  </div>
);

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default Login;

// Login.propTypes = {
//   logIn: propTypes.boolean.isRequired,
// }
