import React, { Component } from "react";

import './App.css';
import {getChunkedGroupStageMatches, callApi, groupMap} from './parser.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      teamsByGroup: {}
    }
    
  }

  // Make ALL API calls here so that all future munging is in-memory
  async componentDidMount() {

    const matches = await callApi('matches')
    const teams = await callApi('teams')
  
    this.setState({matches: matches, teamsByGroup: groupMap(teams)})
    console.log(this.teamsByGroup)
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
