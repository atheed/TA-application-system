DROP DATABASE IF EXISTS tapp;
CREATE DATABASE tapp;

\c tapp;

CREATE TYPE OfferStatus AS ENUM ('offered', 'considered', 'rejected');

CREATE TABLE Login (
  StudentNumber VARCHAR PRIMARY KEY,
  Type VARCHAR,
  Password VARCHAR
);

CREATE TABLE Applicants (
  StudentNumber VARCHAR PRIMARY KEY REFERENCES Login(StudentNumber),
  FamilyName VARCHAR,
  GivenName VARCHAR,
  Year INTEGER,
  Degree VARCHAR,
  OtherInfo VARCHAR
);

CREATE TABLE Courses (
  Code VARCHAR PRIMARY KEY,
  Title VARCHAR,
  Instructor VARCHAR,
  NumberOfTAs INTEGER
);

CREATE TABLE CourseQualifications (
  Code VARCHAR REFERENCES Courses(Code),
  Qualification VARCHAR
);

CREATE TABLE StudentQualifications (
  StudentNumber VARCHAR REFERENCES Applicants(StudentNumber),
  Qualification VARCHAR
);

CREATE TABLE Offers (
  StudentNumber VARCHAR REFERENCES Applicants(StudentNumber),
  CourseCode VARCHAR REFERENCES Courses(Code),
  Status OfferStatus,
  PRIMARY KEY (StudentNumber, CourseCode)
);

CREATE TABLE Rankings (
  StudentNumber VARCHAR REFERENCES Applicants(StudentNumber),
  CourseCode VARCHAR REFERENCES Courses(Code),
  Rank INTEGER,
  Experience INTEGER,
  PRIMARY KEY (StudentNumber, CourseCode)
);

insert into login values ('1000831745', 'student', '$2a$08$zBjiM3Df7jbt4dK0XzbNQe50UWLlvrOQ4sBLdDciEIJiu.yLmPOPa');
insert into login values ('1000123456', 'student', '$2a$08$zBjiM3Df7jbt4dK0XzbNQe50UWLlvrOQ4sBLdDciEIJiu.yLmPOPa');

insert into applicants values('1000831745', 'Klein', 'Evan', 4, 'Undergrad', '');
insert into applicants values('1000123456', 'Chaudhary', 'Rahul', 4, 'Grad', '');

insert into courses values('CSC108', 'Intro to CS', 'J Smith', 50);
insert into courses values('CSC120', 'Intro to CS for Science', 'Prof 2', 25);

insert into coursequalifications values('CSC120', 'Python');
insert into coursequalifications values('CSC120', 'Able to teach 1st years patiently');
insert into coursequalifications values('CSC108', 'Able to teach 1st years patiently');

insert into rankings values('1000831745', 'CSC108', 1, 0);
insert into rankings values('1000123456', 'CSC120', 1, 0);
insert into rankings values('1000123456', 'CSC108', 2, 0);
