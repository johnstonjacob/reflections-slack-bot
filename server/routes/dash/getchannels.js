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
  console.log("COHORTS:", cohorts[0].members);



  db.saveEmployee("rob", "harmonic", 23248);

  res.send(cohorts);
});

module.exports = router;
