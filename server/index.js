const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const employeeResponse = require('./routes/slack/employeeResponse');
const employeeConfig = require('./routes/dash/employeeConfig');
const meeting = require('./routes/dash/meeting');
const auth = require('./routes/slack/auth');
const slackMessage = require('./routes/dash/postMessage');
const slackUsers = require('./routes/dash/getusers');
const slackChannels = require('./routes/dash/getchannels');

dotenv.config({
  silent: true,
});

const app = express();
const port = process.env.PORT || 8080;

function log(message) {
  process.stdout.write(`${message}\n`);
}

if (process.env.BUILD === 'prod') app.use('/', express.static(`${__dirname}/../client/build`));

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  log(`${req.method} on ${req.url}`);
  next();
});

app.use('/slack/employeeResponse', employeeResponse);
app.use('/dash/employeeConfig', employeeConfig);
app.use('/dash/meeting', meeting);
app.use('/slack/auth', auth);
app.use('/dash/postmessage', slackMessage);
app.use('/dash/getusers', slackUsers);
app.use('/dash/getchannels', slackChannels);

app.listen(port, () => {
  log(`Server started on port ${port}!`);
});
