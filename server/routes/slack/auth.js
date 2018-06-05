const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', function(req, res) {
  console.log(req);
  res.send(req);
});

module.exports = router;
