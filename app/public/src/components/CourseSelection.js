import React, { Component } from 'react';

function json(response) {
    return response.json()
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

class CourseInfo extends Component {
    constructor() {
        super();
        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
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
        return (
            <div className="course-info">
                <button onClick={() => this.setState({expanded: ! this.state.expanded})}>
                            Hide
                        </button>
                {this.state.instructor}: {this.state.numberOfTAs}
                <br /><br />
            </div>);
    }
}


class Course extends Component {
    constructor() {
        super();

        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
            expanded: false,
        }
    }

    render() {

        const { code, title } = this.props;
        let courseinfo, t = this;

        courseinfo =
            <div className="course-info" />;

        if (this.state.expanded) {
            courseinfo = <CourseInfo code={code} />;
        } else {
            courseinfo =
                <div className="course-info">
                    <button onClick={() => this.setState({expanded: ! this.state.expanded})}>
                        Expand
                    </button>
                    {this.props.code}: {this.props.title}
                    <br /><br />
                </div>;
        }
        return courseinfo;
    }
}

class CourseSelection extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var t = this;
        fetch('/all-courses', { method: 'GET' })
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
            <div className="all-course-info">
                <ul>
                    {this.state.courses.map(course =>
                        <Course key={course.code} 
                                code={course.code} 
                                title={course.title} />
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default CourseSelection;