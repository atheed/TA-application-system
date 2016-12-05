import React, {Component} from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button, ButtonGroup } from 'reactstrap';

var common = require('./../../client/css/common.css');

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
            <div className="center">
                <br />
                <h1>Admin</h1>
                <br />
                <Button color="primary" size="lg" onClick={this.entryTypeHandler}>Login</Button> | <Button color="primary" size="lg" onClick={this.entryTypeHandler}>Sign Up</Button>
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