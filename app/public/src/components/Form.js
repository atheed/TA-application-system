import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Button } from 'reactstrap';

var styles = require('./../../client/css/form.css');

var utils = require('../utils.js');
var json = utils.json;

class Form extends Component {
    constructor() {
        super();

        this.state = {
            errors: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorHandle = this.errorHandle.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { action, type } = this.props;

        var t = this;

        // build request for form submit
        var params = {
            studentnumber: this.refs.studentnumber.value,
            password: this.refs.password.value,
            type: this.refs.type.value
        };
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        // make form submit (POST) request
        fetch(action, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: searchParams
            })
            .then(json)
            .then(function(data) {
                // if unsuccessful form submit (i.e. incorrect credentials, etc.), throw an error
                if (!data.success)
                    throw "error";

                if (type == 'student')
                    hashHistory.push('/profile');
                else
                    hashHistory.push('/admin-dashboard');
            })
            .catch(function(err) {
                // if error is thrown, handle appropriately
                t.setState({
                    errors: true
                });
            });
    }

    /**
     * Function to handle error messages upon form submission
     */
    errorHandle() {
        if (!this.state.errors) {
            return null;
        } else {
            if (this.props.action == "/login")
                return "Your username and password do not match";
            else
                return "An error occurred while trying to sign up";
        }
    }

    render() {
        const { action, type } = this.props;
        return (
            <form id="loginform" onSubmit={this.handleSubmit}>
                <div>
                    <label>{type == "student" ? "Student Number" : "Admin Username"}</label><br/>
                    <input type="text" className="form-control less-wide" name="studentnumber" ref="studentnumber"></input>
                </div>
                <div>
                    <label>Password</label>
                    <br/>
                    <input type="password" className="form-control less-wide" name="password" ref="password"></input>
                </div>
                <div>
                    <input type="hidden" className="form-control less-wide" name="type" value={type} ref="type"></input>
                </div>
                <div id="errorText">{this.errorHandle()}</div>
                <Button color="primary" size="lg" type="submit">Enter</Button>
            </form>
        );
    }
}

export default Form;