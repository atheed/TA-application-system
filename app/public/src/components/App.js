import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, 
    hashHistory, browserHistory } from 'react-router';

import Home from './Home';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
            </Router>
        );
    }
}

export default App;