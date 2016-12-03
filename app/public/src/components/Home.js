import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, 
    hashHistory, browserHistory } from 'react-router';
import styles from './../../client/css/home.css';

class Home extends Component {
    constructor() {
        super();

        this.studentEntry = this.studentEntry.bind(this);
        this.adminEntry = this.adminEntry.bind(this);
        this.courseSelectionLink = this.courseSelectionLink.bind(this);
    }

    studentEntry() {
        hashHistory.push('/student');
    }

    adminEntry() {
        hashHistory.push('/admin');
    }

    courseSelectionLink() {
        hashHistory.push('/courseselection');
    }

    render() {
        return (
            <div id="home-div">
                <h1>TA App</h1>
                <button className={styles.homeNavBtn} onClick={this.studentEntry}>
                    Enter as Student
                </button>
                <p />
                <button className={styles.homeNavBtn} onClick={this.adminEntry}>
                    Enter as Administrator
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