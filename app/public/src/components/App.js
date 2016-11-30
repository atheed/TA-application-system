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
                <Route path='/login' component={LoginForm} />
                <Route path='/signup' component={SignupForm} />
                <Route path='/admin-dashboard' component={AdminDashboard} />
                <Route path='/courseselection' component={CourseSelection} />
                <Route path='/cart' component={Cart} />
            </Router>
        );
    }
}

export default App;