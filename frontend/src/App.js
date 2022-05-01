import React, { Component } from "react";
import axios from "axios"
import './App.css';


async function callApi(endpoint) {
  try {
    const response = await axios.get('/api/' + endpoint);
    return response.data
  } catch (error) {
    console.error(error);
  }
}


function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
  }
  return res;
}


// Return an array containg sub-arrays of 6 matches
function getChunkedGroupStageMatches(matches) {
  const groupStageMatches = matches.filter(
    match => match.comp_stage === "Group Stage");
  const matchupChunks = spliceIntoChunks(groupStageMatches, 6)
  return matchupChunks
 }


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
