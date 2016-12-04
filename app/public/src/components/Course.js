import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import CourseInfo from './CourseInfo';
var bootstrap = require('./../../../../node_modules/bootstrap/dist/css/bootstrap.css');
var common = require('./../../client/css/common.css');

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
                    // stunum: "1000831745",
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

        fetch('/remove-course-from-cart?course=' + this.props.code, {
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
        let cart, hide;
        if (this.props.type == 'student') {
            if (this.state.inCart) {
                cart =
                    <Button outline color="danger" size="lg" className="btn-cart" onClick={this.removeFromCart}>
                        Remove From Cart
                    </Button>;
            } else {
                cart =
                    <Button outline color="primary" size="lg" className="btn-cart" onClick={this.addToCart}>
                        Add To Cart
                    </Button>;
            }
        } else {
            cart = null;
        }
        if (this.state.expanded) {
            hide =
                <Button outline color="danger" size="lg" onClick={() => this.setState({expanded: ! this.state.expanded})}>
                    {this.state.expanded ? "Hide details" : "Show details"}
                </Button>
        } else {
            hide =
                <Button outline color="primary" size="lg" onClick={() => this.setState({expanded: ! this.state.expanded})}>
                    {this.state.expanded ? "Hide details" : "Show details"}
                </Button>
        }
        let courseHeader =
            <div className="course-header">
                <span className="course-code">{this.props.code}: </span><span className="course-title">{this.props.title}</span>
                <br /><br/>
                {hide}{'  '}
                {cart}
                <br />
            </div>;

        return (
            <div className="course">
                {courseHeader}
                { this.state.expanded ? <CourseInfo code={code} type={this.props.type}/>: null }
                <br/>
            </div>
        );
    }
}

export default Course;