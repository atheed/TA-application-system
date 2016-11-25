import React, {Component} from 'react';
import Form from './Form';

class SignupForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            <h1>Signup</h1>
            <Form 
                action="/signup"
            />
            </div>
        );
    }
}

export default SignupForm;