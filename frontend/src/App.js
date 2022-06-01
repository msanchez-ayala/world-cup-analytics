import React, { Component } from "react";

import './App.css';
import {callApi, groupMap, getAllTeamStatistics} from './parser.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      teamsByGroup: {},
      teams: []
    }
    
  }

  // Make ALL API calls here so that all future munging is in-memory
  async componentDidMount() {

    const matches = await callApi('matches')
    const teams = await callApi('teams')
  
    this.setState({
      matches: matches, 
      teamsByGroup: groupMap(teams)
    })
  }

  renderTeamRow(groupName, teamId, stats) {
    
    // TODO get team name
    // const teamName = this.state.teamsByGroup[groupName]
    return (
      <tr>
        <td></td>
      </tr>
    )
  }

  renderCard(groupName, statsByTeamId) {
    var teamRows = []


    return (
      <div className="group-card">
        <h2 className="group-num">Group {groupName}</h2>
        <table className="card-table">
          <thead>
            <th>Country</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Points</th>
          </thead>
          <tbody>
            {teamRows}
          </tbody>
        </table>
      </div>
    )
  }

  renderCards() {
    const statsByGroup = getAllTeamStatistics(
      this.state.teamsByGroup, this.state.matches)
    const cards = []
    const groupNames = Object.keys(statsByGroup)
    groupNames.forEach(groupName => {
      cards.push(this.renderCard(groupName, statsByGroup[groupName]))
    })
    return cards
  }

  render() {
    const cards = this.renderCards()
    return (
      <div className="App">
        <h1 id="main-header">World Cup 2018 Analytics</h1> 
        <div className="group-scroller-container">
          {cards}
        </div>
      </div>
    );
  }
}

export default App;
