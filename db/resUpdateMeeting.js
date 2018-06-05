router.put('URL', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const meetid = req.params.meetid;
  // Grab data from http request
  const data = {resid: req.body.resid};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE "public"."meetings" SET "resid"=($1) WHERE id=($3)',
    [data.resid, meetid]);
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
