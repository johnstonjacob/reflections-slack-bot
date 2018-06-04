const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
// . postgresql://plumstack:plumstackgang@206.189.170.211:5432/plumstack

const schema = require('./Schema1.sql')

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(schema);
	/*
	Enter the query here: e.g.
	'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
	*/
query.on('end', () => { client.end(); });
