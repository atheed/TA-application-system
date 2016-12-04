import React, { Component } from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
var styles = require('./../../client/css/autosuggest.css');

var skillsList = require('./../skillsList.js');

export default class AutosuggestBox extends Component {
    constructor(props) {
        super(props);

        // if this is a user that we have already, stored in the db, then
        // we pass in their skills list and populate. if not, then
        // the value passed in is an empty string
        this.state = {
            value: this.props.selected,
        }

        this.updateValue = this.updateValue.bind(this);
    }

    /**
     * Upon selecting an option, we update our "value" (list of chosen options) to
     * include the chosen option also
     */
    updateValue(value) {
        this.setState({
            value: value
        });
        this.props.onSelectOption(value);
    }

    render() {
        // update qualifications list (for form submission) in parent
        this.props.onSelectOption(this.state.value);
        
        return(
            <div className="autosuggest">
            <Select 
                multi 
                simpleValue 
                //value={this.state.value} 
                value={this.state.value}
                placeholder="Enter some skills" 
                options={skillsList.skillsList} 
                onChange={this.updateValue} 
            />
            </div>
        );
    }
}