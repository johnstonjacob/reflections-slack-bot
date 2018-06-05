router.post('URL', (req, res, next) => {
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
    const query = client.query('SELECT * FROM "public"."employees" ORDER BY id ASC');
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
