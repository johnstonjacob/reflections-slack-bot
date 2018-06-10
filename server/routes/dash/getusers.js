const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js')

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getUsers();
  const users = [];

  Object.keys(data).forEach((item) => {
    users.push([item, data[item]]);
  });
  // console.log('USERS', users);
  const userStatus = [];
  users.forEach((user) => {
    let meetId;
    const oneUser = []
    oneUser.push(user[0], user[1])
    db.findLastMeeting(user[0], (res) => {
      console.log("FINDLASTMEETINGRES:", res)
      meetId = res.rows[res.rows.length - 1].id;
    });
    db.checkStatus(meetId, (res) => {
      console.log("result for each student:", res)
      if (res === null) {
        oneUser.status.push(0)
      } else {
        oneUser.status.push(1)
      }
    });
    userStatus.push(oneUser);
  });

  console.log("USERSTATUS:", userStatus)

  res.send(userStatus);
});

module.exports = router;
