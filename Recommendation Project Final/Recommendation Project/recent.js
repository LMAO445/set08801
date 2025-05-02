window.onload = () => {
  renderRecentHistory();
};

function renderRecentHistory() {
  const recentContainer = document.getElementById("recent-container");
  const username = localStorage.getItem("loggedInUser");

  // If no username is found, display login message
  if (!username) {
    recentContainer.innerHTML = "<p>Please login to view your watch history.</p>";
    return;
  }

  // Retrieve the user's history from localStorage
  const history = JSON.parse(localStorage.getItem(`history_${username}`)) || [];

  recentContainer.innerHTML = ""; // Clear current content

  if (history.length === 0) {
    recentContainer.innerHTML = "<p>You haven't watched anything recently.</p>";
    return;
  }

  // Loop through the history and display each item
  history.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("recent-item");

    const formattedDate = new Date(item.timestamp).toLocaleString();
    div.innerHTML = `<p><strong>${item.title}</strong> (Watched on: ${formattedDate}) - ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>`;

    // Create "Mark as Unwatched" button
    const unwatchButton = document.createElement("button");
    unwatchButton.textContent = "Mark as Unwatched";
    unwatchButton.onclick = () => {
      markAsUnwatched(item.title, item.type);
    };

    div.appendChild(unwatchButton);
    recentContainer.appendChild(div);
  });
}

function markAsUnwatched(title, type) {
  const username = localStorage.getItem("loggedInUser");

  if (!username) {
    alert("You need to be logged in to remove items from your history.");
    return;
  }

  // Retrieve the user's history from localStorage
  let history = JSON.parse(localStorage.getItem(`history_${username}`)) || [];

  // Filter out the matching item
  history = history.filter(item => !(item.title === title && item.type === type));

  // Save updated history to localStorage
  localStorage.setItem(`history_${username}`, JSON.stringify(history));

  // Re-render the updated list
  renderRecentHistory();
}
