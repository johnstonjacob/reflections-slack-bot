const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const router = express.Router();

router.get('/', function(req, res) {
	console.log("REQ in the redirect", req.body)
	res.send(req.body)
})


module.exports = router;