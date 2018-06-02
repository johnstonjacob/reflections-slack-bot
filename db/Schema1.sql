CREATE DATABASE plumstack;

CREATE SCHEMA plumschema;

CREATE TABLE plumschema.employees (
  id serial PRIMARY KEY,
  empname varchar(50) NOT NULL,
  slackid varchar(50) NOT NULL,
  cohort integer NOT NULL,
);

CREATE TABLE plumschema.meetings (
  id serial PRIMARY KEY,
  notes text,
  message text,
  meetdate integer,  
  empid REFERENCES plumschema.employees(id),
  resid REFERENCES plumschema.response (id)  
);

CREATE TABLE plumschema.response (
  id serial PRIMARY KEY,
  restext text,
  resdate integer,  
  meetid REFERENCES plumschema.meetings(id),
);
