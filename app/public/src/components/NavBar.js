import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

export default class NavBar extends Component {
    constructor() {
        super();
    }

    render() {

        var activeLinkStyle = {
            backgroundColor: '#0375d8',
            color: '#fff',
        };

        var navLinkStyle = {
            marginRight: '10%',
        }

        var navBarStyle = {
            margin: '0 auto',
            marginLeft: '10%',
            textAlign: 'center'
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
                        <NavLink href="#" style={userStyle}>Logged in as: <br />XXXXXXXXXX</NavLink>
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
            </div>
        );
    }
}