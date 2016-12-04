import React, { Component } from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

var skillsList = require('./../skillsList.js');

export default class AutosuggestBox extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
        }

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(value) {
        this.setState({
            value: value
        });
        this.props.onSelectOption(value);
    }

    render() {
        return(
            <Select 
                multi 
                simpleValue 
                value={this.state.value} 
                placeholder="Enter a skill" 
                options={skillsList.skillsList} 
                onChange={this.updateValue} 
            />
        );
    }
}