import React, { Component } from 'react';

// import CartCourse from './CartCourse';
import Course from './Course';
import Ranking from './Ranking';

var utils = require('../utils.js');

var json = utils.json;

class RankGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            rank: props.rank,
            courses: [],
        };
    }

    // componentDidMount() {
    //     var t = this;
    //     fetch('/courses-in-cart-with-rank?stunum=1000831745' + '&rank=' + this.props.rank, { method: 'GET' })
    //         .then(json)
    //         .then(function(data) {
    //             const courses = data.data;
    //             t.setState({
    //                 courses: courses
    //             });
    //         })
    //         .catch(function(err) {
    //             // Error :(
    //             throw err;
    //         });

    // }

    render() {
        console.log("Render rank group");
        return (
            <div>
                <h2>{this.props.rank === 0 ? "Unranked" : this.props.rank}</h2>
                <hr/>
                <ul>
                    {this.props.courses.map(course =>
                        <div key={course.code} className="cart-course">
                            <Ranking 
                                    course={course.code} 
                                    rank={this.state.rank} 
                                    refreshRanks={this.props.refreshRanks}/>
                            <Course 
                                    code={course.code} 
                                    title={course.title}
                                    type="student"
                                    inCart={true} />
                        </div>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default RankGroup;