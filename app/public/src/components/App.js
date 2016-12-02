import React, { Component } from 'react';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

import Home from './Home';
import StudentEntry from './StudentEntry';
import AdminEntry from './AdminEntry';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile';
import Applicants from './Applicants';
import CourseSelection from './CourseSelection';
import AdminDashboard from './AdminDashboard';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(CourseSelection);
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home}/>
                <Route path='/student' component={StudentEntry} />
                <Route path='/admin' component={AdminEntry} />
                <Route path='/profile' component={Profile} />
                <Route path='/applicants' component={() => (<Applicants course="CSC108"/>)} />
                <Route path='/admin-dashboard' component={AdminDashboard} />
                <Route path='/courseselection' component={CourseSelection} />
            </Router>
        );
    }
}

export default App;