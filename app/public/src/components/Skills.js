import React, {Component} from 'react';
import styles from './../../client/css/skills.css';

class Skills extends Component {
    constructor() {
        super();
    }

    render() {
        var chosen = this.props.skills.map((skill, i) =>
                    {
                        return <div className={styles.chosen} key={`skill-${i}`}>{skill}</div>
                    });

        return(
            <div>
            {
                this.props.skills.length == 0 ? 
                null : 
                <div className={styles.chosenContainer}>
                    {chosen}
                </div>
            }
            </div>
        );
    }
}

export default Skills;