import React, { Component } from 'react';

import ApplicantInfo from './ApplicantInfo';

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

class ApplicantRow extends Component {
	constructor() {
		super();
		this.state = {
			expanded: false,
		}
	}
	render() {
		const { 
			applicant: {
				studentnumber, familyname, givenname, degree, year, rank, experience
			}
		} = this.props;
		const {offers, considerations, qualifications, rankings } = this.state;
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
				<div className="applicant-row">
					{basicInfo}
					<ApplicantInfo studentNumber={studentnumber}/>
				</div>
			);
		} else {
			return (
				<div className="applicant-row">
					{basicInfo}
				</div>
			);
		}
	}
}

export default ApplicantRow;
