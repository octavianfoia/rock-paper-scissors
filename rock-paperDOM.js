let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

/* if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

const autoplay = document.querySelector(".js-button-autoplay");
autoplay.addEventListener("click", autoPlay);

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorsButton = document.querySelector(".js-scissors-button");

rockButton.addEventListener("click", () => {
  playGame("rock");
});
paperButton.addEventListener("click", () => {
  playGame("paper");
});
scissorsButton.addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  }
  if (event.key === "p") {
    playGame("paper");
  }
  if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  // console.log(computerMove);
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === playerMove) {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === playerMove) {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === playerMove) {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score)); //score object will be saved in local storage as a string
  updateScore();

  document.querySelector(".js-result").innerText = result;

  document.querySelector(".js-moves").innerHTML = `You
  <img class="move_icon" src="img/${playerMove}-emoji.png" alt="" />
  <img class="move_icon" src="img/${computerMove}-emoji.png" alt="" />
  Computer`;

  /*alert(
    `You picked ${playerMove}. Computer picked ${computerMove}. ${result}. \n Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`
  );*/
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
  document.querySelector(".js-result").innerText = "";

  document.querySelector(".js-moves").innerText = "";
}
