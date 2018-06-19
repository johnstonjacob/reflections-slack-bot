const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

async function formatUsers() {
  const data = slackbot.getUsers();

  const users = Object.keys(data).map(user => [user, data[user]]);
  const queryList = Object.keys(data);
  const queryResult = [];

  const result = await db.checkStatus(queryList).catch(err => err);
  queryResult.push(...result.rows);

  const formattedUsers = queryResult.reduce((acc, meeting) => {
    const slackid = meeting.empslackid;
    if (!(slackid in acc)) {
      acc[slackid] = [meeting];
      acc[slackid][0].name = data[slackid];
      return acc;
    }
    acc[meeting.empslackid].push(meeting);
    acc[meeting.empslackid].slice(-1)[0].name = data[meeting.empslackid];
    return acc;
  }, {});

  users.map(function userMap(user) {
    console.log(this);
    if (!this[user[0]]) {
      user.push(0);
      this[user[0]] = [user];
      return user[0];
    } else if (this[user[0]].slice(-1)[0].meetid === null) {
      user.push(1);
      this[user[0]].unshift(user);
      return user[0];
    }
    user.push(2);
    this[user[0]].unshift(user);
    return user[0];
  }, formattedUsers);
  return formattedUsers;
}

router.get('/', async (req, res) => {
  const result = await formatUsers();
  res.send(result);
});

module.exports = router;
