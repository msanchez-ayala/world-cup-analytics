import logo from './logo.svg';
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

function App() {

  const renderMatchupRow = (matchup) => {
    return (
      <tr className="card-table-row">
        <td>{matchup.team1}</td>
        <td className="vs-cell">vs</td>
        <td>{matchup.team2}</td>
      </tr>
    )
  }

  const renderCard = (groupNum, matchup1, matchup2, matchup3) => {
    return (
      <div className="group-card">
        <h2 className="group-num">Group {groupNum}</h2>
        <table className="card-table">
          <tbody>
            {renderMatchupRow(matchup1)}
            {renderMatchupRow(matchup2)}
            {renderMatchupRow(matchup3)}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="App">
      <h1 id="main-header">World Cup 2018 Analytics</h1> 
      <div className="group-scroller-container">
        {renderCard(1, matchup1, matchup2, matchup3)}
        {renderCard(2, matchup1, matchup2, matchup3)}
        {renderCard(3, matchup1, matchup2, matchup3)}
        {renderCard(4, matchup1, matchup2, matchup3)}
      </div>
    </div>
  );
}

export default App;
