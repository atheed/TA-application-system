import React, { Component } from 'react';

import ApplicantsHeader from './ApplicantsHeader';
import ApplicantRow from './ApplicantRow';

const styles = {
  container: {
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

function json(response) {
    return response.json()
}

class Applicants extends Component {
  constructor() {
    super();
    this.state = {
      applicants: []
    }
  }

  componentDidMount() {
    var t = this;
    fetch('/applicants-for-course?course=' + this.props.code, { method: 'GET', credentials: 'include' })
        .then(json)
        .then(function(data) {
            const applicants = data.data;
            t.setState({
              applicants: applicants,
            });
        })
        .catch(function(err) {
            // Error :(
            throw err;
        });
  }

  render() {

    const applicants = this.state.applicants;
    // const course = "CSC108";
    const course = this.props.code;
    return (
      <div
        style={styles.container}
      >
        <h1>Applicants</h1>
        <ApplicantsHeader />
        {
          Object.values(applicants).map((applicant, i) => {
            return (
              <ApplicantRow
                key={`applicant-${i}`}
                applicant={applicant}
                course={course}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Applicants;
