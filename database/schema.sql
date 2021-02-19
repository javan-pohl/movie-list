DROP DATABASE IF EXISTS movielist;

CREATE DATABASE movielist;

USE movielist;

DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
  GOOGLEID VARCHAR(30) NOT NULL,
  FIRSTNAME VARCHAR(30),
  LASTNAME VARCHAR(30),
  PICURL VARCHAR(200),
  EMAIL VARCHAR(30),
  DISPLAYNAME VARCHAR(60),
  PRIMARY KEY (GOOGLEID)
);

DROP TABLE IF EXISTS SAVEDMOVIES;

CREATE TABLE SAVEDMOVIES (
  GOOGLEID INT NOT NULL,
  MOVIEID INT NOT NULL
)

/*  Execute this file from the command line (NOT inside mysql) by typing:
 *  $ mysql -u root -p < database/schema.sql
 *  to create the database and the tables.*/