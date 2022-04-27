import { hideLoader } from "./loader.js";
import { fetchData } from "./fetchData.js";
import { newsArticles } from "./news.js";

const tableBody = document.querySelector('tbody');
const teamName = document.querySelector('.team-name-section');
const latestResultsGrid = document.querySelector('.latest-results-grid');

const playerBioSection = document.querySelector('.player-bio');
const statsContainer = document.querySelector('.fixture-stats-container');


//HOME PAGE

export const displayNews = (newsArticles) => {
    const articles = newsArticles.map((article) => {
        return `<div class="news-item">
        <img src="${article.image}" alt="">
        <div class="news-content">
            <span class="type">${article.subject}</span>
            <h4>${article.heading}</h4>
        </div>
    </div>`
    }).join('');

    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = articles;
}



//Display Table
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
        <td class="gf">${GF}</td>
        <td class="ga">${GA}</td>
        <td>${GD}</td>
        <td>${points}</td>
    </tr>`
    }).join('');

    tableBody.innerHTML = rankings;
    hideLoader();
}

//TEAM PAGE

//Display Team Header
export const displayHeader = (data) => {
    const headerInfo = data.map((team) => {
       const {strStadiumThumb:stadiumImage, strTeam:teamName, strTeamBadge:logo, strStadium:stadium, strStadiumLocation:location, strCountry:country} = team;
       return `<img src="${logo}" alt="" class="club-logo2">
       <h1 class="club-name">${teamName}</h1>`
    }).join('');
    teamName.innerHTML = headerInfo;
}

//Display Recent Fixtures
export const displayFixtures = (data, section) => {
   const fixtureList = data.map((fixture) => {
    const { idEvent:id, strThumb:image, strHomeTeam:home, intHomeScore:homeScore, strAwayTeam:away, intAwayScore:awayScore} = fixture;
    return `<a href="stats.html" class="latest-result" data-id="${id}">
    <img src="${image}" alt="">
    <div class="team-1">
        <p class="team-name">${home}</p>
        <p class="team-score">${homeScore}</p>
    </div>

    <div class="team-2">
        <p class="team-name">${away}</p>
        <p class="team-score">${awayScore}</p>
    </div>
    </a>`
    }).join('');

   
    section.innerHTML = fixtureList;
}


//Display Roster
export const displayPlayers = (data, section) => {
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
    
     section.innerHTML = players;
     hideLoader();
}






//PLAYER BIO PAGE

//Display Player Info
export const displayPlayerBio = (data) => {
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
    hideLoader();
}




//STATS PAGE

//Display Game Stats
export const displayStats = (data) => {
   const stats = data.map((stat) => {
       const {strStat, intHome, intAway} = stat;
       return `<div class="fixture-stat">
       <p class="stat-home">${intHome}</p>
       <p class="stat-name">${strStat}</p>
       <p class="stat-away">${intAway}</p>
   </div>
`
   }).join('');
    

   statsContainer.innerHTML = stats;
    hideLoader();
}


export const displayTeamPage = (stadiums) => {
   const teamEl = stadiums.map((team) => {
        const {strTeam: teamName, strTeamBadge:badge, strStadium:stadiumName, strStadiumThumb:stadiumImage} = team;
        return `<a href="team.html" class="club-item" id="${teamName}" data-id="${team.idTeam}">
        <img class="stadium-img" src="${stadiumImage}" alt="">
            <img class="badge-img" src="${badge}" alt="">
        <div class="club-item-content">
            <h4>${teamName}</h4>
            <p class="stadium-location">${stadiumName}</p>
        </div>
    </a>`
   }).join('');

   const clubsGrid = document.querySelector('.clubs-grid');
   clubsGrid.innerHTML = teamEl;

    hideLoader();
}
