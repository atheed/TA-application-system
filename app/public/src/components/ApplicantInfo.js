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
				first: null,
				second: null,
				third: null,
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
								first: applicant.rankings[1],
								second: applicant.rankings[2],
								third: applicant.rankings[3],
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
				Qualifications: {qualifications.map((qualification, i) => {
				        if (i < qualifications.length - 1) {
				            return qualification + ", ";
				        } else {
				            return qualification;
				        }
				    })}
				</div>
				<div>
				Rankings:
				</div>
				<div>
					1st: {first}
					</div>
				<div>
					2nd: {second}
					</div>
				<div>
					3rd: {third}
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
