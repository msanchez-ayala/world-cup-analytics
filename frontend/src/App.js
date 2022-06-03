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
    
    var teamNamesByTeamId = {}
    teams.forEach(team => {
      teamNamesByTeamId[team.id] = team.name
    })

    this.setState({
      matches: matches, 
      teamsByGroup: groupMap(teams),
      teamNamesByTeamId: teamNamesByTeamId
    })
    // console.log('teams', teams)
  }

  renderTeamRow(teamId, statsByTeamId) {
    
    const teamName = this.state.teamNamesByTeamId[teamId]
    const teamStats = statsByTeamId[teamId]
    return (
      <tr key={teamId}>
        <td className="country-cell">{teamName}</td>
        <td className="stats-cell">{teamStats.wins}</td>
        <td className="stats-cell">{teamStats.losses}</td>
        <td className="stats-cell">{teamStats.draws}</td>
        <td className="stats-cell">{teamStats.points}</td>
      </tr>
    )
  }

  renderCard(groupName, statsByTeamId, idx) {
    var teamRows = []
    // console.log('statsByTeamId', statsByTeamId)
    const teamIds = Object.keys(statsByTeamId)
    teamIds.forEach(teamId => {
      teamId = parseInt(teamId)
      teamRows.push(this.renderTeamRow(teamId, statsByTeamId))
    })


    return (
      <div className="group-card" key={idx}>
        <h2 className="group-num">Group {groupName}</h2>
        <table className="card-table">
          <thead>
            <tr>
              <th className="country-cell">Country</th>
              <th className="stats-cell">W</th>
              <th className="stats-cell">L</th>
              <th className="stats-cell">D</th>
              <th className="stats-cell">P</th>
            </tr>
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
    groupNames.forEach((groupName, idx) => {
      cards.push(this.renderCard(groupName, statsByGroup[groupName], idx))
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
