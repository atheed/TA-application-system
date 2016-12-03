import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

var commoncss = require('./../../client/css/common.css')
var homecss = require('./../../client/css/home.css');

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
            <div className="center">
                <h1 className="heading">TA App</h1>
                <ButtonGroup>
                    <Button color="primary" size="lg" onClick={this.loginLink} block>
                        Login
                    </Button>
                </ButtonGroup>
                
                <ButtonGroup>
                    <Button color="primary" size="lg"  onClick={this.signupLink} block>
                        Sign Up
                    </Button>
                </ButtonGroup>

                <ButtonGroup>
                    <Button color="primary" size="lg"  onClick={this.courseSelectionLink} block>
                        Course Selection
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Home;