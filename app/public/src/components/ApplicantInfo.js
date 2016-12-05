import React, { Component } from 'react';

function json(response) {
    return response.json()
}

class ApplicantInfo extends Component {
    constructor() {
        super();
        this.state = {
            offers: null,
            considerations: null,
            qualifications: [],
            rankings: {
                first: [],
                second: [],
                third: [],
            },
            shouldUpdate: true

        }
        this.getApplicantInfo = this.getApplicantInfo.bind(this);
    }

    componentDidMount() {
        console.log("did mount");
        return this.getApplicantInfo();
    }
    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate() {
        console.log(this.props.course, "did update");
        // this.state.shouldUpdate = false;
        if (this.state.shouldUpdate) {
            this.state.shouldUpdate = false;
            return this.getApplicantInfo();
        } else {
            this.state.shouldUpdate = true;
        }

    }

    getApplicantInfo() {
        var t = this;
        fetch('/applicant-info?stunum=' + this.props.studentNumber, { method: 'GET', credentials: 'include' })
            .then(json)
            .then(function(data) {
                const applicant = data.data;
                console.log(applicant);
                console.log(t.props.course, "setting state");
                t.setState({
                    offers: applicant.offers,
                    considerations: applicant.considerations,
                    qualifications: applicant.qualifications,
                    rankings: {
                        first: applicant.rankings[1].map((course) => { return course.code + ' (' + course.experience + ')' }),
                        second: applicant.rankings[2].map((course) => { return course.code + ' (' + course.experience + ')' }),
                        third: applicant.rankings[3].map((course) => { return course.code + ' (' + course.experience + ')' }),
                    },
                    // shouldUpdate: false
                });
                console.log(t.props.course, "finished setting state");
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    displayCommaSeparated(arr) {
        return arr.map((item, i) => {
            if (i < arr.length - 1) {
                return item + ", ";
            } else {
                return item;
            }
        });
    }

    << << << << <<
    HEAD
    render() {
        console.log(this.props.course, "render");
        const { offers, considerations, qualifications, rankings: { first, second, third } } = this.state;
        return (
            <div className="applicant-info">
				<div><strong>Offers: </strong>{offers}</div>
				<div><strong>Considered for: </strong>{considerations}</div>
				<div><strong>Qualifications: </strong>{this.displayCommaSeparated(qualifications)}</div>
				<div><strong>Rankings: </strong></div>
				<div>1st: {this.displayCommaSeparated(first)}</div><br/>
				<div>2nd: {this.displayCommaSeparated(second)}</div><br/>
				<div>3rd: {this.displayCommaSeparated(third)}</div><br/>
				<div>4th: </div>
				<div>5th: </div>
			</div>
        );
    }
}

export default ApplicantInfo;