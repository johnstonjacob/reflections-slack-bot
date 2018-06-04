const express = require('express');
const slackbot = require('../../../slackbot/index');

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getUsers();
  const users = [];

  Object.keys(data).forEach((item) => {
    users.push([item, data[item]]);
  });

  res.send(users);
});

module.exports = router;
