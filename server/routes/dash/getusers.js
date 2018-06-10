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
  // const userStatus = [];
  // const current = 0;

  let userStatus = users.map((user) => {
    // current += 1;
    let meetId;
    // const oneUser = [];
    // oneUser.push(user[0], user[1]);
    db.findLastMeeting(user[0], (results) => {
      if (results.rows.length) {
        meetId = results.rows[results.rows.length - 1].id;
      }
      console.log('THIS IS THE MEET ID:', meetId);
      if (meetId !== undefined) {
        db.checkStatus(meetId, (resi) => {
          // console.log('result for each student:', resi.rows);
          if (!resi.rows.length) {
            user.push(1);
            // userStatus.push(oneUser);
            console.log('PUSHING 1:', userStatus);
          } else {
            user.push(2);
            // userStatus.push(oneUser);
            console.log('PUSHING 2:', userStatus);
            // if (current === users.length) {
            //   res.send(userStatus);
            // }

          }
        });
      } else {
        user.push(0);
        // userStatus.push(oneUser);
        console.log('CHECKING USERSTATUS STATE:', userStatus);
      }
      userStatus.push(oneUser)
      console.log('USERSTATUS:', userStatus);
    });
  });
  res.send(userStatus);
});

module.exports = router;
