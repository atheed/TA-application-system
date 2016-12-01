import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, 
    hashHistory, browserHistory } from 'react-router';
import styles from './../../client/css/home.css';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            <h1>TA App</h1>
            <div className="home-nav-btn">
                <Link to="/login">Login</Link>
            </div>
            <div className="home-nav-btn">
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="home-nav-btn">
                <Link to="/courseselection">Course Selection</Link>
            </div>
            </div>
        );
    }
}

export default Home;