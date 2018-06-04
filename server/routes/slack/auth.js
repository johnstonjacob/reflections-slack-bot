const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', function(req, res) {
  if (!req.query.code) {
    // access denied
    return;
  }
  const data = {
    form: {
      client_id: process.env.LOGIN_CLIENT_ID,
      client_secret: process.env.LOGIN_CLIENT_SECRET,
      code: req.query.code,
    },
  };

  request.get('https://slack.com/api/oauth.access', data, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Get an auth token
      const oauthToken = JSON.parse(body).access_token;
      // OAuth done- redirect the user to wherever
      console.log(oauthToken);
      res.send('success');
    }
  });
});

module.exports = router;
