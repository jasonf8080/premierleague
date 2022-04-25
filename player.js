import { fetchData } from "./fetchData.js";
import { displayPlayerBio } from "./displayItems.js";
import { showLoader } from "./loader.js";

const playerID = localStorage.getItem('playerID');
const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerID}`;


const load = async () => {
    const data = await fetchData(url);
    const player = data.players;
    console.log(player)
    displayPlayerBio(player);  
}


window.addEventListener('DOMContentLoaded', load)