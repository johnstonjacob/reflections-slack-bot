const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');
const session = require('express-session');
const url = require('url');
const router = express.Router();
// const request = require('request');

dotenv.config({
  silent: true,
});

router.get('/', (req, res) => {
  // console.log('REQ.query.code TEST', req.query.code);
  const code = req.query.code;
  const options = {
    method: 'GET',
    url: `https://slack.com/api/oauth.access?client_id=${
      process.env.LOGIN_CLIENT_ID
    }&client_secret=${
      process.env.LOGIN_CLIENT_SECRET
    }&code=${code}&redirect_uri=http://159.65.110.176/slack/auth`,
  };
  request(options)
    .then((user) => {
      const parsed = JSON.parse(user);
      if (parsed.access_token) {
        req.session.isAuthenticated = true;
        res.redirect('/');
      } else {
        res.redirect('/failedLogin');
      }
    })
    .catch(console.error);
});

module.exports = router;
