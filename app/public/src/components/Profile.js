import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

import AutosuggestBox from './AutosuggestBox';
import Skills from './Skills';
import styles from './../../client/css/profile.css';

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
            <div id={styles.formEntry}>
                <h1 id={styles.profileHeading}>Student Profile</h1>
                <form action="/TODO" method="post">
                    <div>
                        <label className={styles.formLabel}>Degree Status</label>
                        <br />
                        <select name="status">
                            <option value="undergrad">Undergraduate</option>
                            <option value="grad">Graduate</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className={styles.formLabel}>Work Eligibility</label>
                        <br />
                        <select name="eligibility">
                            <option value="legal">Legally Entitled</option>
                            <option value="student">Student Visa</option>
                        </select>
                    </div>
                    <p />
                    <div>
                        <label className={styles.formLabel}>Proficient in:</label>
                        <Skills skills={skillsList}/>
                        <AutosuggestBox onChoose={this.handleAutosuggestChoice}/>
                    </div>
                    <p />
                    <div>
                        <label className={styles.formLabel}>Additional Info:</label>
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