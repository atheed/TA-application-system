import React, { Component } from 'react';

import Course from './Course';
import Ranking from './Ranking';

var utils = require('../utils.js');

var json = utils.json;

class CartCourse extends Component {
    constructor() {
        super();
        this.state = {
            cart: []
        };
    }

    render() {
        return (
            <div>
                <Ranking course={this.props.code} 
                        rank={this.props.rank} />
                <Course code={this.props.code} 
                        title={this.props.title}
                        type="student"
                        inCart={true} />
            </div>
        );
    }
}

export default CartCourse;