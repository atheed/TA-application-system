import React, { Component } from 'react';

// import Course from './Course';
import CartCourse from './CartCourse';

var utils = require('../utils.js');

var json = utils.json;

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var t = this;
        fetch('/courses-in-cart?stunum=1000831745', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const cart = data.data;
                t.setState({
                    cart: cart
                });
                console.log(cart);
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });

    }

    render() {
        return (
            <div className="cart">
                <ul>
                    {this.state.cart.map(course =>
                        <CartCourse key={course.code} 
                                code={course.code} 
                                title={course.title}
                                rank={course.rank} />
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Cart;