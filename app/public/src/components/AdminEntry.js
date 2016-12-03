import React, {Component} from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default class AdminEntry extends Component {
    constructor() {
        super();

        this.state = {
            entryType: "Login"
        };

        this.entryTypeHandler = this.entryTypeHandler.bind(this);
    }

    entryTypeHandler(event) {
        this.setState({entryType: event.target.innerText});
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <button onClick={this.entryTypeHandler}>Login</button> | <button onClick={this.entryTypeHandler}>Sign Up</button>
                <p />
                {
                    this.state.entryType === "Login" ? 
                    <LoginForm 
                        type={"admin"}
                    /> 
                    :
                    <SignupForm 
                        type={"admin"}
                    />
                }
            </div>
        );
    }
}