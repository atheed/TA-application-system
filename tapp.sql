DROP DATABASE IF EXISTS tapp;
CREATE DATABASE tapp;

\c tapp;

CREATE TABLE Login (
  StudentNumber VARCHAR PRIMARY KEY,
  Type VARCHAR,
  Password VARCHAR
);

CREATE TABLE Applicants (
  StudentNumber VARCHAR PRIMARY KEY REFERENCES Applicants(StudentNumber),
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
  NumberOfTAs INTEGER
);

CREATE TABLE Offers (
  StudentNumber VARCHAR PRIMARY KEY REFERENCES Applicants(StudentNumber),
  CourseCode VARCHAR REFERENCES Courses(Code)
);

CREATE TABLE Rankings (
  StudentNumber VARCHAR REFERENCES Applicants(StudentNumber),
  CourseCode VARCHAR REFERENCES Courses(Code),
  Rank INTEGER,
  Experience INTEGER,
  PRIMARY KEY (StudentNumber, CourseCode)
);

insert into applicants values('1000831745', 'Klein', 'Evan', 4, 'Undergrad', '');
insert into applicants values('1000123456', 'Chaudhary', 'Rahul', 4, 'Grad', '');

insert into courses values('CSC108', 'Intro to CS', 'J Smith', 50);
insert into courses values('CSC120', 'Intro to CS for Science', 'Prof 2', 25);

insert into rankings values('1000831745', 'CSC108', 1, 0);

insert into rankings values('1000123456', 'CSC120', 1, 0);

insert into rankings values('1000123456', 'CSC108', 2, 0);
