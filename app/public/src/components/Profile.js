import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AutosuggestBox from './AutosuggestBox';
import NavBar from './NavBar';
import { hashHistory } from 'react-router';

var common = require('./../../client/css/common.css');
var styles = require('./../../client/css/profile.css');
var utils = require('../utils.js');
var json = utils.json;

let skillsList = [];

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            familyname: undefined,
            givenname: undefined,
            year: undefined,
            degree: undefined,
            eligibility: undefined,
            qualifications: undefined,
            otherinfo: undefined,
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelectedList = this.updateSelectedList.bind(this);
        this.state = {
            paddingYear: Array(52).join('\xa0'),
            paddingStatus: Array(28).join('\xa0'),
            paddingLegal: Array(28).join('\xa0')
        }

        this.handleGNameChange = this.handleGNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleEligibilityChange = this.handleEligibilityChange.bind(this);
        this.handleQualificationsChange = this.handleQualificationsChange.bind(this);
        this.handleAdditionalInfoChange = this.handleAdditionalInfoChange.bind(this);
    }

    handleGNameChange(event) {
        this.setState({
            givenname: event.target.value
        });
    }

    handleLNameChange(event) {
        this.setState({
            familyname: event.target.value
        });
    }

    handleDegreeChange(event) {
        this.setState({
            degree: event.target.value
        });
    }

    handleYearChange(event) {
        this.setState({
            year: event.target.value
        });
    }

    handleEligibilityChange(event) {
        this.setState({
            eligibility: event.target.value
        });
    }

    handleQualificationsChange(event) {
        console.log(event.target.value);
        this.setState({
            qualifications: event.target.value
        });
    }

    handleAdditionalInfoChange(event) {
        this.setState({
            otherinfo: event.target.value
        });
    }

    componentWillMount() {
        var t = this;
        // make fetch() request to see if user has already added their information
        // earlier. if yes, set the state variables appropriately
        fetch('/applicant-info', {
                method: 'GET',
                credentials: 'include'
            })
            .then(json)
            .then(function(data) {
                const userInfo = data.data;

                // if this is an empty object, the student is not in the db
                if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
                    t.setState({
                        familyname: undefined,
                        givenname: undefined,
                        year: undefined,
                        degree: undefined,
                        eligibility: undefined,
                        qualifications: "",
                        otherinfo: undefined,
                    });
                } else {
                    // in this case, the student *is* in the db
                    t.setState({
                        familyname: userInfo.familyname,
                        givenname: userInfo.givenname,
                        year: userInfo.year,
                        degree: userInfo.degree,
                        eligibility: userInfo.workeligibility,
                        qualifications: userInfo.qualifications,
                        otherinfo: userInfo.otherinfo,
                    });
                }
            })
            .catch(function(err) {
                t.setState({
                    familyname: undefined,
                    givenname: undefined,
                    year: undefined,
                    degree: undefined,
                    eligibility: undefined,
                    qualifications: "",
                    otherinfo: undefined,
                });
                throw err;
            });
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
                if (data.status == "success")
                    hashHistory.push('/courseselection');
            })
            .catch(function(err) {
                console.log(err);
                throw err;
            });
    }

    render() {
        return (
            <div>
                <NavBar activePage={1}/>
                <br />
                <div id="formEntry">
                    <h1 id="profileHeading" className="profile-heading">Student Profile</h1>
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div>
                            <label className="form-label">First Name</label><br/>
                            <input type="text" className="form-control less-wide" 
                                    name="givenname" ref="givenname"
                                    value={this.state.givenname} onChange={this.handleGNameChange} required>
                            </input>
                        </div>
                        <p></p>
                        <div>
                            <label className="form-label">Last Name</label><br/>
                            <input type="text" className="form-control less-wide"  
                                    name="familyname" ref="familyname" 
                                    value={this.state.familyname} onChange={this.handleLNameChange} required>
                            </input>
                        </div>
                        <p />
                        <div>
                            <label className="form-label">Degree Status</label>
                            <br />
                            <label><span className="dropdown dropdown-large">
                            <select className="dropdown-select" 
                                    name="status" ref="degree"
                                    value={this.state.degree}
                                    onChange={this.handleDegreeChange}>
                                <option value="Undergrad">Undergraduate{this.state.paddingStatus}</option>
                                <option value="Grad">Graduate</option>
                            </select>
                            </span></label>
                        </div>
                        <p />
                        <div>
                            <label className="form-label">Year</label>
                            <br />
                            <label ><span className="dropdown dropdown-large">
                            <select className="dropdown-select" 
                                    name="year" ref="year"
                                    value={this.state.year}
                                    onChange={this.handleYearChange}>
                                <option value="1">1{this.state.paddingYear}</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            </span></label>
                        </div>
                        <p />
                        <div>
                            <label className="form-label">Work Eligibility</label>
                            <br />
                            <label ><span className="dropdown dropdown-large">
                            <select className="dropdown-select" 
                                    name="eligibility" ref="eligibility"
                                    value={this.state.eligibility}
                                    onChange={this.handleEligibilityChange}>
                                <option value="Legally Entitled">Legally Entitled{this.state.paddingLegal}</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>
                            </span></label>
                            </div>
                            <p />
                        <div>
                            {console.log(this.state.qualifications)}
                            <label className="form-label">Proficient in:</label>
                            <AutosuggestBox 
                                onSelectOption={this.updateSelectedList}
                                selected={!this.state.qualifications ? "" : "Erlang,Perl,Java"}
                            />
                        </div>
                        <p />
                        <br />
                        <div>
                            <label className="form-label">Additional Info:</label>
                            <p />
                            <textarea className="text-area" 
                                    name="additional-info" ref="otherinfo"
                                    value={this.state.otherinfo}
                                    onChange={this.handleAdditionalInfoChange}>
                            </textarea>
                        </div>
                        <p />
                        <br />
                        <Button className="less-wide" color="primary" size="lg" type="submit">Enter</Button>
                    </form>
                </div>
                <br />
            </div>
        );
    }
}