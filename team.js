import { fetchData } from "./fetchData.js";
import { displayHeader } from "./displayItems.js";
import { displayPlayers } from "./displayItems.js";
import { hideLoader } from "./loader.js";

const selectID = localStorage.getItem('selectedID');
const teamID = localStorage.getItem('teamID');

const url = `https://www.thesportsdb.com/api/v1/json/50130162/searchplayers.php?t=${teamID}`;
const teamURL = `https://www.thesportsdb.com/api/v1/json/50130162/lookupteam.php?id=${selectID}`;

const rosterGrid = document.querySelector('.roster-grid');



//EVENT LISTENERS
const load = async() => {
    const headerData = await fetchData(teamURL);
    console.log(headerData)
    const playerData = await fetchData(url);

    const teams = headerData.teams;
    const players = playerData.player;
    
    displayHeader(teams)
    displayPlayers(players)

    hideLoader();
    
}


rosterGrid.addEventListener('click', (e) => {
    const playerID = e.target.closest('a').dataset.id;
    localStorage.setItem('playerID', playerID);
})

//FUNCTIONS

window.addEventListener('DOMContentLoaded', load);