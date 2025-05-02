const questions = [
  {
    question: "Who directed *Inception*?",
    options: ["Christopher Nolan", "James Cameron", "Steven Spielberg"],
    answer: 0
  },
  {
    question: "Which platform is *Stranger Things* on?",
    options: ["Prime", "Netflix", "Hulu"],
    answer: 1
  },
  {
    question: "What genre is *The Conjuring*?",
    options: ["Comedy", "Horror", "Drama"],
    answer: 2
  },
  {
    question: "Which movie features the character 'Tony Stark'?",
    options: ["The Matrix", "Iron Man", "Avatar"],
    answer: 2
  },
  {
    question: "Which movie does Christopher Nolan said the movie wasn't suppose to understand?",
    options: ["Inception", "Tenet", "Shutter Island"],
    answer: 2
  },
  {
    question: "Which tv shows that Henry Cavil nailed a role as a game charachter?",
    options: ["Man of steel", "The Witcher", "Mission Impossible : Fall Out"],
    answer: 2
  },
];

function loadQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = ""; // Clear previous content

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    div.innerHTML = `<p>${i + 1}. ${q.question}</p>` +
      q.options.map((opt, j) =>
        `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label>`
      ).join("");

    container.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      const selectedAnswer = parseInt(selected.value);
      if (selectedAnswer === q.answer) {
        score++;
      }
    }
  });

  const result = document.getElementById("quiz-result");
  result.textContent = `You got ${score}/${questions.length} marks! `;
}

window.onload = () => {
  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    alert("Please log in to take the quiz!");
    return;
  }

  const historyKey = `history_${username}`;
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];

  const container = document.getElementById("quiz-container");
  const submitButton = document.querySelector("button");

  if (history.length < 3) {
    container.innerHTML = `<p style="text-align:center;">📺 Watch at least 3 shows or movies to unlock the quiz!</p>`;
    submitButton.style.display = "none";
  } else {
    loadQuiz();
    submitButton.style.display = "inline"; // Show the submit button if the quiz is unlocked
  }

  submitButton.addEventListener("click", submitQuiz);
};
