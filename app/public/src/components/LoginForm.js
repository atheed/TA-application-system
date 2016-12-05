import React, { Component } from 'react';
import Form from './Form';

var commoncss = require('./../../client/css/common.css');

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <br />
                Please login below!
                <br /><br />
                <Form 
                    action="/login"
                    type={ this.props.type }
                />
            </div>
        );
    }
}

export default LoginForm;