import { hideLoader } from "./loader.js";

const tableBody = document.querySelector('tbody');
const rosterGrid = document.querySelector('.roster-grid');
const headerSection = document.querySelector('.team-header');
const playerBioSection = document.querySelector('.player-bio');



export const displayItems = (data) => {
    const rankings = data.map((team) => {
        const {idTeam:id, intRank:position, strTeamBadge:badge, strTeam:club, intPlayed: played, 
        intWin:wins, intDraw:draws, intLoss:losses, 
        intGoalsFor:GF, intGoalsAgainst:GA, intGoalDifference:GD, intPoints:points } = team;

        return `<tr class="table-item" id="${club}" data-id="${id}">
        <td>${position}</td>
        <td class="club" data-id="${id}">
            <img src="${badge}">
            <p>${club}</p>
        </td>
        <td>${played}</td>
        <td>${wins}</td>
        <td>${draws}</td>
        <td>${losses}</td>
        <td>${GF}</td>
        <td>${GA}</td>
        <td>${GD}</td>
        <td>${points}</td>
    </tr>`
    }).join('');

    tableBody.innerHTML = rankings;
    hideLoader();
}

export const displayHeader = (data) => {
    const headerInfo = data.map((team) => {
       const {strStadiumThumb:stadiumImage, strTeam:teamName, strTeamBadge:logo, strStadium:stadium, strStadiumLocation:location, strCountry:country} = team;
       return `<img src="${logo}" alt="" class="club-logo">
       <img src="${stadiumImage}" alt="" class="header-bg">
       <div class="header-content">
           <h1 class="club-name">${teamName}</h1>
           <p class="club-location">${stadium}, ${location}, ${country}</p>
       </div>`
    }).join('');
    headerSection.innerHTML = headerInfo;
    
}

export const displayPlayers = (data) => {
     const players = data.map((player) => {
         const {idPlayer:id, strPlayer:playerName, strNationality:nation, strNumber:number, strCutout:image} = player;
         if(image){
            return `<a href="player.html" class="roster-item" data-id="${id}">
         <h3 class="number">${number}</h3>
         <h4 class="name">${playerName}</h4>
         <p class="nation">${nation}</p>
         <img src="${image}" alt="none">
     </a href="player.html">`
     }}).join('');
    
     rosterGrid.innerHTML = players;
     hideLoader();
    
}

export const displayPlayerBio = (data) => {
    const description = document.querySelector('.desc');

      const playerBio = data.map((player) => {
        const {strNumber:number, strPlayer:playerName, strThumb:image, strNationality:nation, strBirthLocation:birthplace, 
            strHeight:height, strWeight:weight, strPosition:position, strTeam:team, strDescriptionEN:desc} = player;

            
         
            return `<div class="player-header">
                <div class="name-number">
                    <p class="player-number">${number}</p>
                    <h1 class="player-name">${playerName}</h1>
                </div>
               <img src="" alt="" class="player-logo">
            </div>
    
            <div class="player-grid">
                <img src="${image}" alt="" class="player-img">
    
                <table class="stats-table">
                    <tr>
                        <td>Nationality</td>
                        <td id="nationality">${nation}</td>
                    </tr>
                    <tr>
                        <td>Birthplace</td>
                        <td id="birthplace">${birthplace}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td id="height">${height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td id="weight">${weight}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td id="position">${position}</td>
                    </tr>
                
                    <tr>
                        <td>Team</td>
                        <td id="team">${team}</td>
                    </tr>
                </table>
            </div>`
      }).join('');


        
    playerBioSection.innerHTML = playerBio;
    //description.textContent = desc;

    hideLoader();
}