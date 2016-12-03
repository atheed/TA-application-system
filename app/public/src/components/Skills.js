import React, { Component } from 'react';
var styles = require('./../../client/css/skills.css');

class Skills extends Component {
    constructor() {
        super();
    }

    render() {
        var chosen = this.props.skills.map((skill, i) => {
            return <div className="chosen" key={`skill-${i}`}>{skill}</div>
        });

        return (
            <div>
            {
                this.props.skills.length == 0 ? 
                null : 
                <div className="chosenContainer">
                    {chosen}
                </div>
            }
            </div>
        );
    }
}

export default Skills;