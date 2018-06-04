const express = require('express');
// const axios = require('axios');

const router = express.Router();
// const winston = require('winston');
const request = require('request');

// function log(message) {
//   process.stdout.write(`${message}\n`);
// }


// router.use((req, res, next) => {
//   log('Im in slack/auth file');
//   next();
// });


// router.get('/', (req, res) => {
// log('BODY:', req.body);
//   process.stdout.write("I'm the bodddy ", req.query.code);
//   if (!req.query.code) { // access denied
//     return;
//   }
//   const data = {
//     form: {
//       client_id: process.env.LOGIN_CLIENT_ID,
//       client_secret: process.env.LOGIN_CLIENT_SECRET,
//       code: req.query.code,
//     },
//   };

//   axios.get('https://slack.com/api/oauth.access', data, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       // Get an auth token
//       const oauthToken = JSON.parse(body).access_token;
//       // OAuth done- redirect the user to wherever
//       res.redirect(`${__dirname}/public/index.html`);
//     }
//   }).then((response) => {
//     process.stdout.write('NEW TOKEN', response);
//   // }).catch((error) => {
//   //   process.stdout.write('error!!');
//   // });
// });


router.get('/', (req, res) => {
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${
      req.query.code
    }&client_id=${process.env.CLIENT_ID
    }&client_secret=${process.env.CLIENT_SECRET
    }&redirect_uri=${process.env.REDIRECT_URI}`,
    method: 'GET',
  };
  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      process.stdout.write(JSONresponse);
      res.send(`Error encountered: \n${JSON.stringify(JSONresponse)}`).status(200).end();
    } else {
      process.stdout.write(JSONresponse);
      res.send('Success!');
    }
  });
});


module.exports = router;

