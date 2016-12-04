import React, {Component} from 'react';

var utils = require('../utils.js');

var json = utils.json;

class Filter extends Component {
    constructor(props) {
        super();
        this.state = {
            dropdownVisible: false,
            filtered: false,
            filteredValue: "",
        }
        // this.handleChange = this.handleChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.filterBy = this.filterBy.bind(this);
        this.clear = this.clear.bind(this);
    }

    filterBy(event) {
        var value = event.target.text;
        console.log(value);
        var dropdownVisible = this.state.dropdownVisible;
        this.props.filter(this.props.column, value);
        this.setState({
            dropdownVisible: !dropdownVisible,
            filtered: true,
            filteredValue: value
        });
    }

    toggleDropdown() {
        var dropdownVisible = this.state.dropdownVisible;
        this.setState({
            dropdownVisible: !dropdownVisible
        });
    }
    clear() {
        var value = event.target.text;
        console.log(value);
        var dropdownVisible = this.state.dropdownVisible;
        this.props.clearFilter();
        this.setState({
            dropdownVisible: !dropdownVisible,
            filtered: false,
            filteredValue: ""
        });        
    }
    render() {

        let dropdown = 
        <div id="myDropdown" className="dropdown-content">
          {this.state.filtered ? <a onClick={this.clear}>Clear</a> : null}
          <a onClick={this.filterBy}>Undergrad</a>
          <a onClick={this.filterBy}>Grad</a>
        </div>
        return (
            <div className="filter">
                <button onClick={this.toggleDropdown} className="dropbtn">
                    {this.state.filtered ? this.props.column + ':' + this.state.filteredValue : this.props.column}
                </button>
              {this.state.dropdownVisible ? dropdown : null}
            </div>
        );
    }
}

export default Filter;