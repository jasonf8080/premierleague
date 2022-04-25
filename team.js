import { fetchData } from "./fetchData.js";
import { displayFixtures, displayHeader } from "./displayItems.js";
import { displayPlayers } from "./displayItems.js";
import { hideLoader } from "./loader.js";


const selectID = localStorage.getItem('selectedID');
const teamID = localStorage.getItem('teamID');

const url = `https://www.thesportsdb.com/api/v1/json/50130162/searchplayers.php?t=${teamID}`;
const teamURL = `https://www.thesportsdb.com/api/v1/json/50130162/lookupteam.php?id=${selectID}`;
const fixtureURL = `https://www.thesportsdb.com/api/v1/json/2/eventslast.php?id=${selectID}`;


const recentResultsGrid = document.querySelector('.recent-results-container');
const rosterGrid = document.querySelector('.roster-grid');



//EVENT LISTENERS
const load = async() => {
    const headerData = await fetchData(teamURL);
    const fixtureData = await fetchData(fixtureURL)
    const playerData = await fetchData(url);


    const teams = headerData.teams;
    const fixtures = fixtureData.results;
    const players = playerData.player;
    
    displayHeader(teams)
    displayFixtures(fixtures, recentResultsGrid)
    displayPlayers(players, rosterGrid)

    hideLoader();
    
}

recentResultsGrid.addEventListener('click', (e) => {
    //e.preventDefault();
    const fixture = e.target.closest('a');
    const fixtureID = fixture.getAttribute('data-id');
    const fixtureImg = fixture.children[0].src;

    const fixtureHome = fixture.children[1].children[0].textContent;
    const fixtureHomeScore = fixture.children[1].children[1].textContent;
    
    const fixtureAway = fixture.children[2].children[0].textContent;
    const fixtureAwayScore = fixture.children[2].children[1].textContent;

 
    localStorage.setItem('fixtureID', fixtureID);
    localStorage.setItem('fixtureImg', fixtureImg);
    localStorage.setItem('fixtureHome', fixtureHome);
    localStorage.setItem('fixtureHomeScore', fixtureHomeScore);
    localStorage.setItem('fixtureAway', fixtureAway);
    localStorage.setItem('fixtureAwayScore', fixtureAwayScore);
})


rosterGrid.addEventListener('click', (e) => {
    const playerID = e.target.closest('a').dataset.id;
    localStorage.setItem('playerID', playerID);
})

//FUNCTIONS

window.addEventListener('DOMContentLoaded', load);