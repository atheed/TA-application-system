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
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>
                <Filter column="Degree" filter={this.props.filter} clearFilter={this.props.clearFilter}/>
              </th>
              <th>Year</th>
              <th>Rank</th>
              <th>Experience</th>
              <th>Offer</th>
              <th>Consider</th>
              <th>Show more details</th>
            </tr>
        );
    }
}

export default ApplicantsHeader;