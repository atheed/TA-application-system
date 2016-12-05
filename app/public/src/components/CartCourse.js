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
                <Course code={this.props.code} 
                        title={this.props.title}
                        type="student"
                        inCart={true} />
                        
                <Ranking course={this.props.code} 
                        rank={this.props.rank} />
            </div>
        );
    }
}

export default CartCourse;