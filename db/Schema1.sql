/*
DROP DATABASE IF EXISTS plumstack;
*/
CREATE DATABASE plumstack;

CREATE SCHEMA plumschema;

\connect plumstack

CREATE TABLE plumschema.employees (
  id serial PRIMARY KEY,
  empname varchar(50) NOT NULL,
  slackid varchar(50) NOT NULL,
  cohort integer NOT NULL,
);

CREATE TABLE plumschema.meetings (
  id serial PRIMARY KEY,
  notes varchar(max),
  message varchar(max),
  meetdate int,  
  empid REFERENCES plumschema.employees(id),
  resid REFERENCES plumschema.response (id)  
);

CREATE TABLE plumschema.response (
  id serial PRIMARY KEY,
  restext varchar(max),
  resdate int,  
  meetid REFERENCES plumschema.meetings(id),
);

/*  
mysql stuff, not postgres:
Execute this file from the command line by typing:
 *    mysql -u student < schemaexample.sql
 *  to create the database and the tables.
Example query:
INSERT INTO meetings (ID, Notes, Message, MeetDate) VALUES (?, "This dude wilin", "Reflect on this and get back", [javascript current date variable], 7, 9);
for current date,
use javascript new date / date now. Easier to do on the javascript side.
 */
