const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getChannels();
  const cohorts = [];
  // console.log(data);

  Object.keys(data).forEach((item) => {
    cohorts.push({
      id: item,

      cohort: data[item],


    });
  });

  db.saveEmployee(2, 'Rob', 'SLACKK&EBS', 562);

  res.send(cohorts);
});

module.exports = router;
