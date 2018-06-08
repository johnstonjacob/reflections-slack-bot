const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js')

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  let body = req.body;
  res.send('Message Sent');

  db.saveMeetings(body.notes, body.message, body.student, Date.now());


  slackbot.postMessage(req.body.message);
});

module.exports = router;
