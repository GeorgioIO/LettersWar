import { resetTemporaryDB } from "../js/modules/resetTemporaryDb.js";
import { fetchQuestionPerCell } from "../js/modules/fetchQuestionPerCell.js";
import { ArrayBoard, UIBoard } from "../js/modules/Board.js";
import { GameTimer } from "../js/modules/GameTimer.js";
import {
  setMessageScreen,
  resetMessageScreen,
  showPlaySection,
  showWaitSection,
  setWaitingScreen,
  setQuestionToScreen,
  setStartingScreen,
} from "./modules/uiFunctions.js";

const TURN_TIMER_DURATION = 5;
const BOARD_ROWS = 5;
const BOARD_COLS = 5;

const submitBtn = document.querySelector(".submitAnswerBtn");
const homepageBtn = document.getElementById("HomepageBtn");
const restartgameBtn = document.getElementById("restartGameBtn");

// reset temporaryDb and init game.
resetTemporaryDB();

homepageBtn.addEventListener("click", () => {
  resetTemporaryDB();
  window.location.href = "../frontend/index.html";
});

restartgameBtn.addEventListener("click", () => {
  resetTemporaryDB();
  GameController.resetGameState();
  GameController.setTeams();

  interfaceController.timer.reset();
  document.querySelector(".board").innerHTML = "";
  interfaceController.generateBoard();
  setStartingScreen(GameController.getActiveTeam());
  showWaitSection();
});

submitBtn.addEventListener("click", () => {
  GameController.playTurn(GameController.getQuestion());
});

let interfaceController = (function () {
  // Make an instance of UI Board class
  const uiBoard = new UIBoard("board", BOARD_COLS, BOARD_ROWS);

  // Make an instance of ArrayBoard class
  const arrayBoard = new ArrayBoard(BOARD_COLS, BOARD_ROWS);

  // Make an instance of GameTimer class
  const timer = new GameTimer("timer", TURN_TIMER_DURATION);

  const generateBoard = () => {
    uiBoard.createBoard();
    arrayBoard.createBoard();

    attachListenerToCells();
  };

  const attachListenerToCells = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", async (event) => {
        // ! Error handling if cell is solved or active
        if (GameController.getGameState() === true) {
          setMessageScreen("Game is over!", "white", 3);
        } else if (getActiveCell()) {
          setMessageScreen("Another Cell is active", "white", 3);
        } else if (event.currentTarget.dataset.solved === "true") {
          setMessageScreen("Cell is already captured", "white", 3);
        }
        // ! Safe path
        else {
          startTurn(cell);
        }
      });
    });
  };

  function handleTimeUp() {
    console.log("time is up");
    GameController.increaseQuestionAttempts();

    if (GameController.getQuestionAttempts() >= 2) {
      GameController.resetQuestionAttempts();
      setMessageScreen(
        `Both Teams Failed to answer , Question will be changed`,
        "red",
        2,
      );

      fetchQuestionPerCell(interfaceController.getActiveCell().innerHTML).then(
        (question) => {
          GameController.setQuestion(question);
          setQuestionToScreen(question.question_text);
          GameController.switchturn();
          timer.reset();

          setTimeout(() => {
            resetMessageScreen();
            startTurn(interfaceController.getActiveCell());
          }, 2500);
        },
      );
    } else {
      setMessageScreen(
        `${
          GameController.getActiveTeam().name
        } Failed to answer , Other team counter turn`,
        "red",
        2,
      );
      GameController.switchturn("counter");
      timer.reset();

      setTimeout(() => {
        resetMessageScreen();
        startTurn(interfaceController.getActiveCell());
      }, 2500);
    }
  }

  async function startTurn(cell) {
    GameController.resetQuestionAttempts();

    const question = await fetchQuestionPerCell(cell.innerHTML);
    GameController.setQuestion(question);
    setQuestionToScreen(question.question_text);

    const allCells = document.querySelectorAll(".cell");
    uiBoard.setCellColor(allCells, cell);
    uiBoard.setCellActiveState(allCells, cell);
    showPlaySection();
    timer.startTimer(handleTimeUp);
  }
  // Get currrent active cell
  const getActiveCell = () => {
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
      if (cell.dataset.active === "true") {
        return cell;
      }
    }
    return null;
  };

  return { generateBoard, getActiveCell, uiBoard, arrayBoard, timer };
})();

const GameController = (function () {
  let teams = [];
  let activeTeam = null;
  let question;
  let turnsPlayed = 0;
  let gameWon = false;

  const setTeams = () => {
    teams = [
      {
        name: "Orange",
        hexcode: "#FFA500",
        score: 0,
        isLatestWinner: false,
      },
      {
        name: "Green",
        hexcode: "#00D407",
        score: 0,
        isLatestWinner: false,
      },
    ];
    activeTeam = teams[Math.floor(Math.random() * teams.length)];
    setActiveTeam(activeTeam.name);
  };

  const switchturn = (roundType = "") => {
    activeTeam = activeTeam === teams[0] ? teams[1] : teams[0];

    if (activeTeam == teams[0]) {
      setActiveTeam(activeTeam.name, roundType);
    } else {
      setActiveTeam(activeTeam.name, roundType);
    }
  };

  const getGameState = () => {
    return gameWon;
  };

  const resetGameState = () => {
    gameWon = false;
  };
  const toggleGameState = () => {
    if (gameWon === true) {
      gameWon = false;
    } else {
      gameWon = true;
    }
  };

  const setQuestion = (newQuestion) => {
    question = newQuestion;
  };

  const getQuestion = () => {
    return question;
  };

  // ? Functions to get question attempts , increase it by one , reset the counter
  const getQuestionAttempts = () => {
    return turnsPlayed;
  };

  const increaseQuestionAttempts = () => {
    turnsPlayed++;
  };

  const resetQuestionAttempts = () => {
    turnsPlayed = 0;
  };
  const getActiveTeam = () => activeTeam;

  const setActiveTeam = (teamName, type = "regular") => {
    const activeTeamText = document.querySelector(".turn .activeTeam");
    const body = document.querySelector("body");

    if (teamName == "Orange") {
      type === "counter"
        ? (activeTeamText.innerText = "Orange team counter")
        : (activeTeamText.innerText = "Orange team");
      activeTeamText.style.color = "orange";
      body.style.backgroundColor = "rgba(209, 172, 37, 0.62)";
    } else {
      type === "counter"
        ? (activeTeamText.innerText = "Green team counter")
        : (activeTeamText.innerText = "Green team");
      activeTeamText.style.color = "green";
      body.style.backgroundColor = "rgba(1, 122, 1, 0.575)";
    }
  };

  const getAnswer = () => {
    let answer = document.querySelector("#answer").value;
    return answer;
  };

  const playTurn = async (question) => {
    let answer = getAnswer();

    // ! answer is CORRECT
    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      // stop the running timer since the question was answered
      interfaceController.timer.reset();
      getActiveTeam().score++;
      const cellCode = interfaceController.getActiveCell().dataset.cellcode;
      const [row, col] = cellCode.split("-");
      const cell = document.querySelector('[data-active="true"]');
      interfaceController.arrayBoard.updateArrayBoardCell(
        row,
        col,
        getActiveTeam().name,
      );
      interfaceController.uiBoard.updateUIBoardCell(
        cell,
        getActiveTeam().hexcode,
      );

      // Change color of answer box then reset it
      document.querySelector("#answer").style.backgroundColor = "green";
      setTimeout(() => {
        document.querySelector("#answer").style.backgroundColor = "white";
        document.querySelector("#answer").value = "";
      }, 1000);

      setMessageScreen(
        `${
          GameController.getActiveTeam().name
        } Answered correctly , they capture the cell`,
        `${GameController.getActiveTeam().hexcode}`,
        2,
      );

      // Check win
      if (
        checkWin(interfaceController.arrayBoard.board, getActiveTeam().name)
      ) {
        if (getActiveTeam().name === "Orange") {
          setMessageScreen(
            `Orange has conquered the board, securing a path from left to right!`,
            `${GameController.getActiveTeam().hexcode}`,
            10,
          );
        } else {
          setMessageScreen(
            `Green has conquered the board, securing a path from top to bottom!`,
            `${GameController.getActiveTeam().hexcode}`,
            10,
          );
        }
        setWaitingScreen(GameController.getActiveTeam(), "win");
        showWaitSection();
        toggleGameState();
        return;
      } else if (handleTieBreak(teams)) {
        if (teams[0].score > teams[1].score) {
          setMessageScreen(
            "Orange Won by capturing more cells",
            teams[0].hexcode,
            10,
          );
          setWaitingScreen(teams[0], "win");
          showWaitSection();
          toggleGameState();
        } else if (teams[1].score > teams[0].score) {
          setMessageScreen(
            "Green Won by capturing more cells",
            teams[1].hexcode,
            10,
          );
          setWaitingScreen(teams[1], "win");
          showWaitSection();
          toggleGameState();
        } else {
          setMessageScreen("Its a draw!", "white", 10);
          setWaitingScreen("", "draw");
          showWaitSection();
        }
        return;
      } else {
        switchturn();
        setWaitingScreen(GameController.getActiveTeam());
        showWaitSection();
        setTimeout(() => {
          resetMessageScreen();
        }, 2500);
      }
    }
    // ! answer is INCORRECT
    else {
      increaseQuestionAttempts();
      // Change color of answer box then reset it
      document.querySelector("#answer").style.backgroundColor = "red";
      setTimeout(() => {
        document.querySelector("#answer").style.backgroundColor = "white";
        document.querySelector("#answer").value = "";
      }, 1000);
      if (getQuestionAttempts() >= 2) {
        resetQuestionAttempts();
        setMessageScreen(
          `Both team coudln't answer , Question will be changed...`,
          `red`,
          2,
        );
        // reset the question
        const question = await fetchQuestionPerCell(
          interfaceController.getActiveCell().innerHTML,
        );
        GameController.setQuestion(question);
        setQuestionToScreen(question.question_text);
        switchturn();
      } else {
        setMessageScreen(
          `${
            GameController.getActiveTeam().name
          } Answered incorrectly , The other team have a chance to capture the cell`,
          `red`,
          2,
        );
        switchturn("counter");
      }
      setTimeout(() => {
        resetMessageScreen();
      }, 2500);

      // restart timer using the shared timeout handler so the other team gets a chance
      interfaceController.timer.startTimer(handleTimeUp);
    }
  };

  const checkWin = (board, team) => {
    // get how many rows and cols we have
    let rows = board.length;
    let cols = board[0].length;

    // we create a 5x5 board and fill it with false (no cells visited yet)
    let visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    // directions we can traverse in the graph , first num cols second rows
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    function dfs(r, c) {
      // check if current cell is visited return false else fill true in the cell
      if (visited[r][c]) return false;
      visited[r][c] = true;

      // if we reached the end
      if (team === "Orange" && c === cols - 1) return true;
      if (team === "Green" && r === rows - 1) return true;

      for (let [dr, dc] of directions) {
        let nr = r + dr,
          nc = c + dc; // Calculate new movements
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          board[nr][nc] === team &&
          !visited[nr][nc]
        ) {
          if (dfs(nr, nc)) return true;
        }
      }
      return false;
    }

    // dfs from BOTH sides
    if (team === "Orange") {
      for (let r = 0; r < rows; r++) {
        if (board[r][0] === "Orange" && dfs(r, 0)) return true;
      }
    } else if (team === "Green") {
      for (let c = 0; c < cols; c++) {
        if (board[0][c] === "Green" && dfs(0, c)) return true;
      }
    }
    return false;
  };

  const handleTieBreak = () => {
    const cells = document.querySelectorAll(".board .cell");

    for (const cell of cells) {
      if (!cell.dataset.solved) {
        // If at least one cell is not solved, return false (game isn't tied yet)
        return false;
      }
    }
    return true; // All cells are solved, meaning a tie scenario
  };

  return {
    switchturn,
    getActiveTeam,
    setTeams,
    playTurn,
    setQuestion,
    getQuestion,
    getQuestionAttempts,
    increaseQuestionAttempts,
    resetQuestionAttempts,
    getGameState,
    toggleGameState,
    resetGameState,
  };
})();

function initGame() {
  interfaceController.generateBoard();
  GameController.setTeams();
  setStartingScreen(GameController.getActiveTeam());
}

initGame();
