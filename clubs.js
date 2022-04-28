import { fetchData } from "./fetchData.js";
import { displayTeamPage } from "./displayItems.js"

let stadiumURL = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League`;

const clubsGrid = document.querySelector('.clubs-grid');

const load = async() =>{
    let stadiumData = await fetchData(stadiumURL);
    stadiumData = stadiumData.teams;
    displayTeamPage(stadiumData)
}

clubsGrid.addEventListener('click', (e) => {
    const selectedID = e.target.closest('a').getAttribute('data-id');
    const teamID = e.target.closest('a').getAttribute('id');// team name
    console.log(teamID)

    localStorage.setItem('selectedID', selectedID)
    localStorage.setItem('teamID', teamID);
    
    window.location = 'team.html';
});

window.addEventListener('DOMContentLoaded', load)