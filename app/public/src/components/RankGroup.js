import React, { Component } from 'react';

import CartCourse from './CartCourse';

var utils = require('../utils.js');

var json = utils.json;

class RankGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            rank: props.rank,
            courses: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var t = this;
        fetch('/courses-in-cart-with-rank?stunum=1000831745' + '&rank=' + this.props.rank, { method: 'GET' })
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
    render() {
        return (
            <div>
                <h2>{this.props.rank === 0 ? "Unranked" : this.props.rank}</h2>
                <hr/>
                <ul>
                    {this.state.courses.map(course =>
                        <CartCourse key={course.code} 
                                code={course.code} 
                                title={course.title}
                                rank={this.props.rank} />
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default RankGroup;