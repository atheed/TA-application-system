import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import AutosuggestBox from './AutosuggestBox';
import Skills from './Skills';
var styles = require('./../../client/css/profile.css');

var utils = require('../utils.js');
var json = utils.json;

let skillsList = [];

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            suggestions: [],
            skills: []
        };

        this.handleAutosuggestChoice = this.handleAutosuggestChoice.bind(this);
        this.handleRemoveChoice = this.handleRemoveChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Function to handle when a new skill is chosen from the autosuggest dropdown
     */
    handleAutosuggestChoice(newSkill) {
        skillsList.push(newSkill);
        this.forceUpdate();
    }

    /**
     * Function to handle when an already-chosen skill is removed
     */
    handleRemoveChoice(skillToRemove) {
        let index = skillsList.indexOf(skillToRemove);
        skillsList.splice(index, 1);
    }

    handleSubmit(event) {
        event.preventDefault();

        // build request for form submit
        var params = {
            FamilyName: this.refs.familyname.value,
            GivenName: this.refs.givenname.value,
            Status: this.refs.status.value,
            Year: this.refs.year.value,
            Eligibility: this.refs.eligibility.value,
            Qualifications: skillsList,
            AdditionalInfo: this.refs.additionalInfo.value
        };
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        // make form submit (POST) request
        fetch("/add-applicant", {
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

                hashHistory.push('/courseselection');
            })
            .catch(function(err) {
                throw err;
            });
    }

    render() {
        return (
            <div id="formEntry">
                <h1 id="profileHeading">Student Profile</h1>
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <div>
                        <label className="formLabel">Family Name</label>
                        <input type="text" className="form-control" name="familyname" ref="familyname"></input>
                    </div>
                    <p></p>
                    <div>
                        <label className="formLabel">First Name</label>
                        <input type="text" className="form-control" name="givenname" ref="givenname"></input>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Degree Status</label>
                        <br />
                        <select name="status" ref="status">
                            <option value="undergrad">Undergraduate</option>
                            <option value="grad">Graduate</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Year</label>
                        <br />
                        <select name="year" ref="year">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Work Eligibility</label>
                        <br />
                        <select name="eligibility" ref="eligibility">
                            <option value="legal">Legally Entitled</option>
                            <option value="student">Student Visa</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Proficient in:</label>
                        <Skills skills={skillsList} removeHandler={this.handleRemoveChoice}/>
                        <AutosuggestBox onChoose={this.handleAutosuggestChoice}/>
                    </div>
                    <p />
                    <div>
                        <label className="formLabel">Additional Info:</label>
                        <br />
                        <textarea name="additional-info" ref="additionalInfo"></textarea>
                        </div>
                    <p />
                    <button type="submit">Enter</button>
                </form>
            </div>
        );
    }
}