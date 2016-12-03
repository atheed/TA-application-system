import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import AutosuggestBox from './AutosuggestBox';
import Skills from './Skills';
var styles = require('./../../client/css/profile.css');

let skillsList = [];

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            suggestions: [],
            skills: []
        };

        this.handleAutosuggestChoice = this.handleAutosuggestChoice.bind(this);
    }

    handleAutosuggestChoice(newSkill) {
        skillsList.push(newSkill);
        this.forceUpdate();
    }

    render() {
        return (
            <div id="formEntry">
                <h1 id="profileHeading">Student Profile</h1>
                <form action="/TODO" method="post">
                    <div>
                        <label className="formLabel">Degree Status</label>
                        <br />
                        <select name="status">
                            <option value="undergrad">Undergraduate</option>
                            <option value="grad">Graduate</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Work Eligibility</label>
                        <br />
                        <select name="eligibility">
                            <option value="legal">Legally Entitled</option>
                            <option value="student">Student Visa</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Proficient in:</label>
                        <Skills skills={skillsList}/>
                        <AutosuggestBox onChoose={this.handleAutosuggestChoice}/>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Additional Info:</label>
                        <br />
                        <textarea name="additional-info"></textarea>
                        </div>
                    <p />
                    <button type="submit">Enter</button>
                </form>
            </div>
        );
    }
}

export default Profile;