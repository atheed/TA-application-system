import React, { Component } from 'react';

var cart = require('./../../client/css/cart.css');
var common = require('./../../client/css/common.css');

var utils = require('../utils.js');
var json = utils.json;

class Experience extends Component {
    constructor(props) {
        super();
        this.state = {
            experience: props.experience,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // make post request
        let newExperience = event.target.value;

        var t = this;

        fetch('/update-experience-in-course', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // stunum: "1000831745", // TODO: 
                    course: this.props.course,
                    experience: String(newExperience)
                })
            })
            .then(json)
            .then(function(data) {
                t.setState({
                    experience: newExperience
                });
                return;
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    render() {
        return (
            <div className="experience">
                <label className="experience-field">
                    <span className="label">Experience:</span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}
                    <input name="experience" type="number" value={this.state.experience} onChange={this.handleChange} required/>
                </label>
                <br /><br />
            </div>
        );
    }
}

export default Experience;