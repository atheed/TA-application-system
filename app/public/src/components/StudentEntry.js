import React, {Component} from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button, ButtonGroup } from 'reactstrap';

var common = require('./../../client/css/common.css');

export default class StudentEntry extends Component {
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
                <h1>Student</h1>
                <br />
                <Button color="primary" onClick={this.entryTypeHandler}>Login</Button> | <Button color="primary" onClick={this.entryTypeHandler}>Sign Up</Button>
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
        );
    }
}