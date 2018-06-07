const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');
const session = require('express-session');
const url = require('url');


dotenv.config({
  silent: true,
});

const router = express.Router();


router.get('/', function(req, res) {
    console.log("REQ.query.code TEST", req.query.code)
    const code = req.query.code;
    const options = {
        method: 'GET',
        url: `https://slack.com/api/oauth.access?client_id=${
      process.env.LOGIN_CLIENT_ID
    }&client_secret=${
      process.env.LOGIN_CLIENT_SECRET
    }&code=${code}&redirect_uri=http://206.189.221.89/slack/auth`,
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
