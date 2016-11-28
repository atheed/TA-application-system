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


class Course extends Component {
    constructor() {
        super();

        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
            expanded: false,
            alreadyexpanded: false,
            finishedloading: false
        }
    }

    render() {
        const { code, title } = this.props;
        let courseinfo, t = this;

        if (this.state.expanded && !this.state.alreadyexpanded) {
            this.state.alreadyexpanded = true;
            fetch('/course-info?course=' + code, { method: 'GET', credentials: 'include' })
                .then(json)
                .then(function(data) {
                    const courses = data.data;
                    console.log(data);
                    t.setState({
                        instructor: courses.instructor,
                        numberOfTAs: courses.numberoftas,
                        qualifications: courses.qualifications,
                        finishedloading: true,
                    });
                })
                .catch(function(err) {
                    // Error :(
                    throw err;
                });

            courseinfo =
                <div className="course-info" />;
        } else if (this.state.expanded && this.state.finishedloading) {
            console.log(this.state);
            courseinfo =
                <div className="course-info">
                    <button onClick={() => this.setState({expanded: ! this.state.expanded})}>
                            Hide
                    </button>
                    {this.state.instructor}
                    {this.state.numberOfTAs}
                    {this.state.qualifications}
                </div>;
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
                console.log(t);
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
                        <Course key={course.code} code={course.code} title={course.title} />
                    )
                    }
                </ul>
            </div>
        );
    }
}

export default CourseSelection;