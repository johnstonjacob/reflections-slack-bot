const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const router = express.Router();

router.get('/', function(req, res) {
  request(
    `https://slack.com/api/oauth.access
    ?client_id=${process.env.LOGIN_CLIENT_ID}
    &client_secret=${process.env.LOGIN_CLIENT_SECRET}
    &code=${req.query.code}`
  ).then(res.send);
});

module.exports = router;
