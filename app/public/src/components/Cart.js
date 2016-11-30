import React, { Component } from 'react';

import RankGroup from './RankGroup';

var utils = require('../utils.js');

var json = utils.json;

class Cart extends Component {
    constructor() {
        super();
        this.state = {
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    // componentDidMount() {
    //     var t = this;
    //     fetch('/courses-in-cart?stunum=1000831745', { method: 'GET' })
    //         .then(json)
    //         .then(function(data) {
    //             const cart = data.data;
    //             t.setState({
    //                 cart: cart
    //             });
    //             console.log(cart);
    //         })
    //         .catch(function(err) {
    //             // Error :(
    //             throw err;
    //         });

    // }

    render() {
        return (
            <div className="cart">
            <RankGroup rank={1} />
            <RankGroup rank={2} />
            <RankGroup rank={3} />
            <RankGroup rank={4} />
            <RankGroup rank={5} />
            <RankGroup rank={0} />
            </div>
        );
    }
}

export default Cart;