import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default class StudentEntry extends Component {
    constructor() {
        super();

        this.state = {
            entryType: "Login"
        };

        this.entryTypeHandler = this.entryTypeHandler.bind(this);
    }

    entryTypeHandler(event) {
        this.setState({ entryType: event.target.innerText });
    }

    render() {
        return (
            <div>
                <br />
                <h1 className="profile-heading center">Student</h1>
                <div className="center">
                <Button color="primary" size="lg" onClick={this.entryTypeHandler}>Login</Button> |  <Button color="primary" size="lg" onClick={this.entryTypeHandler}>Sign Up</Button>
                <p />
                {
                    this.state.entryType === "Login" ? 
                    <LoginForm 
                        type={"student"}
                    /> 
                    :
                    <SignupForm 
                        type={"student"}
                    />
                }
                </div>
            </div>
        );
    }
}