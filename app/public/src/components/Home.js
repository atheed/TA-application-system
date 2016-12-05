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

var commoncss = require('./../../client/css/common.css');
var homecss = require('./../../client/css/home.css');

class Home extends Component {
    constructor() {
        super();

        this.studentEntry = this.studentEntry.bind(this);
        this.adminEntry = this.adminEntry.bind(this);
    }

    studentEntry() {
        hashHistory.push('/student');
    }

    adminEntry() {
        hashHistory.push('/admin');
    }

    render() {
        return (
            <div className="center">
                <h1 className="heading">TA App</h1>
                <ButtonGroup>
                    <Button color="primary" size="lg" onClick={this.studentEntry} block className="wider">
                    Enter as Student
                    </Button>
                </ButtonGroup>

                <br /><br /><br />
                
                <ButtonGroup>
                    <Button color="primary" size="lg" onClick={this.adminEntry} block>
                    Enter as Administrator
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Home;