import React, { Component } from 'react';
import Form from './Form';

class SignupForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <br />
                Sign Up Below!
                <br /><br />
                <Form 
                    action="/signup"
                    type={ this.props.type }
                />
            </div>
        );
    }
}

export default SignupForm;