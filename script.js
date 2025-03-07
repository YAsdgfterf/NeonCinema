
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

// Links functionality
document.addEventListener('DOMContentLoaded', function() {
  // Only run this code on the links page
  if (!document.getElementById('links-container')) return;
  
  const links = [
    { title: "1346", url: "https://mathhelp.politechnika-nova.edu.pl/", description: "Mathematics help resources" },
    { title: "Benrogo", url: "https://ben.is.supersimple.lol/", description: "Ben's simple website" },
    { title: "Benrogo", url: "https://ben.wants-a.space/", description: "Ben's space website" },
    { title: "Benrogo", url: "https://ben.is-learning.materialdesign.space/", description: "Ben's material design website" },
    { title: "NoDiddyDog", url: "https://nodiddydogwasatthediddy.party/", description: "NoDiddyDog site" },
    { title: "NowGG", url: "https://nowgg.lol", description: "Now GG site" },
    { title: "1346 dot lol", url: "https://1346-dot-lol.global.ssl.fastly.net/", description: "1346 dot lol fastly" },
    { title: "71745718", url: "https://71745718.online/", description: "71745718 online" },
    { title: "Politechnika Nova", url: "https://politechnika-nova.edu.pl/", description: "Politechnika Nova" },
    { title: "Sunny's Gym", url: "https://sunnysgym.lol", description: "Sunny's Gym LOL" },
    { title: "Sunny's Gym Shop", url: "https://sunnysgym.shop", description: "Sunny's Gym Shop" },
    { title: "Sunny's Gym GitHub", url: "https://sunnysgym.github.io", description: "Sunny's Gym GitHub" },
    { title: "Sunny FastLy", url: "https://sunny.global.ssl.fastly.net", description: "Sunny FastLy" },
    { title: "Rogo E", url: "https://rogo-e.global.ssl.fastly.net/", description: "Rogo E" },
    { title: "Rogo F", url: "https://rogo-f.global.ssl.fastly.net/", description: "Rogo F" },
    { title: "Rogo G", url: "https://rogo-g.global.ssl.fastly.net/", description: "Rogo G" },
    { title: "Rogo H", url: "https://rogo-h.global.ssl.fastly.net/", description: "Rogo H" },
    { title: "Rogo I", url: "https://rogo-i.global.ssl.fastly.net/", description: "Rogo I" },
    { title: "Rogo J", url: "https://rogo-j.global.ssl.fastly.net/", description: "Rogo J" },
    { title: "Rogo K", url: "https://rogo-k.global.ssl.fastly.net/", description: "Rogo K" },
    { title: "Rogo L", url: "https://rogo-l.global.ssl.fastly.net/", description: "Rogo L" },
    { title: "Rogo M", url: "https://rogo-m.global.ssl.fastly.net/", description: "Rogo M" },
    { title: "Rogo N", url: "https://rogo-n.global.ssl.fastly.net/", description: "Rogo N" },
    { title: "Rogo O", url: "https://rogo-o.global.ssl.fastly.net/", description: "Rogo O" },
    { title: "Rogo P", url: "https://rogo-p.global.ssl.fastly.net/", description: "Rogo P" },
    { title: "Rogo Q", url: "https://rogo-q.global.ssl.fastly.net/", description: "Rogo Q" },
    { title: "Rogo R", url: "https://rogo-r.global.ssl.fastly.net/", description: "Rogo R" },
    { title: "Rogo S", url: "https://rogo-s.global.ssl.fastly.net/", description: "Rogo S" },
    { title: "Rogo T", url: "https://rogo-t.global.ssl.fastly.net/", description: "Rogo T" },
    { title: "Rogo U", url: "https://rogo-u.global.ssl.fastly.net/", description: "Rogo U" },
    { title: "Rogo V", url: "https://rogo-v.global.ssl.fastly.net/", description: "Rogo V" },
    { title: "Rogo W", url: "https://rogo-w.global.ssl.fastly.net/", description: "Rogo W" },
    { title: "Rogo X", url: "https://rogo-x.global.ssl.fastly.net/", description: "Rogo X" },
    { title: "Rogo Y", url: "https://rogo-y.global.ssl.fastly.net/", description: "Rogo Y" },
    { title: "Rogo Z", url: "https://rogo-z.global.ssl.fastly.net/", description: "Rogo Z" }
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
