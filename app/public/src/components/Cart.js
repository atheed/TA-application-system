import update from 'react-addons-update';
import React, { Component } from 'react';

import RankGroup from './RankGroup';
import NavBar from './NavBar';

var utils = require('../utils.js');

var json = utils.json;

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            rankings: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                0: []                
            },
            submitted: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.refreshRankGroups = this.refreshRankGroups.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.submitRankings = this.submitRankings.bind(this);
    }


    refreshRankGroups(oldRank, newRank) {
        console.log(oldRank, newRank);
        var t = this;
        fetch('/courses-in-cart-with-rank?rank=' + oldRank, 
            { method: 'GET',
            credentials: 'include'})
            .then(json)
            .then(function(oldData) {
                const oldRankCourses = oldData.data;
                fetch('/courses-in-cart-with-rank?rank=' + newRank, 
                    { method: 'GET',
                    credentials: 'include'})
                    .then(json)
                    .then(function(newData) {
                        const newRankCourses = newData.data;
                        let rankings = t.state.rankings;
                        rankings[oldRank] = oldRankCourses;
                        rankings[newRank] = newRankCourses;
                        console.log(rankings);
                        t.setState({
                            rankings: rankings
                        });
                    })
                    .catch(function(err) {
                        // Error :(
                        throw err;
                    });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });        
    }

    componentDidMount() {
        var t = this;
        fetch('/courses-in-cart', { method: 'GET', credentials: 'include' })
                .then(json)
                .then(function(data) {
                        const rankings = data.data.rankings;
                        t.setState({
                            rankings: {
                                1: rankings['1'],
                                2: rankings['2'],
                                3: rankings['3'],
                                4: rankings['4'],
                                5: rankings['5'],
                                0: rankings['0']
                            }
                        });
                })
                .catch(function(err) {
                        // Error :(
                        throw err;
                });
    }

    submitRankings() {
        var t = this;
        fetch('/submit-rankings', { 
            method: 'POST', 
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ // TODO: remove this, it's in credentials
            //   stunum: "1000831745",
            // })          
        })
            .then(json)
            .then(function(data) {
                t.setState({
                  submitted: true,
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
    }

    handleRemove(rankToRefresh) {
        console.log(rankToRefresh);
        var t = this;
        fetch('/courses-in-cart-with-rank?rank=' + rankToRefresh, 
            { method: 'GET',
            credentials: 'include'})
            .then(json)
            .then(function(data) {
                const newRankCourses = data.data;
                let rankings = t.state.rankings;
                rankings[rankToRefresh] = newRankCourses;
                console.log(rankings);
                t.setState({
                    rankings: rankings
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });         
    }
    render() {
        const rankings = this.state.rankings;
        // console.log(this.state.rankings);
        return (
            <div>
                <NavBar activePage={3}/>
                <br />
                <div className="cart">
                    <RankGroup rank={1} courses={rankings[1]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={2} courses={rankings[2]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={3} courses={rankings[3]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={4} courses={rankings[4]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={5} courses={rankings[5]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={0} courses={rankings[0]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <button onClick={this.submitRankings}>Submit Rankings</button>
                    {this.state.submitted ? "Your rankings have been submitted!" : null}
                </div>
            </div>
        );
    }
}

export default Cart;