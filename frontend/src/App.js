import React, { Component } from "react";
import axios from "axios"
import './App.css';

class Matchup {
  constructor(team1, team2) {
    this.team1 = team1
    this.team2 = team2
  }
}

const matchup1 = new Matchup('USA', 'Mexico')
const matchup2 = new Matchup('Spain', 'Portugal')
const matchup3 = new Matchup('Canada', 'Honduras')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
  }

  renderMatchupRow = (matchup) => {
    return (
      <tr className="card-table-row">
        <td>{matchup.team1}</td>
        <td className="vs-cell">vs</td>
        <td>{matchup.team2}</td>
      </tr>
    )
  }

  renderCard = (groupNum, matchup1, matchup2, matchup3) => {
    return (
      <div className="group-card">
        <h2 className="group-num">Group {groupNum}</h2>
        <table className="card-table">
          <tbody>
            {this.renderMatchupRow(matchup1)}
            {this.renderMatchupRow(matchup2)}
            {this.renderMatchupRow(matchup3)}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1 id="main-header">World Cup 2018 Analytics</h1> 
        <div className="group-scroller-container">
          {this.renderCard(1, matchup1, matchup2, matchup3)}
          {this.renderCard(2, matchup1, matchup2, matchup3)}
          {this.renderCard(3, matchup1, matchup2, matchup3)}
          {this.renderCard(4, matchup1, matchup2, matchup3)}
        </div>
      </div>
    );
  }
}

export default App;
