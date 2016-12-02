import React, {Component} from 'react';
import Form from './Form';

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                Welcome back!
                <Form 
                    action="/login"
                    type={ this.props.type }
                />
            </div>
        );
    }
}

export default LoginForm;