import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

import AutosuggestBox from './AutosuggestBox';
import Skills from './Skills';

let skillsList = [];

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            suggestions: [],
            skills: []
        };

        this.handleAutosuggestChoice = this.handleAutosuggestChoice.bind(this);
    }

    handleAutosuggestChoice(newSkill) {
        skillsList.push(newSkill);
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h1>Student Profile</h1>
                <form action="/TODO" method="post">
                    <div>
                        <label>Degree Status</label>
                        <br />
                        <select name="status">
                            <option value="undergrad">Undergraduate</option>
                            <option value="grad">Graduate</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label>Work Eligibility</label>
                        <br />
                        <select name="eligibility">
                            <option value="legal">Legally Entitled</option>
                            <option value="student">Student Visa</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label>Proficient in:</label>
                        <Skills skills={skillsList}/>
                        <AutosuggestBox onChoose={this.handleAutosuggestChoice}/>
                    </div>
                    <p />
                    <div>
                        <label>Additional Info:</label>
                        <br />
                        <textarea name="additional-info"></textarea>
                        </div>
                    <p />
                    <button type="submit">Enter</button>
                </form>
            </div>          
        );
    }
}

export default Profile;