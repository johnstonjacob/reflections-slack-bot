DROP DATABASE IF EXISTS plumStack;

CREATE DATABASE plumStack;

USE plumStack;

CREATE TABLE employees (
  ID int NOT NULL AUTO_INCREMENT,
  EmpName varchar(50) NOT NULL,
  SlackID varchar(50) NOT NULL,
  Cohort int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE meetings (
  ID int NOT NULL AUTO_INCREMENT,
  Notes varchar(max),
  Message varchar(max),
  MeetDate NULL,  
  PRIMARY KEY (ID),
  FOREIGN KEY (EmpID) REFERENCES employees(ID),
  FOREIGN KEY (ResID) REFERENCES response(ID)  
);

CREATE TABLE response (
  ID int NOT NULL AUTO_INCREMENT,
  ResText varchar(max),
  ResDate NULL,  
  PRIMARY KEY (ID),
  FOREIGN KEY (MeetID) REFERENCES meetings(ID),
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
