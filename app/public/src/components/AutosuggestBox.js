import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

const languages = ['C', 'Java', 'Perl', 'Python'];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.toLowerCase().slice(0, inputLength) === inputValue
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
            value: '',
            suggestions: []
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
            value: newValue
        });
    };


    /**
     * On each keystroke, update the list of suggestions
     */
    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };


    /**
     * Function that is responsible for behaviour upon user clicking a suggestion
     */
     onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
         this.setState({
            value: ""
        });
         console.log(suggestion);
     }


    /**
     * Function responsible for behaviour upon clearing the suggested list
     */
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
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