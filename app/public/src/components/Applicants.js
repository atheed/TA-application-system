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
    this.filter = this.filter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.getAllApplicants = this.getAllApplicants.bind(this);
  }

  componentDidMount() {
    return this.getAllApplicants();
    // var t = this;
    // fetch('/applicants-for-course?course=' + this.props.code, { method: 'GET', credentials: 'include' })
    //     .then(json)
    //     .then(function(data) {
    //         const applicants = data.data;
    //         t.setState({
    //           applicants: applicants,
    //         });
    //     })
    //     .catch(function(err) {
    //         // Error :(
    //         throw err;
    //     });
  }

  filter(property, value) {
    var t = this;
    fetch('/filter-applicants?course=' + this.props.code + '&property=' + property + '&value=' + value, 
      { method: 'GET', credentials: 'include' })
        .then(json)
        .then(function(data) {
            const applicants = data.data;
            console.log(applicants);
            t.setState({
              applicants: applicants,
            });
        })
        .catch(function(err) {
            // Error :(
            throw err;
        });
  }

  getAllApplicants() {
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

  clearFilter() {
    return this.getAllApplicants();
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
        <ApplicantsHeader filter={this.filter} clearFilter={this.clearFilter}/>
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
