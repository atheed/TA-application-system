import React, { Component } from 'react';

class Course extends Component {
    constructor(code, title) {
        super();
        this.instructor = null;
        this.numberOfTAs = null;
        this.qualifications = null;
        this.fullActive = null;
        this.state = {
            expanded: false
        }
    }
    render() {
        const { code, title } = this.props;
        return (
            <div class="course-info">
                <button onClick={() => this.setState({expanded: ! this.state.expanded})}>
                    Expand
                </button><br />
                {this.props.code}: {this.props.title}
            </div>
        );
    }
}

class CourseSelection extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="all-course-info">
                <course code="CSC108" title="CSC for beginners"/>
            </div>
        );
    }
}

export default CourseSelection;