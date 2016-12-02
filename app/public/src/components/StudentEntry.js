import React, {Component} from 'react';
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
        console.log(event.target.innerText);
        this.setState({entryType: event.target.innerText});
    }

    render() {
        return (
            <div>
                <h1>Student</h1>
                <span onClick={this.entryTypeHandler}>Login</span> | <span onClick={this.entryTypeHandler}>Sign Up</span>
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