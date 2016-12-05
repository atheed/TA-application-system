import React, { Component } from 'react';

// import CartCourse from './CartCourse';
import Course from './Course';
import Ranking from './Ranking';
import Experience from './Experience';

var utils = require('../utils.js');

var json = utils.json;

class RankGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            rank: props.rank,
            courses: [],
        };
        this.handleRemoveHelp = this.handleRemoveHelp.bind(this);
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
    handleRemoveHelp() {
        console.log("handleRemoveHelp");
        console.log(this.props.rank);
        this.props.handleRemove(this.props.rank);
    }
    render() {
        console.log("Render rank group");
        return (
            <div>
                <h2>{this.props.rank === 0 ? "Unranked" : "Rank " + this.props.rank}</h2>
                <hr/>
                <ul>
                    {this.props.courses.map(course =>
                        <div key={course.code} className="cart-course">
                            <Course 
                                    code={course.code} 
                                    title={course.title}
                                    type="student"
                                    inCart={true}
                                    handleRemove={this.handleRemoveHelp} />
                                    
                            <Ranking 
                                    course={course.code} 
                                    rank={this.state.rank} 
                                    refreshRanks={this.props.refreshRanks}/>
                            <Experience 
                                    course={course.code}
                                    experience={course.experience} />

                        </div>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default RankGroup;