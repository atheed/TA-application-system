import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

var json = require('../utils.js').json;

export default class NavBar extends Component {
    constructor() {
        super();
        this.state = { studentnumber: '', type: '' };

        var t = this;
        fetch('/authenticate', { method: 'GET', credentials: 'include' })
            .then(json)
            .then(function(data) {
                console.log(data);
                if (data.success && data.user.type == "student") {
                    t.setState({ studentnumber: data.user.studentnumber, type: data.user.type });
                } else {
                    window.location.replace('/');
                }

            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    render() {

        var activeLinkStyle = {
            backgroundColor: '#0375d8',
            color: '#fff',
        };

        var navLinkStyle = {
            paddingRight: '10%',
        }

        var navBarStyle = {
            margin: '0 auto',
            paddingLeft: '10%',
            textAlign: 'center',
        };

        var userStyle = {
            marginTop: "-7%",
            cursor: 'default',
            backgroundColor: '#fff',
            color: '#337ab7',
        }

        return (
            <div>
                <Nav pills style={navBarStyle}>
                    <NavItem style={navLinkStyle}>
                        <NavLink href="#" style={userStyle}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Logged in as&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            {this.state.type}<br />
                            {this.state.studentnumber}
                        </NavLink>
                    </NavItem>
                    <NavItem style={navLinkStyle}>
                        <NavLink href="/#/profile" style={this.props.activePage == 1 ? activeLinkStyle : null}>Profile</NavLink>
                    </NavItem>
                    <NavItem style={navLinkStyle}>
                        <NavLink href="/#/courseselection" style={this.props.activePage == 2 ? activeLinkStyle : null}>Course Selection</NavLink>
                    </NavItem>
                    <NavItem style={navLinkStyle}>
                        <NavLink href="/#/cart" style={this.props.activePage == 3 ? activeLinkStyle : null}>Course Cart</NavLink>
                    </NavItem>
                    <NavItem style={navLinkStyle}>
                        <NavLink href="/logout">Logout</NavLink>
                    </NavItem>
                </Nav>
                 <div className="navbar-border"></div>
            </div>
        );
    }
}