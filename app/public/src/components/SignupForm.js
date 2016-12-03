import React, {Component} from 'react';
import Form from './Form';

class SignupForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                Sign Up Below!
                <p />
                <Form 
                    action="/signup"
                    type={ this.props.type }
                />
            </div>
        );
    }
}

export default SignupForm;