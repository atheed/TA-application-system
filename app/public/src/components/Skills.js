import React, { Component } from 'react';
var styles = require('./../../client/css/skills.css');

class Skills extends Component {
    constructor() {
        super();
    }

    removeChoice(i, skill) {
        var choice = document.getElementById(`skill-${i}`);
        choice.remove();

        this.props.removeHandler(skill);
    }

    render() {
        var chosen = this.props.skills.map((skill, i) => {
            return (
                <div className="choice" key={i} id={`skill-${i}`}>
                    <div className="removeChoice" key={`close-${i}`} onClick={this.removeChoice.bind(this, i, skill)}>x</div>
                    <div className="chosen" key={`skill-${i}`}>
                        {skill}
                    </div>
                </div>
                );
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