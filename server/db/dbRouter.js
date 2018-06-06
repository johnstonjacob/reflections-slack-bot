const express = require('express');

const router = express.Router();

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/public'

router.get('/db/employeehistory/', (req, res, next) => {
  const results = [];
  const data = {req.body.empid}
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM public.response where empid=($1);', [data.empid]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.post('/db/createemployee', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {empname: req.body.empname, slackid: req.body.slackid, cohort: req.body.cohort};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO "public"."employees"("empname", "slackid", "cohort") values($1, $2, $3)',
    [data.empname, data.slackid, data.cohort]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM public.employees ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


router.post('/db/createmeeting', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {notes: req.body.notes, message: req.body.message, //meetdate: unix time
  empid: req.body.empid};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO public.meetings("notes", "message", "empid") values($1, $2, $3)',
    [data.notes, data.message, data.empid]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM public.meetings where empid = $1', [data.empid]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


//Updates Response Table with Response Data:
router.post('/db/createresponse', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {restext: req.body.restext, //resdate: unix time
  meetid: req.body.meetid};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO public.response("restext", "meetid") values($1, $2)',
    [data.restext, data.meetid]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM public.response where meetid = $1', [data.meetid]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// Updates Meeting with Response ID
router.put('/db/responseupdate', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const data = {resid: req.body.resid, meetid: req.body.meetid};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE public.meetings SET "resid"=($1) WHERE id=($3)',
    [data.resid, data.meetid]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM items ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});



module.exports = router;