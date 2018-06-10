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
  let meetId;
  users.forEach((user) => {
    userStatus.push(user[0], [1])
    db.findLastMeeting(user, (res) => {
      meetId = res.rows[res.rows.length - 1].id;
      db.checkStatus(meetId, (res) => {
        console.log("result for each student:", res)
        if (res === null) {
          user.status.push(0)
        } else {
          user.status.push(1)
        }
      })
    });
  });
  
  console.log("USERSTATUS:", userStatus)
  
  res.send(userStatus);
});

module.exports = router;
