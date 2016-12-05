import React, {Component} from 'react';
import Form from './Form';

var common = require('./../../client/css/common.css');

class SignupForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="center">
                <br />
                <b>Sign Up Below!</b>
                <p />
                <br />
                <Form 
                    action="/signup"
                    type={ this.props.type }
                />
            </div>
        );
    }
}

export default SignupForm;