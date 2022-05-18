import React, { Component } from "react";

import './App.css';
import {getChunkedGroupStageMatches, callApi, groupMap} from './parser.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      teams: []
    }
    
  }

  // Make ALL API calls here so that all future munging is in-memory
  async componentDidMount() {

    const matches = await callApi('matches')
    const teams = await callApi('teams')
    
    var teamNamesById = {}
    teams.forEach((team) => {
      teamNamesById[team.id] = team.name
    })
    this.setState({matches: matches, teamNamesById: teamNamesById})
    const teamsByGroup = groupMap(teams)
    console.log(teamsByGroup)
  }

  renderMatchupRow(matchup, index) {
    const homeTeamName = this.state.teamNamesById[matchup.home_team]
    const awayTeamName = this.state.teamNamesById[matchup.away_team]
    const vsText = this.state.matches ? 'vs' : ''
    return (
      <tr key={index.toString()} className="card-table-row">
        <td>{homeTeamName}</td>
        <td className="vs-cell">{vsText}</td>
        <td>{awayTeamName}</td>
      </tr>
    )
  }

  renderMatchupRows(matches) {
    const matchupRows = []
    matches.forEach((match, index) => {
      const matchupRow = this.renderMatchupRow(match, index)
      matchupRows.push(matchupRow)
    })
    return matchupRows
  }

  renderCard(groupNum, matches) {
    const matchupRows = this.renderMatchupRows(matches)
    return (
      <div className="group-card">
        <h2 className="group-num">Group {groupNum}</h2>
        <table className="card-table">
          <tbody>
            {matchupRows}
          </tbody>
        </table>
      </div>
    )
  }

  renderCards() {
    const chunkedGSMatches = getChunkedGroupStageMatches(this.state.matches)
    const cards = chunkedGSMatches.map(
      (matchesChunk, index) => this.renderCard(
        index + 1, matchesChunk));  
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
