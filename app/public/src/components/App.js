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
import Profile from './Profile';
import Applicants from './Applicants';
import CourseSelection from './CourseSelection';
import AdminDashboard from './AdminDashboard';
import Cart from './Cart';


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
                <Route path='/admin-dashboard' component={AdminDashboard} />
                <Route path='/courseselection' component={CourseSelection} />
                <Route path='/cart' component={Cart} />
            </Router>
        );
    }
}

export default App;