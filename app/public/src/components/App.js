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
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Applicants from './Applicants';
import CourseSelection from './CourseSelection';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(CourseSelection);
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home}/>
                <Route path='/login' component={LoginForm} />
                <Route path='/signup' component={SignupForm} />
                <Route path='/applicants' component={Applicants} />
                <Route path='/courseselection' component={CourseSelection} />
            </Router>
        );
    }
}

export default App;