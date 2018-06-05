router.post('URL', (req, res, next) => {
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
    client.query('INSERT INTO "public"."meetings"("notes", "message", "empid") values($1, $2, $3)',
    [data.notes, data.message, data.empid]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM "public"."meetings" where empid = $1', [data.empid]);
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
