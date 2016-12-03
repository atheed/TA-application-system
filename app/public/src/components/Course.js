import React, { Component } from 'react';
import CourseInfo from './CourseInfo';

var utils = require('../utils.js');

var json = utils.json;

class Course extends Component {
    constructor(props) {
        super();

        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
            expanded: false,
            inCart: props.inCart,
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }


    addToCart(evt) {
        evt.preventDefault();
        var t = this;

        fetch('/add-course-to-cart', { 
            method: 'POST', 
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              stunum: "1000831745",
              course: this.props.code,
            })          
        })
            .then(json)
            .then(function(data) {
                t.setState({
                  inCart: true,
                });
                t.forceUpdate();
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    removeFromCart(evt) {
        evt.preventDefault();
        var t = this;

        fetch('/remove-course-from-cart?stunum=' + "1000831745" + '&course=' + this.props.code, { 
            method: 'DELETE', 
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },          
        })
            .then(json)
            .then(function(data) {
                t.setState({
                  inCart: false,
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });

    }
    render() {

        const { code, title } = this.props;
        let cart;
        if (this.props.type == 'student') {
            if (this.state.inCart) {
                cart = 
                <button onClick={this.removeFromCart}>
                    Remove From Cart
                </button>;
            } else {
                cart = 
                <button onClick={this.addToCart}>
                    Add To Cart
                </button>;                   
            }
        } else {
            cart = null;
        }
        let courseHeader =
            <div className="course-header">
                {cart}
                <button onClick={() => this.setState({expanded: ! this.state.expanded})}>
                    {this.state.expanded ? "Hide" : "Show"}
                </button>
                {this.props.code}: {this.props.title}
                <br /><br />
            </div>;

        return (
            <div className="course">
                {courseHeader}
                { this.state.expanded ? <CourseInfo code={code} type={this.props.type}/>: null }
            </div>
        );
    }
}

export default Course;