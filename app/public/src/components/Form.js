import React, {Component} from 'react';

class Form extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
		event.preventDefault();

        //var form = new FormData(document.getElementById('loginform'));
        var form = document.querySelector('form');
        console.log(this.refs.type.value);
        
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                studentnumber: this.refs.studentnumber.value,
                password: this.refs.password.value,
                type: this.refs.type.value
            })
        });

        /*
        fetch("/login", {
            method: "POST",
            body: form
        });
        */

        /*
        fetch('/login', { 
            method: 'POST', 
            //credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentnumber: this.refs.studentnumber.value,
                password: this.refs.password.value,
                type: this.refs.type.value
            })
        });
        .then(json)
            .then(function(data) {
            console.log(data);
        })
            .catch(function(err) {
            // Error
            throw err;
        });
        */
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