DROP DATABASE IF EXISTS tapp;
CREATE DATABASE tapp;

\c tapp;

CREATE TABLE Login (
  StudentNumber VARCHAR PRIMARY KEY,
  Type VARCHAR,
  Password VARCHAR
);

CREATE TABLE Applicants (
  StudentNumber VARCHAR PRIMARY KEY,
  FamilyName VARCHAR,
  GivenName VARCHAR,
  Year INTEGER,
  Degree VARCHAR,
  Qualifications VARCHAR
);

CREATE TABLE Courses (
  Code VARCHAR PRIMARY KEY,
  Description VARCHAR,
  Instructor VARCHAR,
  NumberOfTAs INTEGER,
  Degree VARCHAR
);

CREATE TABLE Offers (
  StudentNumber VARCHAR PRIMARY KEY,
  CourseCode VARCHAR UNIQUE
);

CREATE TABLE Applications (
  StudentNumber VARCHAR PRIMARY KEY,
  CourseCode VARCHAR,
  Rank INTEGER,
  Experience INTEGER
);
