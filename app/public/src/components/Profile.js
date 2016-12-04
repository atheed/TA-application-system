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
            isUserInDb: false,
            userInfo: {}
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelectedList = this.updateSelectedList.bind(this);
        this.state = {
            paddingYear: Array(52).join('\xa0'),
            paddingStatus: Array(28).join('\xa0'),
            paddingLegal: Array(28).join('\xa0')
        }
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
                if (data.status == "success") {
                    t.setState({
                        isUserInDb: true,
                        userInfo: userInfo
                    });
                } else {
                    t.setState({
                        isUserInDb: false,
                        userInfo: {}
                    });
                }
            })
            .catch(function(err) {
                t.setState({
                    isUserInDb: false,
                    userInfo: {}
                });
                throw err;
            });

        /**
         * For the fetch() call above, expecting a response in data.data to look
         * somewhat like this (when the user *is* in the db):
         * userInfo: {
                info: {
                    studentnumber: "1000887926",
                    familyname: "Thameem",
                    givenname: "Atheed",
                    year: "4",
                    degree: "Undergrad",
                    workeligibility: "Student Visa",
                    qualifications: ["C", "Haskell"],
                    otherinfo: "eeee"
                },
                . ,
                . ,
                . ,
                qualifications: ["C", "Haskell"]
            }
         */
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
                                    value={this.state.isUserInDb ? this.state.userInfo.info.givenname : undefined} required>
                            </input>
                        </div>
                        <p></p>
                        <div>
                            <label className="form-label">Last Name</label><br/>
                            <input type="text" className="form-control less-wide"  
                                    name="familyname" ref="familyname" 
                                    value={this.state.isUserInDb ? this.state.userInfo.info.familyname : undefined} required>
                            </input>
                        </div>
                        <p />
                        <div>
                            <label className="form-label">Degree Status</label>
                            <br />
                            <label><span className="dropdown dropdown-large">
                            <select className="dropdown-select" 
                                    name="status" ref="degree"
                                    value={this.state.isUserInDb ? this.state.userInfo.info.degree : undefined}>
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
                                    value={this.state.isUserInDb ? this.state.userInfo.info.year : undefined}>
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
                                    value={this.state.isUserInDb ? this.state.userInfo.info.workeligibility : undefined}>
                                <option value="Legally Entitled">Legally Entitled{this.state.paddingLegal}</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>
                            </span></label>
                            </div>
                            <p />
                        <div>
                            <label className="form-label">Proficient in:</label>
                            <AutosuggestBox 
                                onSelectOption={this.updateSelectedList}
                                selected={this.state.isUserInDb ? this.state.userInfo.qualifications.join() : ""}
                            />
                        </div>
                        <p />
                        <br />
                        <div>
                            <label className="form-label">Additional Info:</label>
                            <p />
                            <textarea className="text-area" 
                                    name="additional-info" ref="otherinfo"
                                    value={this.state.isUserInDb ? this.state.userInfo.info.otherinfo : undefined}>
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