const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const router = express.Router();

router.get('/', function(req, res) {
  console.log("REQ TEST", req)
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
    .then(res.send)
    .catch(console.error);
});

module.exports = router;
