import React, { Component } from 'react';

import Course from './Course';

var utils = require('../utils.js');

var json = utils.json;

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

class CourseSelection extends Component {
    constructor() {
        super();
        this.state = {
            courses: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var t = this;
        fetch('/all-courses?studentnumber=1000831745', { method: 'GET', credentials: 'include'})
            .then(json)
            .then(function(data) {
                const courses = data.data;
                t.setState({
                    courses: courses
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    goToCart() {
        // window.location = '/cart';
    }

    render() {
        console.log(this.state.courses);
        console.log("Calling render");
        // console.log(this.state.courses);
        // console.log(this.state.cart.indexOf(this.state.courses[0].code));
        return (
            <div className="all-course-info">
                <h1>Course Selection</h1>
                <ul>
                    {this.state.courses.map(course =>
                        <Course key={course.code} 
                                code={course.code} 
                                title={course.title}
                                type="student"
                                inCart={course.incart} />
                        )
                    }
                </ul>
                <button onClick={this.goToCart()} className="button">
                    Go To Cart
                </button>
            </div>
        );
    }
}

export default CourseSelection;