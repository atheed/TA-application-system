import update from 'react-addons-update';
import React, { Component } from 'react';

import RankGroup from './RankGroup';

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
            }
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.refreshRankGroups = this.refreshRankGroups.bind(this);
    }


    refreshRankGroups(oldRank, newRank) {
        console.log(oldRank, newRank);
        var t = this;
        fetch('/courses-in-cart-with-rank?stunum=1000831745' + '&rank=' + oldRank, 
            { method: 'GET',
            credentials: 'include'})
            .then(json)
            .then(function(oldData) {
                const oldRankCourses = oldData.data;
                fetch('/courses-in-cart-with-rank?stunum=1000831745' + '&rank=' + newRank, 
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
        fetch('/courses-in-cart?stunum=1000831745', { method: 'GET', credentials: 'include' })
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

    render() {
        const rankings = this.state.rankings;
        // console.log(this.state.rankings);
        return (
            <div className="cart">
                <RankGroup rank={1} courses={rankings[1]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={2} courses={rankings[2]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={3} courses={rankings[3]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={4} courses={rankings[4]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={5} courses={rankings[5]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={0} courses={rankings[0]} refreshRanks={this.refreshRankGroups}/>
            </div>
        );
    }
}

export default Cart;