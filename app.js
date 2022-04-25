import { fetchData } from "./fetchData.js";
import { fetchMenu } from "./fetchData.js";
import { displayItems, displayFixtures } from "./displayItems.js";
import { hideLoader } from "./loader.js";



let baseURL = `https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=4328&s=2021-2022`;
let fixtureURL = 'https://www.thesportsdb.com/api/v1/json/50130162/eventspastleague.php?id=4328';
const menuBtn = document.querySelector('.menu-icon');
const menu = document.querySelector('.links');
const links = document.querySelectorAll('.links li');
const clubLink = document.querySelector('#club-link');
const tableBody = document.querySelector('tbody');
const latestResultsGrid = document.querySelector('.latest-results-grid');
const teamsList = document.querySelector('.teams-list ul');



//EVENT LISTENERS


const load = async () => {
    displayData(baseURL);
    adjustFixtures(fixtureURL);
}

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    teamsList.classList.remove('active');
})

links.forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('active'))
})

clubLink.addEventListener('click', async() => {
    const data = await fetchMenu(baseURL);
    let clubs = data.table;
    
    const clubsEl = clubs.map((club) => {
      return `<li id="${club.strTeam}" data-id="${club.idTeam}"><img src="${club.strTeamBadge}"><p>${club.strTeam}</p></li>`;
    }).join('');

    teamsList.classList.toggle('active');
    teamsList.innerHTML = clubsEl;

    const menuTeams = [...document.querySelectorAll('.teams-list ul li')];
    menuTeams.forEach((team) => {
       team.addEventListener('click', () => {
        const selectedID = team.getAttribute('data-id');
        const teamID = team.getAttribute('id');// team name
        
        console.log(selectedID, teamID)
    
        localStorage.setItem('selectedID', selectedID)
        localStorage.setItem('teamID', teamID);
        
        window.location = 'team.html';
       })
    })
})


latestResultsGrid.addEventListener('click', (e) => {
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


tableBody.addEventListener('click', (e) => {
    const selectedID = e.target.closest('tr').getAttribute('data-id');
    const teamID = e.target.closest('tr').getAttribute('id');// team name

    localStorage.setItem('selectedID', selectedID)
    localStorage.setItem('teamID', teamID);
    
    window.location = 'team.html';
   
})


//FUNCTIONS
const displayData = async (url) =>{
    const data = await fetchData(url);
    const teams = data.table;
    displayItems(teams);
}

const adjustFixtures = async (url) => {
    const data = await fetchData(url);
    const fixtures = data.events;
    displayFixtures(fixtures, latestResultsGrid);
}

const matchResult = window.matchMedia("(max-width: 768px)");

function isSmallScreen(){
    if(window.matchMedia("(max-width: 768px)").matches){
        resetLetter();
    }
}

function resetLetter(){
    const winRecord = [...document.querySelectorAll('.wld')];
        winRecord.forEach((item) => {
        let itemContent = item.textContent;
        const letter = itemContent.charAt(0);

        item.textContent = letter;
    })
}

isSmallScreen();


window.addEventListener('DOMContentLoaded', load);









