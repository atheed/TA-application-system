import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

var skillsList = require('./../skillsList.js');

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : skillsList.skillsList.filter(skill =>
        skill.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

class AutosuggestBox extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            suggestions: [],
            chosen: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }


    /**
     * Function responsible for updating text after each keystroke on autosuggest box
     */
    onChange(event, { newValue }) {
        this.setState({
            value: newValue,
            chosen: this.state.chosen
        });
    };


    /**
     * On each keystroke, update the list of suggestions
     */
    onSuggestionsFetchRequested({ value }) {
        // remove from autosuggest dropdown list all elements that have already been chosen
        var currentSuggestions = getSuggestions(value);
        for(var i = 0; i < this.state.chosen.length; i++) {
            var chosenIndex = currentSuggestions.indexOf(this.state.chosen[i]);
            if (chosenIndex >= 0) {
                // if element already chosen, remove it from suggestions
                currentSuggestions.splice(chosenIndex, 1);
            }
        }

        this.setState({
            suggestions: currentSuggestions,
            chosen: this.state.chosen
        });
    };


    /**
     * Function that is responsible for behaviour upon user clicking a suggestion
     */
    onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
        this.setState({
            value: "",
            chosen: this.state.chosen.push(suggestion)
        });
        this.props.onChoose(suggestion);
    }


    /**
     * Function responsible for behaviour upon clearing the suggested list
     */
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
            chosen: this.state.chosen
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // props to be sent to Autosuggest
        const inputProps = {
            placeholder: 'Type a proficiency',
            value,
            onChange: this.onChange
        };

        return(
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default AutosuggestBox;