import React, { Component } from 'react';
import Filter from './Filter';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexItem: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    textAlign: 'right',
  },
  name: {
    flexBasis: '50%',
    textAlign: 'left',
  },
};

class ApplicantsHeader extends Component {
  constructor() {
      super();
  }
  
  render() {
    return (
      <div
        style={styles.container}
      >
        <div
          style={Object.assign({}, styles.flexItem, styles.name)}
        >Last Name</div>
        <div
          style={styles.flexItem}
        >
        First Name</div>
        <div
          style={styles.flexItem}
        >
          <Filter column="Degree" filter={this.props.filter} clearFilter={this.props.clearFilter}/>
        </div>
        <div
          style={styles.flexItem}
        >Year</div>
        <div
          style={styles.flexItem}
        >Rank</div>
        <div
          style={styles.flexItem}
        >Experience</div>
        <div
          style={styles.flexItem}
        >Offer</div>
        <div
          style={styles.flexItem}
        >Consider</div>
      </div>
    );
  }
}

export default ApplicantsHeader;
