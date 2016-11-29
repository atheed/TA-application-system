import React, { Component } from 'react';

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: '1rem',
		paddingButton: '1rem',
		alignItems: 'center',
	},
	flexItem: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 'auto',
		textAlign: 'right',
	},
	title: {
		flexBasis: '50%',
		textAlign: 'left',
	},
};

class ApplicantInfo extends Component {
	constructor() {
		super();
		this.state = {
				// studentNumber: null,
				// lastName: null,
				// firstName: null,
				// degree: null,
				// year: null,
				// rank: null,
				// experience: null,
				offers: null,
				considerations: null,
				qualifications: null,
				rankings: null,
				expanded: false,
		}
	}

	componentDidMount() {
		var t = this;
		if (this.state.expanded) {
			fetch('/applicant-info?stunum=' + this.props.studentNumber, { method: 'GET', credentials: 'include' })
					.then(json)
					.then(function(data) {
							const applicant = data.data;
							t.setState({
								// studentNumber: applicant.studentnumber,
								// lastName: applicant.lastname,
								// firstName: applicant.firstname,
								// degree: applicant.degree,
								// year: applicant.year,
								// rank: applicant.rank,
								// experience: applicant.experience,
								offers: applicant.offers,
								considerations: applicant.considerations,
								qualifications: applicant.qualifications,
								rankings: applicant.rankings,
								expanded: true,
							});
					})
					.catch(function(err) {
							// Error :(
							throw err;
					});
		}
	}

	render() {
		const { 
			applicant: {
				studentnumber, familyname, givenname, degree, year, rank, experience
			}
		} = this.props;
		const {offers, considerations, qualifications, rankings } = this.state;
		console.log(this.state);
		let basicInfo =         
			(<div
					style={styles.container}
				>
				<div>
						<button onClick={() => this.setState(
							{expanded: ! this.state.expanded})}>
												{this.state.expanded ? "Hide" : "Show"}
										</button>
				</div>
				<div
					style={Object.assign({}, styles.flexItem, styles.name)}
				>{familyname}</div>
				<div
					style={styles.flexItem}
				>{givenname}</div>
				<div
					style={styles.flexItem}
				>{degree}</div>
				<div
					style={styles.flexItem}
				>{year}</div>
				<div
					style={styles.flexItem}
				>{rank}</div>
				<div
					style={styles.flexItem}
				>{experience}</div>       
			</div>);

		if (this.state.expanded) {
			return (
				<div className="all-info">
					{basicInfo}
					<div className="more-info">
						<div>
						Offers: {offers}
						</div>
						<div>
						Considered for: {considerations}
						</div>
						<div>
						Qualifications: {qualifications}
						</div>
						<div>
						Rankings: {rankings}
						</div>
						<div>
							1st: 
							</div>
						<div>
							2nd:
							</div>
						<div>
							3rd:
							</div>
						<div>
							4th:
							</div>
						<div>
							5th:
							</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					{basicInfo}
				</div>
			);
		}
	}
}

export default ApplicantInfo;
