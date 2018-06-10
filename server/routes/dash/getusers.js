const express = require('express');
const slackbot = require('../../../slackbot/index');

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getUsers();
  const users = [];

  Object.keys(data).forEach((item) => {
    users.push([item, data[item]]);
  });
  console.log('USERS', users);
  // let meetId;
  // db.findLastMeeting(event.user, (res) => {
  //   meetId = res.rows[res.rows.length - 1].id;
  //   db.addResponse(event.text, Date.now(), meetId);
  // });


  res.send(users);
});

module.exports = router;
