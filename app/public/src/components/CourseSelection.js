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
            cart: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var t = this;
        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                fetch('/courses-in-cart?stunum=1000831745', { method: 'GET' })
                    .then(json)
                    .then(function(data) {
                        const cart = data.data;
                        t.setState({
                            cart: cart.map(course => {
                                    return course.code;
                                }
                            ),
                            courses: courses
                            // cart: courses
                        });
                    })
                    .catch(function(err) {
                        // Error :(
                        throw err;
                    });
                // t.setState({ courses: courses });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    render() {
        console.log(this.state.cart);
        console.log("Calling render");
        // console.log(this.state.courses);
        // console.log(this.state.cart.indexOf(this.state.courses[0].code));
        return (
            <div className="all-course-info">
                <ul>
                    {this.state.courses.map(course =>
                        <Course key={course.code} 
                                code={course.code} 
                                title={course.title}
                                type="student"
                                inCart={this.state.cart.indexOf(course.code) !== -1} />
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default CourseSelection;