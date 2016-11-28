import React, { Component } from 'react';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            <h1>TA App</h1>
            <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/courseselection">Course Selection</Link></li>
            </ul>
            </div>
        );
    }
}

export default Home;