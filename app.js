import { fetchData } from "./fetchData.js";
import { displayItems } from "./displayItems.js";



let baseURL = `https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=4328&s=2021-2022`;
const tableBody = document.querySelector('tbody');





//EVENT LISTENERS
const load = async () => {
    displayData(baseURL);
}



tableBody.addEventListener('click', (e) => {
    const selectedID = e.target.closest('tr').getAttribute('data-id');
    const teamID = e.target.closest('tr').getAttribute('id');

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










window.addEventListener('DOMContentLoaded', load);




