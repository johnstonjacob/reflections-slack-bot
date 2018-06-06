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
// const authRedirect = require('./routes/slack/authRedirect')
const session = require('express-session')
// const passport = require('passport')


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
  console.log(`${req.method} on ${req.url}`);
  next();
});

// app.use(session({
//   secret: 'keyboard cat',
//   saveUninitialized: true,
//   resave: true,
//   cookie: {
//     maxAge: 3600000
//   }
// }))

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/slack/employeeResponse', employeeResponse);
app.use('/dash/employeeConfig', employeeConfig);
app.use('/dash/meeting', meeting);
app.use('/slack/auth', auth);
app.use('/dash/postmessage', slackMessage);
app.use('/dash/getusers', slackUsers);
app.use('/dash/getchannels', slackChannels);
// app.use('/slack/auth/redirect', authRedirect)

app.listen(port, () => {
  log(`Server started on port ${port}!`);
});
