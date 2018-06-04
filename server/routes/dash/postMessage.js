const express = require('express');
const slackbot = require('../../../slackbot/index');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Message Sent');
  slackbot.postMessage(req.body.message);
});

module.exports = router;
