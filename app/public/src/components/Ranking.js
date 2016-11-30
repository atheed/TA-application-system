import React, {Component} from 'react';

var utils = require('../utils.js');

var json = utils.json;

class Ranking extends Component {
    constructor(props) {
        super();
        this.state = {
            rank: props.rank !== 0 ? String(props.rank) : "5",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
          rank: event.target.value
        });
        var t = this;

        fetch('/rank-course', { 
            method: 'POST', 
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              stunum: "1000831745", // TODO: 
              course: this.props.course,
              rank: event.target.value
            })          
        })
            .then(json)
            .then(function(data) {
                return;
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });   
    }

    render() {
            <form className="ranking-form">
              <input type="radio" name="rank" value="1" 
                    checked={this.state.rank === '1'}
                    onChange={this.handleChange}/>
                <label htmlFor="1">1st</label>
              <input type="radio" name="rank" value="2" 
                    checked={this.state.rank === '2'} 
                    onChange={this.handleChange}/>
                <label htmlFor="2">2nd</label>
              <input type="radio" name="rank" value="3" 
                    checked={this.state.rank === '3'} 
                    onChange={this.handleChange}/>
                <label htmlFor="3">3rd</label>
              <input type="radio" name="rank" value="4" 
                    checked={this.state.rank === '4'} 
                    onChange={this.handleChange}/>
                <label htmlFor="preferred">Preferred</label>
              <input type="radio" name="rank" value="5" 
                    checked={this.state.rank === '5'} 
                    onChange={this.handleChange}/>
                <label htmlFor="willing">Willing</label>
            </form> 
        );
    }
}

export default Ranking;