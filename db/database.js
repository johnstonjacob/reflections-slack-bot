const { Pool, Client } = require('pg');

const connectionString = 'postgresql://plumstack:plumstackgang@206.189.170.211:5432/plumstack';
// const connectionString = process.env.POSTGRESQL_AUTH;

// . postgresql://plumstack:plumstackgang@206.189.170.211:5432/plumstack

// const schema = require('./Schema1.sql');

const pool = new Pool({
  connectionString,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const client = new Client({
  connectionString,
});
client.connect();

function saveEmployee(empname, slackid, cohort) {
  const sql = 'INSERT INTO employees(empname, slackid, cohort) VALUES( $1, $2, $3 )';

  client.query(sql, [empname, slackid, cohort], (err, res) => {
    // console.log(res);
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
}

function saveMeetings(notes, message, empslackid, meetdate) {
  const sql = 'INSERT INTO meetings(notes, message, empslackid, meetdate) VALUES( $1, $2, $3, $4)';

  client.query(sql, [notes, message, empslackid, meetdate], (err, res) => {
    // console.log(res);
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
}

function test() {
  client.query('SELECT * from meetings', (err, res) => {
    // console.log(res);
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
}

<<<<<<< HEAD
// Adds a response to the response table
// Slack response => response
// Resdate = another Date.now();
// MeetId = id in meetings, foreign key in response
function addResponse(response, resdate, meetid) {
  const sql = 'INSERT INTO response(restext, resdate, meetid) VALUES( $1, $2, $3)';

  client.query(sql, [response, resdate, meetid], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })
}

//Can only be called after the response table has been updated.
//resid is "id" in the response table, and is a foreign key in meetings
function updateMeetingRes(meetid, resid) {
  const sql = 'UPDATE meetings SET resid=($1) WHERE id=($2)';

  client.query(sql, [resid, meetid], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })
}




=======
>>>>>>> dev
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });

module.exports.saveMeetings = saveMeetings;
module.exports.test = test;
module.exports.saveEmployee = saveEmployee;
// const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// const pool = new Pool({
//   connectionString: connectionString,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
