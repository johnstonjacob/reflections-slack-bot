const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const router = express.Router();

router.get('/', function(req, res) {
  request(
    `https://slack.com/api/oauth.access?client_id=${process.env.LOGIN_CLIENT_ID}&client_secret=${
      process.env.LOGIN_CLIENT_SECRET
    }&code=${req.query.code}&redirect_uri=http://206.189.170.211/slack/auth`
  ).then(res.send);
});

module.exports = router;
