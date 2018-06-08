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

function test() {

  client.query('SELECT * from employees', (err, res) => {
	  // console.log(res);
	  if (err) {
      console.log(err);
	  } else {
      console.log(res);
	  }

    })
}


// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });


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
