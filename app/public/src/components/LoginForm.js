import React, {Component} from 'react';
import Form from './Form';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "student"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({selectedValue: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                Login as: 
                <select defaultValue={this.state.selectedValue} onChange={this.handleChange}>
                    <option value="student">Student</option>
                    <option value="admin">Administrator</option>
                </select>
                <p />
                <Form 
                    action="/login"
                    type={ this.state.selectedValue }
                />
            </div>
        );
    }
}

export default LoginForm;