import React, {Component} from 'react';

var utils = require('../utils.js');

var json = utils.json;

class Ranking extends Component {
    constructor(props) {
        super();
        this.state = {
            rank: String(props.rank),
            // rank: props.rank !== 0 ? String(props.rank) : "5",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let oldRank = this.state.rank;
        let newRank = event.target.value;
        this.setState({
          rank: newRank
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
              rank: newRank
            })          
        })
            .then(json)
            .then(function(data) {
                t.props.refreshRanks(oldRank, newRank);
                return;
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    render() {
        return (
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