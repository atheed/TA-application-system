import React, { Component } from 'react';
import {
    Button,
    ButtonGroup
} from 'reactstrap';

import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

import commoncss from './../../client/css/common.css';
import homecss from './../../client/css/home.css';

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
            <div className={commoncss.center}>
                <h1 className={homecss.heading}>TA App</h1>
                <Button color="danger" size="lg">Coo</Button>
                <ButtonGroup size="lg">
                    <Button onClick={this.loginLink}>
                        Login
                    </Button>
                    <Button onClick={this.signupLink}>
                        Sign Up
                    </Button>
                    <Button onClick={this.courseSelectionLink}>
                        Course Selection
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Home;