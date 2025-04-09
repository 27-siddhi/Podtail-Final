// podcast.js

/*const podcasts = [
    {
      title: "Horror Night Tales",
      category: "horror",
      src: "podcast1.mp3",
      isPremium: true
    },
    {
      title: "Laugh Out Loud",
      category: "comedy",
      src: "podcast2.mp3",
      isPremium: false
    },
    {
      title: "Cricket Commentary",
      category: "sports",
      src: "podcast3.mp3",
      isPremium: false
    },
    {
      title: "Ancient Myths",
      category: "mythological",
      src: "podcast4.mp3",
      isPremium: true
    },
    {
      title: "Political Talks",
      category: "political",
      src: "podcast5.mp3",
      isPremium: false
    },
    {
        title: "Political Talks",
        category: "political",
        src: "podcast5.mp3",
        isPremium: false
    },
    {
        title: "Political Talks",
        category: "political",
        src: "podcast5.mp3",
        isPremium: false
    }
  ];
  
  // Simulate premium user
  let isPremiumUser = false;
  
  const podcastList = document.getElementById('podcastList');
  const searchInput = document.getElementById('searchInput');
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  function renderPodcasts(filterCategory = 'all', searchTerm = '') {
    podcastList.innerHTML = '';
  
    const filtered = podcasts.filter(p => {
      const matchCategory = filterCategory === 'all' || p.category === filterCategory;
      const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  
    filtered.forEach(podcast => {
      const card = document.createElement('div');
      card.className = 'podcast-card';
  
      card.innerHTML = `
        <h3>${podcast.title}</h3>
        ${podcast.isPremium && !isPremiumUser ? `
          <p><em>Subscribe to listen</em></p>
          <div class="premium-badge">Premium</div>
        ` : `
          <audio controls src="${podcast.src}"></audio>
        `}
        <span class="like-btn" onclick="toggleLike(this)">♥</span>
      `;
  
      podcastList.appendChild(card);
    });
  }
  
  function toggleLike(el) {
    el.classList.toggle('liked');
  }
  
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      renderPodcasts(category, searchInput.value);
    });
  });
  
  searchInput.addEventListener('input', () => {
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    renderPodcasts(activeCategory, searchInput.value);
  });
  
  // Initial render
  renderPodcasts();
  */




// Spotify API credentials
const CLIENT_ID = "c6f377959c9e4dcc9bf06df19d1ce72d";
const CLIENT_SECRET = "36b01ab647fe4fffb52653cea6764dc7";

let token = "BQCSyZOx9tV1nC3xB8qjSfFpTqvczgOM0X2icIKRCq2fhyZFXIxCt92fIUqEsZBhP-8P162VVWVXPEgkesj_LUH-MIw0ozB156DN63w4EPvLh9QZBqLiVYkP4zq6wfCRa8sDOTidVIw";

// Get access token from Spotify
async function getAccessToken() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  token = data.access_token;

  // Load default podcasts
  fetchPodcasts("trending");
}

// Fetch podcasts using Spotify API
async function fetchPodcasts(query) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=show&limit=8`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  displayPodcasts(data.shows.items);
}

// Display podcast cards
function displayPodcasts(podcasts) {
  const container = document.getElementById("podcastContainer");
  container.innerHTML = "";

  podcasts.forEach((podcast, index) => {
    const isPremium = index % 2 === 0; // Alternate podcasts as premium
    const card = document.createElement("div");
    card.classList.add("podcast-card");

    card.innerHTML = `
      <img src="${podcast.images[0].url}" alt="${podcast.name}">
      <h3>${podcast.name}</h3>
      <p>${podcast.description.substring(0, 100)}...</p>
      ${isPremium ? '<div class="premium-badge">Premium</div>' : ''}
      <button class="play-btn" onclick="playPodcast('${podcast.external_urls.spotify}', ${isPremium})">Play</button>
      ${!isPremium ? '<p><strong>Ad:</strong> Listen with short ads.</p>' : ''}
    `;

    container.appendChild(card);
  });
}

// Handle podcast playback
function playPodcast(url, isPremium) {
  if (isPremium) {
    const subscribed = confirm("This is a Premium podcast. Are you subscribed?");
    if (!subscribed) {
      alert("Subscribe to access premium podcasts.");
      return;
    }
  }

  const spotifyId = getSpotifyIdFromUrl(url);
  const embedUrl = `https://open.spotify.com/embed/show/${spotifyId}`;

  const playerFrame = document.getElementById("spotifyPlayer");
  const playerContainer = document.getElementById("playerContainer");

  playerFrame.src = embedUrl;
  playerContainer.style.display = "block";
}

// Helper function to get show ID from Spotify URL
function getSpotifyIdFromUrl(url) {
  const parts = url.split("/");
  return parts[parts.length - 1].split("?")[0];
}






// Search input
document.getElementById("searchInput").addEventListener("input", (e) => {
  fetchPodcasts(e.target.value);
});

// Initial call
getAccessToken();
