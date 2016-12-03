import React, { Component } from 'react';

import ApplicantInfo from './ApplicantInfo';

function json(response) {
    return response.json()
}

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
	constructor(props) {
		super();
		this.state = {
			expanded: false,
			offerStatus: props.applicant.status,
		}

		this.makeApplicantOffer = this.makeApplicantOffer.bind(this);
		this.unOffer = this.unOffer.bind(this);
		this.considerApplicantForCourse = this.considerApplicantForCourse.bind(this);
		this.unConsiderApplicantForCourse = this.unConsiderApplicantForCourse.bind(this);

	}

	makeApplicantOffer(evt) {
		evt.preventDefault();
		var t = this;

		fetch('/make-offer', { 
			method: 'POST', 
			credentials: 'include',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  stunum: this.props.applicant.studentnumber,
			  course: this.props.course,
			})			
		})
		    .then(json)
		    .then(function(data) {
		        t.setState({
		          offerStatus: 'offered',
		        });
		        t.forceUpdate();
		    })
		    .catch(function(err) {
		        // Error :(
		        throw err;
		    });

	}

	unOffer(evt) {
		evt.preventDefault();
		var t = this;

		fetch('/unoffer?stunum=' + this.props.applicant.studentnumber + '&course=' + this.props.course, { 
			method: 'DELETE', 
			credentials: 'include',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},			
		})
		    .then(json)
		    .then(function(data) {
		        t.setState({
		          offerStatus: null,
		        });
		    })
		    .catch(function(err) {
		        // Error :(
		        throw err;
		    });

	}
	considerApplicantForCourse(evt) {
		evt.preventDefault();
		var t = this;

		fetch('/consider-applicant', { 
			method: 'POST', 
			credentials: 'include',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  stunum: this.props.applicant.studentnumber,
			  course: this.props.course,
			})			
		})
		    .then(json)
		    .then(function(data) {
		        t.setState({
		          offerStatus: 'considered',
		        });
		    })
		    .catch(function(err) {
		        // Error :(
		        throw err;
		    });
	}

	unConsiderApplicantForCourse(evt) {
		evt.preventDefault();
		var t = this;

		fetch('/unconsider-applicant?stunum=' + this.props.applicant.studentnumber + '&course=' + this.props.course, { 
			method: 'DELETE', 
			credentials: 'include',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},			
		})
		    .then(json)
		    .then(function(data) {
		        t.setState({
		          offerStatus: null,
		        });
		    })
		    .catch(function(err) {
		        // Error :(
		        throw err;
		    });
	}
	render() {
		console.log(this.props);
		const { 
			applicant: {
				studentnumber, familyname, givenname, degree, year, rank, experience, status
			}
		} = this.props;
		const { offerStatus } = this.state;
		let offer, consider;

		offer = 
			<button onClick={this.makeApplicantOffer}>
				Make Offer
			</button>;
		consider = 
			<button onClick={this.considerApplicantForCourse}>
				Consider
			</button>;

		if (offerStatus === 'offered') {
			offer = 
			<button onClick={this.unOffer}>
				Un-offer
			</button>;
		} else if (offerStatus === 'considered') {
			consider = 
			<button onClick={this.unConsiderApplicantForCourse}>
				Un-consider
			</button>;
		}

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
				<div>
					{offer}
				</div>
				<div>
					{consider}
				</div>
			</div>);

		return (
			<div className="applicant-row">
				{basicInfo}
				{ this.state.expanded ? <ApplicantInfo studentNumber={studentnumber}/>: null }
			</div>
		);
	}
}

export default ApplicantRow;
