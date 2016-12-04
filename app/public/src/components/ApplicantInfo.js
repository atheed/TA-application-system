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

		}
	}

	componentDidMount() {
		var t = this;
		fetch('/applicant-info?stunum=' + this.props.studentNumber, { method: 'GET', credentials: 'include' })
				.then(json)
				.then(function(data) {
						const applicant = data.data;
						console.log(applicant);
						t.setState({
							offers: applicant.offers,
							considerations: applicant.considerations,
							qualifications: applicant.qualifications,
							rankings: {
								first: applicant.rankings[1].map((course) => { return course.code + ' (' + course.experience + ')'}),
								second: applicant.rankings[2].map((course) => { return course.code + ' (' + course.experience + ')'}),
								third: applicant.rankings[3].map((course) => { return course.code + ' (' + course.experience + ')'}),
							}
						});
				})
				.catch(function(err) {
						// Error :(
						throw err;
				});
	}

	shouldComponentUpdate() {
		return true;
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
		const { offers, considerations, qualifications, rankings : { first, second, third } } = this.state;
		return (
			<div className="applicant-info">
				<div>
				Offers: {offers}
				</div>
				<div>
				Considered for: {considerations}
				</div>
				<div>
				Qualifications: {this.displayCommaSeparated(qualifications)}
				</div>
				<div>
				Rankings:
				</div>
				<div>
					1st: {this.displayCommaSeparated(first)}
					</div>
				<div>
					2nd: {this.displayCommaSeparated(second)}
					</div>
				<div>
					3rd: {this.displayCommaSeparated(third)}
					</div>
				<div>
					4th:
					</div>
				<div>
					5th:
					</div>
			</div>
		);
	}
}

export default ApplicantInfo;
