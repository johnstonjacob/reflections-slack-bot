router.post('URL', (req, res, next) => {
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
    client.query('INSERT INTO "public"."response"("restext", "meetid") values($1, $2)',
    [data.restext, data.meetid]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM "public"."response" where meetid = $1', [data.meetid]);
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
