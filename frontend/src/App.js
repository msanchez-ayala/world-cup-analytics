import React, { Component } from "react";
import axios from "axios"
import './App.css';

async function getTeamName(team_id) {
  try {
    const response = await axios.get('/api/teams/' + team_id);
    return response.data.name
  } catch (error) {
    console.error(error);
  }
}

async function getMatches() {
  try {
    const response = await axios.get('/api/matches');
    return response.data
  } catch (error) {
    console.error(error);
  }
}

async function getTeams() {
  try {
    const response = await axios.get('/api/teams');
    return response.data
  } catch (error) {
    console.error(error);
  }
}

function getGroup(chunk, index) {
  var matchups = []
  chunk.forEach((match) => {
    const matchup = new Matchup(match.home_team, match.away_team)
    matchups.push(matchup)
  })
  return {index: index, matchups: matchups}
}

async function getMatchups(matches) {
  const groupStMatches = matches.filter(
    match => match.comp_stage === "Group Stage");
  const matchupChunks = spliceIntoChunks(groupStMatches, 6)

  var groupMatchups = []
  await matchupChunks.forEach((chunk, index) => {
    // 1-based index
    groupMatchups.push(getGroup(chunk, index + 1))
  })
  return groupMatchups
 }

function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
  }
  return res;
}


class Matchup {
  constructor(homeTeamId, awayTeamId) {
    this.homeTeamId = homeTeamId
    this.awayTeamId = awayTeamId
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      teams: [],
      groupMatchups: [] // {index: int, matchups: list[matchups]}
    }
    
  }

  // Make ALL API calls here so that all future munging is in-memory
  async componentDidMount() {

    const matches = await getMatches()
    const groupMatchups = await getMatchups(matches)
    const teams = await getTeams()
    var teamNamesById = {}
    teams.forEach((team) => {
      teamNamesById[team.id] = team.name
    })
    this.setState({matches: matches,
                   teamNamesById: teamNamesById,
                   groupMatchups: groupMatchups})
  }

  renderMatchupRow(matchup, index) {
    const homeTeamName = this.state.teamNamesById[matchup.homeTeamId]
    const awayTeamName = this.state.teamNamesById[matchup.awayTeamId]
    const vsText = this.state.matches ? 'vs' : ''
    return (
      <tr key={index.toString()} className="card-table-row">
        <td>{homeTeamName}</td>
        <td className="vs-cell">{vsText}</td>
        <td>{awayTeamName}</td>
      </tr>
    )
  }

  renderMatchupRows(matchups) {
    const matchupRows = []
    matchups.forEach((matchup, index) => {
      const matchupRow = this.renderMatchupRow(matchup, index)
      matchupRows.push(matchupRow)
    })
    return matchupRows
  }

  renderCard(groupNum, matchups) {
    const matchupRows = this.renderMatchupRows(matchups)
    console.log('card matchup rows', matchupRows)
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
    const cards = this.state.groupMatchups.map(
      groupMatchup => this.renderCard(
        groupMatchup.index, groupMatchup.matchups));  
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
