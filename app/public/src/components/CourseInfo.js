import React, { Component } from 'react';

import Applicants from './Applicants';

var utils = require('../utils.js');

var json = utils.json;

class CourseInfo extends Component {
    constructor() {
        super();
        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
            applicants: null
        }
    }

    componentDidMount() {
        fetch('/course-info?course=' + this.props.code, { method: 'GET', credentials: 'include' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                t.setState({
                    instructor: courses.instructor,
                    numberOfTAs: courses.numberoftas,
                    qualifications: courses.qualifications,
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    render() {
        const { instructor, numberOfTAs, qualifications } = this.state;

        return (
            <div className="course-info">
                <div>
                Instructor:
                </div>
                <div>
                Number of TAs:
                </div>
                <div>
                Qualifications:
                </div>
                { this.props.type == 'admin' ? <Applicants code={this.props.code}/>: null }
                <br /><br />
            </div>
        );
    }
}

export default CourseInfo;