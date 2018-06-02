DROP DATABASE IF EXISTS groupify;

CREATE DATABASE plumStack;

USE groupify;

CREATE TABLE employyees (
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

/*  Execute this file from the command line by typing:
 *    mysql -u student < schema.sql
 *  to create the database and the tables.*/

/* For the record, these preferences were generated randomly.
 * Please don't read into them. :) 

Example query:
INSERT INTO students (id, name) VALUES (1, "Albrey");


for current date,
use javascript new date / date now. Easier to do on the javascript side.

 */





