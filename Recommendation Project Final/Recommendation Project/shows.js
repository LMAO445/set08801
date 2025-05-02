const shows = [
  {
    title: "Terminal List",
    image: "image/6.webp",
    link: "https://www.primevideo.com/dp/amzn1.dv.gti.a6302f52-d658-4623-92fb-8e78a4904632",
    platform: "Prime"
  },
  {
    title: "The Boys",
    image: "image/The boys.jpg",
    link: "https://www.primevideo.com/detail/0KRGHGZCHKS920ZQGY5LBRF7MA",
    platform: "Prime"
  },
  {
    title: "Mind Hunter",
    image: "image/8.jpg",
    link: "https://www.netflix.com/mm/title/80114855",
    platform: "Netflix"
  },
  {
    title: "True Detective",
    image: "image/9.jpg",
    platform: "Other"
  },
  {
    title: "Jack Ryan",
    image: "image/10.jfif",
    link: "https://www.primevideo.com/dp/amzn1.dv.gti.921df68c-71a7-4f4a-a35d-804ac6245208",
    platform: "Prime"
  },
  {
    title: "DARK",
    image: "image/DARK.jpg",
    link: "https://www.netflix.com/sg/title/80100172",
    platform: "Netflix"
  },
  {
    title: "FROM",
    image: "image/FROM.jpg",
    link: "https://www.primevideo.com/detail/FROM/0QUD5ZQUTN60OAXR13829P3219",
    platform: "Prime"
  },
  {
    title: "Severance",
    image: "image/Severance.jfif",
    platform: "Other"
  },
  {
    title: "Supernatural",
    image: "image/SPN.jpg",
    link: "https://www.primevideo.com/dp/amzn1.dv.gti.20bb1813-379c-fc88-ed82-3755f16be7d2",
    platform: "Prime"
  },
  {
    title: "Midnight Mass",
    image: "image/Midnight Mass.jpg",
    link: "https://www.netflix.com/mm/title/81083626",
    platform: "Netflix"
  },
  {
    title: "Loki",
    image: "image/Loki.png",
    platform: "Other"
  },
  {
    title: "Sandman",
    image: "image/sandman.avif",
    link: "https://www.netflix.com/mm/title/81150303",
    platform: "Netflix"
  },
  {
    title: "Outer Range",
    image: "image/Outer Range.jpg",
    platform: "Other"
  },
  {
    title: "The Watcher",
    image: "image/The Watcher.jpg",
    platform: "Other"
  }
];

function markAsWatched(title, type = 'show', event) {
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

function renderShows(filterText = "", platform = "") {
  const container = document.getElementById("show-container");
  container.innerHTML = ""; // Clear current content

  const username = localStorage.getItem("loggedInUser");
  const userHistoryKey = `history_${username}`;
  const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];

  shows
    .filter(show => {
      const matchesText = show.title.toLowerCase().includes(filterText.toLowerCase());
      const matchesPlatform = platform ? show.platform === platform : true;
      return matchesText && matchesPlatform;
    })
    .forEach(show => {
      const wrapper = document.createElement("div");
      wrapper.className = "card";

      const image = document.createElement("img");
      image.src = show.image;
      image.alt = "TV Show";
      image.width = 250;
      image.height = 380;
      image.style.margin = "5px";

      const title = document.createElement("p");
      title.textContent = show.title;
      title.style = "font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;";

      if (show.link) {
        const link = document.createElement("a");
        link.href = show.link;
        link.appendChild(image);
        wrapper.appendChild(link);
      } else {
        wrapper.appendChild(image);
      }

      // Add the "Mark as Watched" button
      const watchButton = document.createElement("button");
      watchButton.className = "watch-button";

      const alreadyWatched = history.some(item => item.title === show.title && item.type === 'show');

      if (alreadyWatched) {
        watchButton.textContent = "Watched";
        watchButton.disabled = true;
      } else {
        watchButton.textContent = "Mark as Watched";
        watchButton.onclick = (event) => markAsWatched(show.title, 'show', event);
      }

      wrapper.appendChild(title);
      wrapper.appendChild(watchButton);
      container.appendChild(wrapper);
    });
}

window.onload = () => {
  renderShows();

  const searchInput = document.getElementById("searchInput");
  const platformFilter = document.getElementById("platformFilter");

  searchInput.addEventListener("input", () => {
    const text = searchInput.value;
    const platform = platformFilter.value;
    renderShows(text, platform);
  });

  platformFilter.addEventListener("change", () => {
    const text = searchInput.value;
    const platform = platformFilter.value;
    renderShows(text, platform);
  });
};
