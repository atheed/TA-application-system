import React, {Component} from 'react';
import Form from './Form';

var common = require('./../../client/css/common.css');

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="center">
                <br />
                <b>Welcome back!</b>
                <p />
                <br />
                <Form 
                    action="/login"
                    type={ this.props.type }
                />
            </div>
        );
    }
}

export default LoginForm;