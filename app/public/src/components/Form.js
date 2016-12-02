import React, {Component} from 'react';
import { hashHistory } from 'react-router';

var utils = require('../utils.js');
var json = utils.json;

class Form extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { action, type } = this.props;

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
            if (action == '/login')
                hashHistory.push('/profile');
            else
                hashHistory.push('/');
        })
        .catch(function(err) {
            throw err;
        });
    }

    render() {
        const { action, type } = this.props;
        return (
            <form id="loginform" onSubmit={this.handleSubmit}>
                <div>
                    <label>{type == "student" ? "Student Number" : "Admin Username"}</label>
                    <input type="text" className="form-control" name="studentnumber" ref="studentnumber"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" ref="password"></input>
                </div>
                <div>
                    <input type="hidden" className="form-control" name="type" value={type} ref="type"></input>
                </div>
                <button type="submit">Enter</button>
            </form>
        );
    }
}

export default Form;