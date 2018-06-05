const express = require('express');
const slackbot = require('../../../slackbot/index');

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

  res.send(cohorts);
});

module.exports = router;
