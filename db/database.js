const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const schema = require('./Schema1.sql')

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(schema);
	/*
	Enter the query here: e.g.
	'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
	*/
query.on('end', () => { client.end(); });
