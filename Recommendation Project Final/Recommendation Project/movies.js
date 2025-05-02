const movies = [
  {
    title: "Knock at The Cabin",
    image: "image/1.jfif",
    link: "https://www.netflix.com/mm/title/81624341?source=35",
    platform: "Sci-fi"
  },
  {
    title: "Split",
    image: "image/2.webp",
    link: "https://www.netflix.com/mm/title/80124506",
    platform: "Mystery"
  },
  {
    title: "Glass",
    image: "image/3.jpg",
    link: "https://tv.apple.com/us/movie/glass/umc.cmc.27mdwcw7om4ocst1p689pcxne",
    platform: "Action"
  },
  {
    title: "Unbreakable",
    image: "image/4.jpg",
    link: "https://www.hulu.com/movie/unbreakable-30d2c119-652b-48cb-b840-9626bf612a23",
    platform: "Thriller"
  },
  {
    title: "Secret Window",
    image: "image/5.jpg",
    link: "https://www.netflix.com/mm/title/60034561",
    platform: "Mystery"
  },
  {
    title: "Tenet",
    image: "image/tenet.jfif",
    link: "https://www.primevideo.com/detail/Tenet/0SXMIJPJ25O9LQBBHV0Y11PV0B",
    platform: "Sci-fi"
  },
  {
    title: "Caddo Lake",
    image: "image/caddo lake.jpg",
    link: "https://www.primevideo.com/detail/Caddo-Lake/0I08PAIUVZKVCWYOVOVSYSXT1I",
    platform: "Sci-fi"
  },
  {
    title: "Rebel Ridge",
    image: "image/Rebel.jpg",
    link: "https://www.netflix.com/mm/title/81157729",
    platform: "Thriller"
  },
  {
    title: "The Killer",
    image: "image/Killer.jfif",
    link: "https://www.netflix.com/mm/title/80234448?source=35",
    platform: "Action"
  },
  {
    title: "Apostle",
    image: "image/Apostle.jfif",
    link: "https://www.netflix.com/mm/title/80158148?source=35",
    platform: "Horror"
  },
  {
    title: "A Quiet Place",
    image: "image/Quiet P1.jpg",
    link: "https://www.paramountplus.com/intl/",
    platform: "Horror"
  },
  {
    title: "A Quiet Place Part 2",
    image: "image/Quiet P2.jpg",
    link: "https://www.netflix.com/title/81186806",
    platform: "Horror"
  },
  {
    title: "A Quiet Place : Day One",
    image: "image/Quiet P3.jpg",
    link: "https://www.primevideo.com/detail/A-Quiet-Place-Day-One/0OJG1AJLVOT6KKPOOKKFZOZIQL",
    platform: "Horror"
  },
  {
    title: "The Empty Man",
    image: "image/The Empty Man.jpeg",
    link: "https://www.primevideo.com/detail/The-Empty-Man-4K-UHD/0IIIPN2CI3Z9FBR6YRRM4YKQBX",
    platform: "Horror"
  },
  {
    title: "Mickey 17",
    image: "image/Mickey_17.png",
    link: "https://tv.apple.com/us/movie/mickey-17/umc.cmc.4sy8d2jaavdrnbbyh56dao7nf",
    platform: "Thriller"
  },
  {
    title: "The Gorge",
    image: "image/gorge.jfif",
    link: "https://tv.apple.com/us/movie/the-gorge/umc.cmc.26o403koqo2klixc0jtqy6tmc",
    platform: "Thriller"
  },
];

function markAsWatched(title, type = 'movie', event) {
  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    alert("Please login to mark as watched.");
    return;
  }

  const userHistoryKey = `history_${username}`;
  const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];

  const existingItem = history.find(item => item.title === title && item.type === type);

  if (!existingItem) {
    const newItem = {
      title,
      type,
      timestamp: new Date().toISOString()
    };
    history.push(newItem);
    localStorage.setItem(userHistoryKey, JSON.stringify(history));
  }

  const button = event.target;
  button.textContent = "Watched";
  button.disabled = true;
}


function renderMovies(filterText = "", platform = "") {
  const container = document.getElementById("movie-container");
  container.innerHTML = ""; // Clear current content

  const username = localStorage.getItem("loggedInUser");
  const userHistoryKey = `history_${username}`;
  const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];


  movies
    .filter(movie => {
      const matchesText = movie.title.toLowerCase().includes(filterText.toLowerCase());
      const matchesPlatform = platform ? movie.platform === platform : true;
      return matchesText && matchesPlatform;
    })
    .forEach(movie => {
      const wrapper = document.createElement("div");
      wrapper.className = "card";

      const image = document.createElement("img");
      image.src = movie.image;
      image.alt = "Movie";
      image.width = 250;
      image.height = 380;
      image.style.margin = "5px";

      const title = document.createElement("p");
      title.textContent = movie.title;
      title.style = "font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;";

      if (movie.link) {
        const link = document.createElement("a");
        link.href = movie.link;
        link.appendChild(image);
        wrapper.appendChild(link);
      } else {
        wrapper.appendChild(image);
      }

      // Add the "Mark as Watched" button
      const watchButton = document.createElement("button");
      watchButton.className = "watch-button";

      const alreadyWatched = history.some(item => item.title === movie.title && item.type === 'movie');

      if (alreadyWatched) {
        watchButton.textContent = "Watched";
        watchButton.disabled = true;
      } else {
        watchButton.textContent = "Mark as Watched";
        watchButton.onclick = (event) => markAsWatched(movie.title, 'movie', event);
      }

      wrapper.appendChild(title);
      wrapper.appendChild(watchButton);
      container.appendChild(wrapper);
    });
}
window.onload = () => {
  renderMovies();

  const searchInput = document.getElementById("searchInput");
  const platformFilter = document.getElementById("platformFilter");

  searchInput.addEventListener("input", () => {
    const text = searchInput.value;
    const platform = platformFilter.value;
    renderMovies(text, platform);
  });

  platformFilter.addEventListener("change", () => {
    const text = searchInput.value;
    const platform = platformFilter.value;
    renderMovies(text, platform);
  });
};
