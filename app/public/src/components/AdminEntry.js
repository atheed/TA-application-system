import React, {Component} from 'react';
import LoginForm from './LoginForm';

export default class AdminEntry extends Component {
    constructor() {
        super();
    }

    handleChange(event) {
        this.setState({selectedValue: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <span>Login</span> | <span>Sign Up</span>
                <LoginForm 
                    type={"admin"}
                />
            </div>
        );
    }
}