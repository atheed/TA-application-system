import React, { Component } from 'react';

import ApplicantsHeader from './ApplicantsHeader';
// import ApplicantInfo from './ApplicantInfo';

const styles = {
  container: {
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

class Applicants extends Component {
  render() {
    // const { applicants } = this.props;
    // const { applicants, updateQuantity } = this.props;

    return (
      <div
        style={styles.container}
      >
        <ApplicantHeader />
      </div>
    );
  }
}

export default Applicants;
