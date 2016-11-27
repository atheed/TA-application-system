# Project Proposal

### Project Outline

For our project, we will be building a **TA application system**. It will involve both a front- and back-end, and will have at least two levels of profiles: 

- (1) General users (i.e. students), AND
- (2) Administrator(s) (i.e. TA coordinators, etc.). 

The purpose of the system is to revamp and improve upon (and, hopefully, replace) the existing TA application system for CSC courses at UofT. The app primarily targets (1) students looking to apply for TA positions in CSC courses, and (2) TA coordinators who must accept/reject applicants for courses. 

The web app will aim to serve a more responsive and intuitive process for applicants, while providing professors/TA coordinators with a more wholesome, easier-to-use, and more efficient applicant-choosing experience, with more visibility.

### Interactions

Below is _general_ overview of the interactions that the web app will handle from users. This list is not exhaustive, so others may be added/changed as we build the system: 

- **Students**
    - View information about the upcoming application cycle/process
    - Log into the system
    - View the courses for which they can apply for positions. View the relevant information about these positions (responsibilities, class/lecture/lab/etc. timings, etc.)
    - Fill in an application, inputting/updating the relevant information required for professors/coordinators to make an informed decision (i.e. status, etc.)
    - Choose courses that they would like to apply to be TAs for (adding a 'priority' (i.e. 1st choice, 2nd choice, etc.) for each course they apply for)

- **Administrator (i.e. TA Coordinators)**
    - Log into the system
    - View a dashboard of commands/activities/etc.
    - View all applicants that have applied (be able to filter/search these applications by student number, name, course, year of study, etc.)
    - Add/update information (which will be visible to students applying for positions) for courses (i.e. responsibilities for courses, timings, etc.), and also for applicants
    - Match/choose TAs for courses based on the applications

### Sketches
Below are a few **rough** sketches of of what _some_ of our views will look like. Again, these are not exhaustive, and as such we will iterate on them -- nevertheless, they offer a general outline of what some of our app's views will look like:

The **login page** allows a user to login as one of multiple roles (student, administrator, etc.):

<img src="/proposal/img/sketch1.png" width="440px" height="550px"/>

Choosing any of the above options will show a modal, allowing a user to **login** with their UTORid credentials:

<img src="/proposal/img/sketch2.png" width="440px" height="550px"/>

The **student info** page of a student's application for a TA position. It will ask the relevant information (i.e. degree status, etc.) needed for professors to make informed decisions:

<img src="/proposal/img/sketch3.png" width="440px" height="550px"/>

The **choose courses** page of a student's application for a TA position. The page will allow students to choose which courses they would like to apply for (with priorities), and view any additional info (i.e. responsibilities, etc.) relevant to any course:

<img src="/proposal/img/sketch4.png" width="440px" height="550px"/>

The **administrator dashboard** page, allowing an administrator to perform a host of actions, such as searching/filtering applicants (by various criteria), and matching TAs to courses (i.e. making TA offers). Again, this is not an exhaustive list of actions:

<img src="/proposal/img/sketch5.png" width="440px" height="550px"/>