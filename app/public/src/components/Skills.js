import React, {Component} from 'react';

class Skills extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
            {
                this.props.skills.length == 0 ? 
                    null : 
                    <ul>
                        {
                            this.props.skills.map((skill, i) =>
                                <li key={`skill-${i}`}>{skill}</li>)
                        }
                    </ul>
            }
            </div>
        );
    }
}

export default Skills;