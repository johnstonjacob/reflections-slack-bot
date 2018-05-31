const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// const routes = require('./routes/index');

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
// app.use('/', routes);

app.listen(port, () => {
  log(`Server started on port ${port}!`);
});
