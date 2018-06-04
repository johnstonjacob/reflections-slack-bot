const express = require('express');
const slackbot = require('../../../slackbot/index');

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getChannels();
  res.send(data);
});

module.exports = router;
