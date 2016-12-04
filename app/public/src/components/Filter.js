import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

var utils = require('../utils.js');

var json = utils.json;

class Filter extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
            filtered: false,
            filteredValue: "",
        }
        // this.handleChange = this.handleChange.bind(this);
        this.filterBy = this.filterBy.bind(this);
        this.clear = this.clear.bind(this);
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	filterBy(event) {
		console.log(event.target);
	    var value = event.target.value;
	    console.log(value);
	    var dropdownVisible = this.state.dropdownVisible;
	    this.props.filter(this.props.column, value);
	    this.setState({
	        dropdownOpen: !this.state.dropdownOpen,
	        filtered: true,
	        filteredValue: value
	    });
	}

	clear() {
		console.log(event.target);
	    var value = event.target.value;
	    console.log(value);
	    var dropdownVisible = this.state.dropdownVisible;
	    this.props.clearFilter();
	    this.setState({
	        dropdownOpen: !this.state.dropdownOpen,
	        filtered: false,
	        filteredValue: ""
	    });        
	}
	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle>
					{this.state.filtered ? this.props.column + ':' + this.state.filteredValue : this.props.column}
				</DropdownToggle>
				<DropdownMenu>
				    {this.state.filtered ? <DropdownItem onClick={this.clear}>Clear</DropdownItem> : null}
					<DropdownItem value="Undergrad" onClick={this.filterBy}>Undergrad</DropdownItem>
					<DropdownItem value="Grad" onClick={this.filterBy}>Grad</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
}
export default Filter;