DROP DATABASE IF EXISTS tapp;
CREATE DATABASE tapp;

\c tapp;

CREATE TABLE Applicants (
  ID SERIAL PRIMARY KEY,
  StudentNumber VARCHAR UNIQUE,
  FamilyName VARCHAR,
  GivenName VARCHAR,
  Year INTEGER,
  Degree VARCHAR,
  Qualifications VARCHAR
);

CREATE TABLE Courses (
  ID SERIAL PRIMARY KEY,
  Code VARCHAR UNIQUE,
  Description VARCHAR,
  Instructor VARCHAR,
  NumberOfTAs INTEGER,
  Degree VARCHAR
);

CREATE TABLE Offers (
  ID SERIAL PRIMARY KEY,
  StudentNumber VARCHAR UNIQUE,
  CourseCode VARCHAR UNIQUE
);

CREATE TABLE Applications (
  ID SERIAL PRIMARY KEY,
  StudentNumber VARCHAR,
  CourseCode VARCHAR,
  Rank INTEGER,
  Experience INTEGER
);