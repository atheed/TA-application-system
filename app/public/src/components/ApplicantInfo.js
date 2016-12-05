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
                preferred: [],
                willing: [],
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
                        preferred: applicant.rankings[4].map((course) => { return course.code + ' (' + course.experience + ')' }),
                        willing: applicant.rankings[5].map((course) => { return course.code + ' (' + course.experience + ')' }),
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

    render() {
        console.log(this.props.course, "render");
        const { offers, considerations, qualifications, rankings: { first, second, third, preferred, willing } } = this.state;
        return (
            <div className="applicant-info">
				<div><strong>Offers: </strong>{offers}</div>
				<div><strong>Considered for: </strong>{considerations}</div>
				<div><strong>Qualifications: </strong>{this.displayCommaSeparated(qualifications)}</div>
				<div><strong>Rankings: </strong></div>
				<div>1st: {this.displayCommaSeparated(first)}</div>
				<div>2nd: {this.displayCommaSeparated(second)}</div>
				<div>3rd: {this.displayCommaSeparated(third)}</div>
				<div>Preferred: {this.displayCommaSeparated(preferred)}</div>
				<div>Willing: {this.displayCommaSeparated(willing)}</div>
			</div>
        );
    }
}

export default ApplicantInfo;