import React, {Component} from 'react';
import Form from './Form';

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            <h1>Login</h1>
            <Form 
                action="/login"
            />
            </div>
        );
    }
}

export default LoginForm;