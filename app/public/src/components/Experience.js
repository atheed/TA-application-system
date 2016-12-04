import React, {Component} from 'react';

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
            <div>
                <label className="experienceField">
                    <span className="label">Experience:</span>
                    <input name="experience" type="number" value={this.state.experience} onChange={this.handleChange} required/>
                </label>
            </div>
        );
    }
}

export default Experience;