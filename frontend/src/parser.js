import axios from "axios"

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

export {getChunkedGroupStageMatches, callApi, groupMap}