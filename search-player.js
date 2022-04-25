import { fetchData } from "./fetchData.js";
import { hideLoader } from "./loader.js";
import { displayPlayers } from "./displayItems.js";

hideLoader();
const searchBtn = document.querySelector('.button');
const rosterGrid = document.querySelector('.roster-grid');
//const searchResultsContainer


searchBtn.addEventListener('click', async(e) => {
    const input = document.querySelector('input');
    const inputValue = input.value;
   
    let url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`;
    url = url.replace(/\s/g, '_')
    
    const data = await fetchData(url);
    const players = data.player;


    const teams = await returnTeams();
  
    
    if(players){
        const soccerPlayers = players.filter((player) => {
            return player.strSport === 'Soccer';
        })

        let playerResults = [];

        soccerPlayers.forEach((player) => {
            for(let i = 0; i < teams.length; i++){
                if(player.idTeam === teams[i]){
                    playerResults.push(player);
                }
            }
        })

        if(playerResults.length < 1){
            rosterGrid.innerHTML = `<p>No results found for ${inputValue}</p>`
        } else {
            displayPlayers(playerResults, rosterGrid);
        }

        //console.log(rosterGrid)
    } else {
        rosterGrid.innerHTML = `<p>No results found for ${inputValue}</p>`
       
    }
    hideLoader();
})


rosterGrid.addEventListener('click', (e) => {
    const playerID = e.target.closest('a').dataset.id;
    localStorage.setItem('playerID', playerID);
})

const returnTeams = async() => {
    const teamsArray = [];
    const data = await fetchData('https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League');
    const teams = data.teams;
    console.log(teams)
    teams.forEach((team) => {
        teamsArray.push(team.idTeam);
    })
    

    hideLoader();
    return teamsArray;
  
}

