import React, { Component } from 'react';
import { Button } from 'reactstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

var commoncss = require('./../../client/css/common.css');

export default class AdminEntry extends Component {
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
                <h1 className="profile-heading center">Admin</h1>
                <div className="center">
                <Button color="primary" size="lg" onClick={this.entryTypeHandler}>Login</Button> | <Button color="primary" size="lg"  onClick={this.entryTypeHandler}>Sign Up</Button>
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
            </div>
        );
    }
}