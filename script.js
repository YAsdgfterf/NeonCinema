// Game functionality
function openGame(name, url) {
  const newWindow = window.open("about:blank", "_blank");
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>${name}</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            embed { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <embed src="${url}" style="width: 100vw; height: 100vh;">
        </body>
      </html>
    `);
  }
}

// Favorites functionality
const FAVORITES_KEY = 'favoriteGames';
const GAMES = [
  { name: "Retro Bowl", url: "https://retrobowl.global.ssl.fastly.net/" },
  { name: "1v1.LOL", url: "https://1v1.lol" },
  { name: "Slope", url: "https://arawn.co.uk/other/games/gamehub/slope" },
  { name: "Subway Surfers", url: "https://breakium.com/data/g/subway-surfers/" },
  { name: "Basketball Stars", url: "https://breakium.com/data/g/basketball-stars/" },
  { name: "Thirty Dollar Website", url: "https://breakium.com/data/g/thirty-dollar-website/" },
  { name: "Twitch Tetris", url: "https://breakium.com/data/g/twitch-tetris/" },
  { name: "Basket Random", url: "https://arawn.co.uk/other/games/gamehub/basketrandom/" },
  { name: "Moto X3M", url: "https://arawn.co.uk/other/games/gamehub/motox3m2/" },
  { name: "Bit Life", url: "https://arawn.co.uk/other/games/gamehub/bitlife" },
  { name: "Tunnel Rush", url: "https://arawn.co.uk/other/games/gamehub/tunnelrush/" },
  { name: "Just Fall", url: "https://breakium.com/data/g/just-fall/" },
  { name: "Rooftop Snipers", url: "https://breakium.com/data/g/rooftop-snipers/" },
  { name: "Cookie Clicker", url: "https://arawn.co.uk/other/games/gamehub/cookieclicker" },
  { name: "2048", url: "https://arawn.co.uk/other/games/gamehub/2048" },
  { name: "Snow Rider 3D", url: "https://arawn.co.uk/other/games/gamehub/snowrider3d/" },
  { name: "Minecraft", url: "https://villade.anythingthat.works/1.8.8/" },
  { name: "Soccer Random", url: "https://breakium.com/data/g/soccer-random/" },
  { name: "Windows 11 Simulator", url: "https://breakium.com/data/g/windows-11/" },
  { name: "Among Us", url: "https://breakium.com/data/g/among-us/" },
  { name: "Paper.io 2", url: "https://paperio.site" },
  { name: "Flappy Bird", url: "https://breakium.com/data/g/flappy-bird/" },
  { name: "Krunker Io", url: "https://krunker.io/" },
  { name: "Geometry Dash", url: "https://geometrydash-lite.io/" },
  { name: "Run 3", url: "https://breakium.com/data/g/run-3/" },
  { name: "Stack Ball", url: "https://stackball.io/" },
  { name: "Temple Run 2", url: "https://azgames.io/game/temple-run-2/" },
  { name: "Happy Wheels", url: "https://sreekar617.github.io/hw/index.html" },
  { name: "Crossy Road", url: "https://breakium.com/data/g/crossyroad/" }
];

function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

function toggleFavorite(gameName) {
  let favorites = getFavorites();
  const index = favorites.indexOf(gameName);

  if (index === -1) {
    favorites.push(gameName);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  updateGameDisplay();
}

function createGameCard(game, isFavorite) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <h3>${game.name}</h3>
    <p>${game.name} - Click to play!</p>
    <a href="javascript:openGame('${game.name}', '${game.url}')" class="button">Play Now</a>
    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-game="${game.name}" onclick="event.preventDefault(); toggleFavorite('${game.name}')">
      ★
    </button>
  `;
  return card;
}

function updateGameDisplay() {
  const gamesGrid = document.querySelector('.game-grid');
  const favoritesGrid = document.getElementById('favorites-grid');
  const favorites = getFavorites();

  if (gamesGrid) {
    gamesGrid.innerHTML = '';
    GAMES.forEach(game => {
      const isFavorite = favorites.includes(game.name);
      gamesGrid.appendChild(createGameCard(game, isFavorite));
    });
  }

  if (favoritesGrid) {
    favoritesGrid.innerHTML = '';
    const favoriteGames = GAMES.filter(game => favorites.includes(game.name));
    if (favoriteGames.length === 0) {
      favoritesGrid.innerHTML = '<p class="text-center">No favorite games yet. Star some games to add them here!</p>';
    } else {
      favoriteGames.forEach(game => {
        favoritesGrid.appendChild(createGameCard(game, true));
      });
    }
  }
}

// Links functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the game display if we're on the games or favorites page
  if (document.querySelector('.game-grid')) {
    updateGameDisplay();
  }

  // Only run this code on the links page
  if (!document.getElementById('links-container')) return;

  const links = [
    { title: "Frog Unixr", url: "https://frog.unixr.net/" },
    { title: "Frog Cliffixit", url: "https://frog.cliffixit.com/" },
    { title: "Frog Rebdg", url: "https://frog.rebdg.com/" },
    { title: "Skibidi", url: "https://skibidi.cfd/" },
    { title: "Math Home", url: "https://mathhome.work/" },
    { title: "Free Math", url: "https://freemath.site/" },
    { title: "Learn History", url: "https://learnhistory.lol/" },
    { title: "Math Home", url: "https://mathhome.work/" },
    { title: "Mehhhh Online", url: "https://mehhhh.online/" },
    { title: "Kiddle", url: "https://kiddle.website/" },
    { title: "Just Some Homework", url: "https://justsomehomework.online/" },
    { title: "PowerPoint", url: "https://powerpoint.icu/" },
    { title: "Trigonometry", url: "https://trigonometry.site/" },
    { title: "Fun Math", url: "https://funmath.website/" },
    { title: "Study Central", url: "https://studycentral.xyz/" },
    { title: "Sunny's Gym", url: "http://sunnysgym.827266641.xyz/" },
    { title: "Sunny's Gym Contbot", url: "http://sunnysgym.contbot.com.br/" },
    { title: "Sunny's Gym Linux", url: "http://sunnysgym.homelinuxserver.org/" },
    { title: "Sunny the Dog", url: "http://sunnythedog.madhacker.biz/" },
    { title: "Sunny's Math Class", url: "http://sunnysmathclass.wikilegia.com/" }
  ];

  const linksPerPage = 9;
  let currentPage = 1;
  const totalPages = Math.ceil(links.length / linksPerPage);

  const linksContainer = document.getElementById('links-container');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const prevPageBtnBottom = document.getElementById('prevPageBottom');
  const nextPageBtnBottom = document.getElementById('nextPageBottom');
  const pageInfo = document.getElementById('pageInfo');
  const pageInfoBottom = document.getElementById('pageInfoBottom');

  function displayLinks(page) {
    linksContainer.innerHTML = '';

    const startIndex = (page - 1) * linksPerPage;
    const endIndex = Math.min(startIndex + linksPerPage, links.length);

    for (let i = startIndex; i < endIndex; i++) {
      const link = links[i];
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.className = 'link-card';
      linkElement.target = '_blank';
      linkElement.textContent = link.url;

      linksContainer.appendChild(linkElement);
    }

    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    pageInfoBottom.textContent = `Page ${page} of ${totalPages}`;

    prevPageBtn.disabled = page === 1;
    nextPageBtn.disabled = page === totalPages;
    prevPageBtnBottom.disabled = page === 1;
    nextPageBtnBottom.disabled = page === totalPages;

    if (page === 1) {
      prevPageBtn.style.opacity = '0.5';
      prevPageBtnBottom.style.opacity = '0.5';
    } else {
      prevPageBtn.style.opacity = '1';
      prevPageBtnBottom.style.opacity = '1';
    }

    if (page === totalPages) {
      nextPageBtn.style.opacity = '0.5';
      nextPageBtnBottom.style.opacity = '0.5';
    } else {
      nextPageBtn.style.opacity = '1';
      nextPageBtnBottom.style.opacity = '1';
    }
  }

  prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  nextPageBtn.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  prevPageBtnBottom.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  nextPageBtnBottom.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  // Initialize with the first page
  displayLinks(currentPage);
});

// Initialize favorites on page load if we're on the games page
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.game-grid')) {
    updateGameDisplay();
  }
});
