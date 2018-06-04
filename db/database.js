const pg = require('pg');
const connectionString = 'postgres://afzwcyhwkgcvpv:cd08fcdc9c234df91babe094f40144b316d745f0038130623e44e7245e7db397@ec2-107-20-133-82.compute-1.amazonaws.com:5432/d9mjkq7avau9qj'

const schema = require('./Schema1.sql')

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(schema);
	/*
	Enter the query here: e.g.
	'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
	*/
query.on('end', () => { client.end(); });
