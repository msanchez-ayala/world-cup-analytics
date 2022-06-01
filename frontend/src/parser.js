import axios from "axios"

async function callApi(endpoint) {
    try {
      const response = await axios.get('/api/' + endpoint);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }
  

// Return all teams by group name
function groupMap(teams) {
  var teamsByGroup = {}
  teams.forEach(team => {
    const group = team.group.slice(-1)
    if (!teamsByGroup.hasOwnProperty(group)) {
      teamsByGroup[group] = [team]
    }

    else {
      teamsByGroup[group].push(team)
    }
    
  });
  return teamsByGroup
}


// For each group, get teamIds
//     FOr each match in Matches, filter on comp_stage= "group stage" AND home team id in teamIds


// Return each team name from a given group
function getAllTeamStatistics(groups, matches) {
  const groupNames = Object.keys(groups)
  var statsByGroup = {}
  groupNames.forEach(groupName => {
    var teamIds = []
    const teams = groups[groupName]
    teams.forEach(team => {
      teamIds.push(team.id)
    })
    const groupStageMatches = getGroupStageMatches(teamIds, matches)
    const statsByTeamId = tallyStatistics(teamIds, groupStageMatches)
    statsByGroup[groupName] = statsByTeamId
  })
  return statsByGroup
}


// Return all group stage matches that have teams from teamIds
function getGroupStageMatches(teamIds, allMatches) {
  var groupMatches = []
  allMatches.forEach(match => {
    if (teamIds.includes(match.home_team)) {
      groupMatches.push(match)
    }
  })
  return groupMatches
}

function tallyStatistics(teamIds, groupStageMatches) {
  var statsByTeamId = {}
  teamIds.forEach(teamId => {
    statsByTeamId[teamId] = {
      'wins': 0, 
      'losses': 0,
      'draws': 0,
      'points': 0
    }
  })

  groupStageMatches.forEach(match => {
    const homeStats = statsByTeamId[match.home_team]
    const awayStats = statsByTeamId[match.away_team]
    if (match.home_score > match.away_score) {
      homeStats.wins += 1
      homeStats.points += 3
      awayStats.losses += 1
    } else if (match.home_score < match.away_score) {
      awayStats.wins += 1
      awayStats.points += 3
      homeStats.losses += 1
    } else {
      awayStats.draws += 1
      homeStats.draws += 1
      awayStats.points += 1
      homeStats.points += 1
    }
  })
  return statsByTeamId

}

// For each match we have to create a table structure containing
// - wins
// - losses
// - draws
// - total points

// 


export {callApi, groupMap, getAllTeamStatistics}