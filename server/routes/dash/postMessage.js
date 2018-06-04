const express = require('express');
const slackbot = require('../../../slackbot/index');

const router = express.Router();

router.post('/message', (req, res) => {
  res.send('Message Sent');
  slackbot.postMessage(req.body.text);
});

module.exports = router;
