const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // console.log('hi');
  res.send('hi');
});

module.exports = router;
