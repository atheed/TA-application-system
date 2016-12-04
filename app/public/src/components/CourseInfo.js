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
            qualifications: [],
            applicants: null
        }
    }

    componentDidMount() {
        var t = this;
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
                <br />
                <div>
                <span className="course-info-span">Instructor:</span> {instructor}
                </div>
                <div>
                <span className="course-info-span">Number of TAs:</span> {numberOfTAs}
                </div>
                <div>
                <span className="course-info-span">Qualifications:</span>{' '}
                    {qualifications.map((qualification, i) => {
                        if (i < qualifications.length - 1) {
                            return qualification + ", ";
                        } else {
                            return qualification;
                        }
                    })}
                </div>
                { this.props.type == 'admin' ? <Applicants code={this.props.code}/>: null }
                <br />
            </div>
        );
    }
}

export default CourseInfo;