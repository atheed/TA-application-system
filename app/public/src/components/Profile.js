import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AutosuggestBox from './AutosuggestBox';
import NavBar from './NavBar';

var styles = require('./../../client/css/profile.css');

var utils = require('../utils.js');
var json = utils.json;

let skillsList = [];

export default class Profile extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelectedList = this.updateSelectedList.bind(this);
    }

    /**
     * Function responsible for updating list of selected values on click
     */
    updateSelectedList(selected) {
        skillsList = selected.split(",");
    }

    handleSubmit(event) {
        event.preventDefault();

        // make form submit (POST) request
        fetch("/add-applicant", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FamilyName: this.refs.familyname.value,
                    GivenName: this.refs.givenname.value,
                    Degree: this.refs.degree.value,
                    Year: this.refs.year.value,
                    Eligibility: this.refs.eligibility.value,
                    qualifications: skillsList,
                    OtherInfo: this.refs.otherinfo.value
                })
            })
            .then(json)
            .then(function(data) {
                hashHistory.push('/courseselection');
            })
            .catch(function(err) {
                throw err;
            });
    }

    render() {
        return (
            <div>
                <NavBar activePage={1}/>
                <br />
                <div id="formEntry">
                    <h1 id="profileHeading">Student Profile</h1>
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div>
                            <label className="formLabel">Family Name</label><br/>
                            <input type="text" className="form-control lessWide" name="familyname" ref="familyname"></input>
                        </div>
                        <p></p>
                        <div>
                            <label className="formLabel">First Name</label><br/>
                            <input type="text" className="form-control lessWide" name="givenname" ref="givenname"></input>
                        </div>
                        <p />
                        <div>
                            <label className="formLabel">Degree Status</label>
                            <br />
                            <label><span className="dropdown dropdown-large">
                            <select className="dropdown-select" name="status" ref="degree">
                                <option value="undergrad">Undergraduate</option>
                                <option value="grad">Graduate</option>
                            </select>
                            </span></label>
                        </div>
                        <p />
                        <div>
                            <label className="formLabel">Year</label>
                            <br />
                            <label ><span className="dropdown dropdown-large">
                            <select className="dropdown-select" name="year" ref="year">
                                <option value="1">1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            </span></label>
                        </div>
                        <p />
                        <div>
                            <label className="formLabel">Work Eligibility</label>
                            <br />
                            <label ><span className="dropdown dropdown-large">
                            <select className="dropdown-select" name="eligibility" ref="eligibility">
                                <option value="Legally Entitled">Legally Entitled</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>
                            </span></label>
                            </div>
                            <p />
                        <div>
                            <label className="formLabel">Proficient in:</label>
                            <AutosuggestBox onSelectOption={this.updateSelectedList}/>
                        </div>
                        <p />
                        <br />
                        <div>
                            <label className="formLabel">Additional Info:</label>
                            <br />
                            <textarea className="textArea" name="additional-info" ref="otherinfo"></textarea>
                        </div>
                        <p />
                        <br />
                        <Button className="lessWide" color="primary" size="lg" type="submit">Enter</Button>
                    </form>
                </div>
            </div>
        );
    }
}