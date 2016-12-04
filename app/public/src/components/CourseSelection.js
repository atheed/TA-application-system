import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Course from './Course';
import NavBar from './NavBar';

var common = require('./../../client/css/course.css');
var common = require('./../../client/css/common.css');
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
        fetch('/all-courses', { method: 'GET', credentials: 'include' })
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
            <div>
                <NavBar activePage={2}/>
                <br />
                <div className="all-course-info">
                    <div className="profile-heading center">
                        <h1>Course Selection</h1>
                    </div>
                    <br /><br /><br />
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
                    <div className="col-md-4 text-center"> 
                    <Button color="primary" size="lg" className="center" onClick={this.goToCart()} className="button">
                        Go To Cart
                    </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseSelection;