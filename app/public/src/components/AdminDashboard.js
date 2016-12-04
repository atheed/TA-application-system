import React, { Component } from 'react';

import Course from './Course';

var utils = require('../utils.js');

var json = utils.json;

class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        var t = this;
        fetch('/all-courses', { method: 'GET', credentials: 'include' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                t.setState({ courses: courses });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    render() {
        return (
            <div className="admin-dashboard">
                <h1>Dashboard</h1>
                <div className="all-course-info">
                    <ul>
                        {this.state.courses.map(course =>
                            <Course key={course.code} 
                                    code={course.code} 
                                    title={course.title} 
                                    type="admin"/>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;