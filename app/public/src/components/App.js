import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, 
    hashHistory, browserHistory } from 'react-router';

import Home from './Home';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Applicants from './Applicants';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home}/>
                <Route path='/login' component={LoginForm} />
                <Route path='/signup' component={SignupForm} />
                <Route path='/applicants' component={Applicants} />
            </Router>
        );
    }
}

export default App;