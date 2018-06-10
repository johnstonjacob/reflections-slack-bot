const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

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
    const oneUser = [];
    oneUser.push(user[0], user[1]);
    db.findLastMeeting(user[0], (res) => {
      if (res.rows.length) {
        meetId = res.rows[res.rows.length - 1].id;
      }
      console.log('THIS IS THE MEET ID:', meetId);
      if (meetId !== undefined) {
        db.checkStatus(meetId, (resi) => {
          console.log('result for each student:', resi.rows);
          if (!resi.rows.length) {
            oneUser.push(1);
          } else {
            oneUser.push(2);
          }
        });
      } else {
        oneUser.push(0);
      }
    });
    userStatus.push(oneUser);
  });

  console.log('USERSTATUS:', userStatus);

  res.send(userStatus);
});

module.exports = router;
