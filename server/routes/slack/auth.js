const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('BODY:', req.body);
  if (!req.query.code) { // access denied
    return;
  }
  const data = {
    form: {
      client_id: process.env.LOGIN_CLIENT_ID,
      client_secret: process.env.LOGIN_CLIENT_SECRET,
      code: req.query.code,
    },
  };
  axios.post('https://slack.com/api/oauth.access', data, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // Get an auth token
      const oauthToken = JSON.parse(body).access_token;
      console.log('THE ONE TOKEN TO RULE THEM ALL', oauthToken);
      // OAuth done- redirect the user to wherever
      res.redirect(`${__dirname}/public/success.html`);
    }
  });
});


module.exports = router;

