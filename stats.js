import { fetchData } from "./fetchData.js";
import { displayStats } from "./displayItems.js";
const fixtureID = localStorage.getItem('fixtureID');
const statsURL = `https://www.thesportsdb.com/api/v1/json/50130162/lookupeventstats.php?id=${fixtureID}`;

const fixtureImgEl = document.querySelector('.fixture-header');
const fixtureHomeEl = document.querySelector('.fixture-team1');
const scoreEl = document.querySelector('.fixture-score');
const fixtureAwayEl = document.querySelector('.fixture-team2');



const fixtureImg = localStorage.getItem('fixtureImg');
const fixtureHome = localStorage.getItem('fixtureHome');
const fixtureHomeScore = localStorage.getItem('fixtureHomeScore');
const fixtureAway = localStorage.getItem('fixtureAway');
const fixtureAwayScore = localStorage.getItem('fixtureAwayScore');


const load = async() => {
    fixtureImgEl.src = fixtureImg;
    fixtureHomeEl.textContent = fixtureHome;
    fixtureAwayEl.textContent = fixtureAway;
    scoreEl.innerHTML = `<span>${fixtureHomeScore} - ${fixtureAwayScore}</span>`;

    const data = await fetchData(statsURL);
    const results = data.eventstats;
    displayStats(results);
    
}

window.addEventListener('DOMContentLoaded', load)