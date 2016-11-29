import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

import AutosuggestBox from './AutosuggestBox';

class Profile extends Component {
    constructor() {
        super();
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
                        <br />
                        <AutosuggestBox />
                    </div>
                    <p />
                    <button type="submit">Enter</button>
                </form>
            </div>          
        );
    }
}

export default Profile;