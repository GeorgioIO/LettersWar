import { generateLetter } from "../modules/utilsFunctions.js";

class Board {
    constructor(rows , cols)
    {
        this.rows = rows;
        this.cols = cols;
    }
}

class UIBoard extends Board{
    constructor(className , rows , cols)
    {
        super(rows , cols);
        this.className = className;
    }

    createBoard()
    {
        const boardUI = document.querySelector(`.${this.className}`);

        for(let r = 0 ; r < this.rows ; r++)
        {
            for(let c = 0 ; c < this.cols ; c++)
            {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.active = "false";
                cell.dataset.cellcode = `${r}-${c}`;
                cell.textContent = generateLetter();
                boardUI.appendChild(cell);
            }
        }
    }

    setCellColor(cells , clickedCell ){
        cells.forEach(cell => {
            if(cell.dataset.solved != "true")
            {
                cell.style.backgroundColor = "white"
            }
        });
        clickedCell.style.backgroundColor = "yellow";
    }

    setCellActiveState(cells , clickedCell)
    {
        cells.forEach(cell => {
            if(cell.dataset.active === "true")
            {
                cell.dataset.active = "false";
            }
        });
        clickedCell.dataset.active = "true";
    }

    updateUIBoardCell(cell , team)
    {
        cell.style.backgroundColor = team;
        cell.dataset.solved = "true";
        cell.dataset.active = "false";

    }
}

class ArrayBoard extends Board {
    constructor(rows , cols)
    {
        super(rows , cols);
        this._arrayBoard = []
    }

    createBoard(){
        for(let r = 0 ; r < this.rows ; r++)
            {
                this._arrayBoard[r] = [];
                for(let c = 0 ; c < this.cols ; c++)
                {
                    this._arrayBoard[r].push("-")
                }
            }
    }

    get board()
    {
        return this._arrayBoard;
    }

    updateArrayBoardCell(row , col , team)
    {
        this._arrayBoard[row][col] = team;
    }
}

export {ArrayBoard , UIBoard}