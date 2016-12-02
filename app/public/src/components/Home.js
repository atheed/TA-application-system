import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, 
    hashHistory, browserHistory } from 'react-router';
import styles from './../../client/css/home.css';

class Home extends Component {
    constructor() {
        super();

        this.loginLink = this.loginLink.bind(this);
        this.signupLink = this.signupLink.bind(this);
        this.courseSelectionLink = this.courseSelectionLink.bind(this);
    }

    loginLink() {
        hashHistory.push('/login');
    }

    signupLink() {
        hashHistory.push('/signup');
    }

    courseSelectionLink() {
        hashHistory.push('/courseselection');
    }

    render() {
        return (
            <div id="home-div">
                <h1>TA App</h1>
                <button className={styles.homeNavBtn} onClick={this.loginLink}>
                    Login
                </button>
                <p />
                <button className={styles.homeNavBtn} onClick={this.signupLink}>
                    Sign Up
                </button>
                <p />
                <button className={styles.homeNavBtn} onClick={this.courseSelectionLink}>
                    Course Selection
                </button>
            </div>
        );
    }
}

export default Home;