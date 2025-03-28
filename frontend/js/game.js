const submitBtn = document.querySelector(".submitAnswerBtn");
const homepageBtn = document.getElementById("HomepageBtn");
const restartgameBtn = document.getElementById("restartGameBtn");

resetTemporaryDB();


homepageBtn.addEventListener("click" , () => {
    resetTemporaryDB();
    window.location.href = "../frontend/index.html";
})

restartgameBtn.addEventListener("click" , () => {
    GameController.toggleGameState();
    resetTemporaryDB();
    document.querySelector(".board").innerHTML = "";
    GameBoard.generateBoard();
    GameController.setTeams();
    GameBoard.setStartingScreen();
})

submitBtn.addEventListener("click" , () => {
    GameController.playTurn(GameController.getQuestion());
})

let GameBoard = (function(){
    let rows = 5;
    let cols = 5;
    let timerRunning = false;
    const visualBoard = [];

    const generateBoard = () => {
        const board = document.querySelector('.board');
        

        for (let i = 0; i < rows; i++) {
            visualBoard[i] = [];
            for (let j = 0; j < cols; j++) {
                visualBoard[i].push("-")
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.active = "false"
                cell.dataset.cellcode = `${i}-${j}`;
                cell.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
                board.appendChild(cell);
            }
        }
        
        attachListenerToCells();
    }

    const getVisualBoard = () => {
        return visualBoard;
    }

    const attachListenerToCells = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click" , async (event) => {
                // Error handling if cell is solved or active
                if(event.currentTarget.dataset.solved === "true")
                {
                    setMessageScreen("Cell is already captured")
                    setTimeout(() => {
                        resetMessageScreen();
                    } , 1000)
                }
                else if(getActiveCell())
                {
                    setMessageScreen("Another Cell is active")
                    setTimeout(() => {
                        resetMessageScreen();
                    } , 1000)
                }
                else if(GameController.getGameState())
                {
                    setMessageScreen("Game is over!")
                    setTimeout(() => {
                        resetMessageScreen();
                    } , 1000)
                }
                // safe path
                else
                {
                    GameController.resetTurnsPlayed();
                    const question = await fetchQuestionPerCell(cell.innerHTML);
                    GameController.setQuestion(question);
    
                    setQuestionToScreen(question.question_text);
    
                    cells.forEach(cell => {
                        if(cell.dataset.solved != "true")
                        {
                            cell.style.backgroundColor = "white"
                        }
                    });
                    cell.style.backgroundColor = "yellow";
    
                    cells.forEach(cell => {
                        if(cell.dataset.active === "true")
                        {
                            cell.dataset.active = "false";
                        }
                    });
                    cell.dataset.active = "true";
    
                    showPlaySection();
                    setTimer(35, async () => {
                        GameController.increaseTurnsPlayed();
                        if(GameController.getTurnsPlayed() >= 2)
                        {
                            GameController.resetTurnsPlayed();
                            setMessageScreen(`Both Teams Failed to answer , Question will be changed` , "red");
                            // reset question
                            const question = await fetchQuestionPerCell(GameBoard.getActiveCell().innerHTML);
                            GameController.setQuestion(question);
                            GameBoard.setQuestionToScreen(question.question_text);
                            GameController.switchturn();
                        }
                        else
                        {
                            setMessageScreen(`${GameController.getActiveTeam().name} Failed to answer , Other team counter turn` , "red");
                            GameController.switchturn("counter");
                        }
                        resetTimer();
                        setTimeout(() => {
                            resetMessageScreen();
                        } , 2500)
                    });
                }
            })
        })
    }
    
    // Get currrent active cell
    const getActiveCell = () => {
        const cells = document.querySelectorAll(".cell");
        for (let cell of cells) {
            if (cell.dataset.active === "true") {
                return cell;  
            }
        }
        return null
    }

    const setQuestionToScreen = (questionText) => {
        document.querySelector("#question").innerHTML = questionText;
    }

    // Set waiting screen for mid matches (pick text and color based on active team)
    const setWaitingScreen = (team , win=false) => {
        if(win)
        {
            console.log("here")
            const informationSection = document.querySelector(".information-section");
        
            informationSection.innerHTML = `${team.name} Won!`;
            informationSection.style.backgroundColor = team.hexcode;
        }
        else
        {
            const informationSection = document.querySelector(".information-section");
        
            informationSection.innerHTML = `${team.name} Picking`;
            informationSection.style.backgroundColor = team.hexcode;
        }

    }

    // Set starting screen (pick text and color based on active team)
    const setStartingScreen = () => {
        const informationSection = document.querySelector(".information-section");
        let activeTeam = GameController.getActiveTeam();

        if(activeTeam.name === "Green")
        {
            informationSection.innerHTML = "Green Starting";
            informationSection.style.backgroundColor = activeTeam.hexcode;
        }
        else
        {
            informationSection.innerHTML = "Orange Starting";
            informationSection.style.backgroundColor = activeTeam.hexcode;
        }
    }

    const setMessageScreen = (message="no message" , bgcolor="white") => {
        const messageScreen = document.querySelector(".messages-screen");
        messageScreen.innerHTML = message;
        messageScreen.style.backgroundColor = bgcolor;
    }

    const resetMessageScreen = () => {
        const messageScreen = document.querySelector(".messages-screen");
        messageScreen.innerHTML = "";
        messageScreen.style.backgroundColor = "white";
    }

    // This is used to execute the animation to show the inputs and hide the waiting screen
    const showPlaySection = () => {
        const informationSection = document.querySelector(".information-section");
        const playSection = document.querySelector(".play-section");

        informationSection.classList.remove("showInformationSection");
        informationSection.classList.add("hideInformationSection")

        setTimeout(() => {
            playSection.classList.remove("hidePlaySection");
            playSection.classList.add("showPlaySection");
        }, 600)
    }

    // This is used to hide the inputs and show the waiting screen
    const showWaitSection = () => {
        const informationSection = document.querySelector(".information-section");
        const playSection = document.querySelector(".play-section");

        playSection.classList.remove("showPlaySection");
        playSection.classList.add("hidePlaySection")

        setTimeout(() => {
            informationSection.classList.remove("hideInformationSection");
            informationSection.classList.add("showInformationSection");
        }, 600)
    }

    // Timer function used to set a timer , check whether a team ended their turn with no answer in the given time 
    const setTimer = (duration , onTimeUp) => {
        let timerElement = document.getElementById("timer");
        let timeLeft = duration;
    
        if (timerRunning) {
          clearInterval(countdown); 
        }
    
        timerRunning = true; 
    
        countdown = setInterval(() => {
          timerElement.textContent = timeLeft; 
          timeLeft--;
    
          if (timeLeft < 0) {
            clearInterval(countdown); 
            timerElement.textContent = "0";
            timerRunning = false; 


            let activeCell = getActiveCell();
            if(activeCell && !activeCell.dataset.solved)
            {
                if(onTimeUp)
                {
                    onTimeUp();
                }
            }
          }
        }, 1000);
      };

      const resetTimer = () => {
        clearInterval(countdown);  
        timerRunning = false;  
        setTimer(35, async() => {
            GameController.increaseTurnsPlayed();
            if(GameController.getTurnsPlayed() >= 2)
            {
                GameController.resetTurnsPlayed();
                setMessageScreen(`Both Teams Failed to answer , Question will be changed` , "red");
                // reset question
                const question = await fetchQuestionPerCell(GameBoard.getActiveCell().innerHTML);
                GameController.setQuestion(question);
                GameBoard.setQuestionToScreen(question.question_text);
                GameController.switchturn();
            }
            else
            {
                setMessageScreen(`${GameController.getActiveTeam().name} Failed to answer , Other team counter turn` , "red");
                GameController.switchturn("counter");
            }
            resetTimer();
            setTimeout(() => {
                resetMessageScreen();
            } , 2500)
        });  
    };
    
    return {generateBoard , setWaitingScreen , showWaitSection , showPlaySection , setTimer , setStartingScreen , resetTimer , setMessageScreen , resetMessageScreen , getActiveCell , setQuestionToScreen , getVisualBoard}
})();

const GameController = (function(){
    let teams = [];
    let activeTeam = null;
    let question;
    let turnsPlayed = 0;
    let gameWon = false;

    const setTeams = () => {
        teams = [
            {
                name : "Orange",
                hexcode : "#FFA500",
                score : 0,
                isLatestWinner : false,
            },
            {
                name : "Green",
                hexcode : "#00D407",
                score : 0,
                isLatestWinner : false,
            }
        ]
        activeTeam = teams[Math.floor(Math.random() * teams.length)];
        setActiveTeam(activeTeam.name);
    }

    const switchturn = (roundType="") =>
    {
        activeTeam = activeTeam === teams[0] ? teams[1] : teams[0];
                 
        if(activeTeam == teams[0])
        {
            setActiveTeam(activeTeam.name , roundType);
        }
        else
        {
            setActiveTeam(activeTeam.name , roundType);
        }
    }

    const getGameState = () => {
        return gameWon;
    }

    const toggleGameState = () => {
        if(gameWon === true)
        {
            gameWon = false;
        }
        else
        {
            gameWon = true;
        }
    }

    const setQuestion = (newQuestion) => {
        question = newQuestion;
    }

    const getQuestion = () => {
        return question;
    }

    const getTurnsPlayed = () => {
        return turnsPlayed
    }

    const increaseTurnsPlayed = () => {
        turnsPlayed++;
    }

    const resetTurnsPlayed = () => {
        turnsPlayed = 0;
    }
    const getActiveTeam = () => activeTeam;

    const setActiveTeam = (teamName , type="regular") => {
        const activeTeamText = document.querySelector(".turn .activeTeam");
        const body = document.querySelector("body");

        
        if(teamName == "Orange")
        {
            type === "counter" ? activeTeamText.innerText = "Orange team counter" : activeTeamText.innerText = "Orange team";
            activeTeamText.style.color = "orange";
            body.style.backgroundColor = "rgba(209, 172, 37, 0.62)";
        }
        else
        {
            type === "counter" ? activeTeamText.innerText = "Green team counter" : activeTeamText.innerText = "Green team";
            activeTeamText.style.color = "green";
            body.style.backgroundColor = "rgba(1, 122, 1, 0.575)";
        }
    }

    const getAnswer = () => {
        let answer = document.querySelector("#answer").value;
        return answer
    }

    const  playTurn = async (question) => {
        let answer = getAnswer();

        // ! answer is CORRECT
        if(answer.toLowerCase() === question.answer.toLowerCase()){
            const cellCode = GameBoard.getActiveCell().dataset.cellcode;
            const [row , col] = cellCode.split("-");
            GameBoard.getVisualBoard()[row][col] = getActiveTeam().name
            document.querySelector('[data-active="true"]').style.backgroundColor = getActiveTeam().hexcode
            document.querySelector('[data-active="true"]').dataset.solved = "true";
            document.querySelector('[data-active="true"]').dataset.active = "false";

            // Change color of answer box then reset it
            document.querySelector("#answer").style.backgroundColor = "green";
            setTimeout(() => {
                document.querySelector("#answer").style.backgroundColor = "white";
                document.querySelector("#answer").value = "";
                if(!getGameState())
                {
                    GameBoard.setWaitingScreen(GameController.getActiveTeam());
                }
                GameBoard.showWaitSection();
            }, 1000)

            GameBoard.setMessageScreen(`${GameController.getActiveTeam().name} Answered correctly , they capture the cell` , `${GameController.getActiveTeam().hexcode}`);

            // Check win
            if(checkWin(GameBoard.getVisualBoard() , getActiveTeam().name))
            {
                if(getActiveTeam().name === "Orange")
                {
                    GameBoard.setMessageScreen(`Orange has conquered the board, securing a path from left to right!` , `${GameController.getActiveTeam().hexcode}`);
                }
                else
                {
                    GameBoard.setMessageScreen(`Green has conquered the board, securing a path from top to bottom!`  , `${GameController.getActiveTeam().hexcode}`);
                }
                GameBoard.setWaitingScreen(GameController.getActiveTeam() , true);
                GameBoard.showWaitSection();
                toggleGameState();
                return;
            }
            else
            {
                setTimeout(() => {
                    GameBoard.resetMessageScreen();
                } , 2500)

                switchturn();
            }
            
        }
        // ! answer is INCORRECT
        else
        {
            increaseTurnsPlayed();
            // Change color of answer box then reset it
            document.querySelector("#answer").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("#answer").style.backgroundColor = "white";
                document.querySelector("#answer").value = "";
            } , 1000)
            if(getTurnsPlayed() >= 2)
            {
                resetTurnsPlayed();
                GameBoard.setMessageScreen(`Both team coudlnt answer , Question will be changed...` , `red`);
                // reset the question
                const question = await fetchQuestionPerCell(GameBoard.getActiveCell().innerHTML);
                GameController.setQuestion(question);
                GameBoard.setQuestionToScreen(question.question_text);
                switchturn();
            }
            else
            {
                GameBoard.setMessageScreen(`${GameController.getActiveTeam().name} Answered incorrectly , The other team have a chance to capture the cell` , `red`);
                switchturn("counter");
            }
            setTimeout(() => {
                GameBoard.resetMessageScreen();
            } , 2500)
            GameBoard.resetTimer();
        }
    }

    const  checkWin = (board , team) => {
        // get how many rows and cols we have
        let rows = board.length;
        let cols = board[0].length;
    
        // we create a 5x5 board and fill it with false (no cells visited yet)
        let visited = Array.from({ length: rows} , () => Array(cols).fill(false));
        
        // directions we can traverse in the graph , first num cols second rows
        const directions = [[1,0] , [-1,0] , [0,1] , [0,-1]]
    
        function dfs(r , c)
        {
            // check if current cell is visited return false else fill true in the cell
            if(visited[r][c]) return false;
            visited[r][c] = true;
    
            // if we reached the end
            if(team === "Orange" && c === cols - 1) return true;
            if(team === "Green" && r === rows -1) return true;
    
            for(let [dr , dc] of directions){
                let nr = r + dr , nc = c + dc; // Calculate new movements
                if(nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === team && !visited[nr][nc])
                {
                    if(dfs(nr , nc)) return true;
                }
            }
            return false;
        }
    
        // dfs from BOTH sides
        if(team === "Orange"){
            for(let r = 0 ; r < rows ; r++)
            {
                if(board[r][0] === "Orange" && dfs(r , 0)) return true;
                
            }
        }
        else if(team === "Green")
        {
            for(let c = 0 ; c < cols ; c++)
            {
                if(board[0][c] === "Green" && dfs(0 , c)) return true;
                
            } 
        }
        return false;
    }  

    return {switchturn , getActiveTeam , setTeams , playTurn , setQuestion , getQuestion , getTurnsPlayed , increaseTurnsPlayed , resetTurnsPlayed , getGameState , toggleGameState}
})();



GameBoard.generateBoard();
GameController.setTeams();
GameBoard.setStartingScreen();

async function fetchQuestionPerCell(letter)
{
    try
    {
        const response = await fetch("../backend/gameplay/fetch_question_cell.php" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            body : new URLSearchParams ({
                letter : letter,
            })
        });

        const data = await response.json();

        if (data.success) {
            return data.question;
        } else {
            throw new Error("No question found");
        }
    } catch (error) {
            console.error("Error:", error);
            return false;
        }
}

function resetTemporaryDB() {
    fetch("../backend/gameplay/reset_table.php").catch(error => console.log(error));
}
