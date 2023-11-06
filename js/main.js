	/*----- constants -----*/
const colors = {
    '1': 'yellow',
    '-1': 'green',
    'null': 'gray'
}

const winIndexs = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Board structure:
// [0][1][2]
// [3][4][5]
// [6][7][8]

	/*----- state variables -----*/
let board;
let turn; //1 = x, -1 = o
let winner; //'T' for tie

	/*----- cached elements  -----*/
const resetButton = document.querySelector('button');
const boardCells = [...document.querySelectorAll('.grid > div')];
const msg = document.querySelector('p');

	/*----- event listeners -----*/
document.querySelector('.grid').addEventListener('click', handleBoardClick);
document.querySelector('button').addEventListener('click', handleReset);

	/*----- functions -----*/

init()
function init () {
    board = [null, null, null, null, null, null, null, null, null];
    //always start with x
    turn = 1;
    winner = null; //no winner or tie
    render();
}

function render () {
    renderBoard();
    renderMsg();
}

function renderMsg () {
    if (winner === null) {
        msg.innerText = 'It is ' + colors[turn].toUpperCase() + "'s turn!";
    } else if (winner === 'T') {
        msg.innerText =  'There is a tie!'
    } else {
        msg.innerText = 'Congradulations ' + colors[turn*-1].toUpperCase() + "! You have won!"
    }
}

//cant test
function renderBoard () {
    boardCells.forEach(function(cell, idx){
        let currBoard = board[idx];
        cell.style.backgroundColor = colors[currBoard];
    });
}

function handleBoardClick (evt) {
    let eventIdx;
    boardCells.forEach(function(cell, idx) {
        if(cell === evt.target) {
            eventIdx = idx;
        }
    });

    if (board[eventIdx]) {return;}

    if (winner !== null) {return;}

    board[eventIdx] = turn
    
    turn = turn*-1;

    checkWinner();

    render();
}

function checkWinner () {

    winIndexs.forEach(function (winSen, idx) {
        if (board[winSen[0]] === board[winSen[1]] && board[winSen[1]] === board[winSen[2]]) {
            if (board[winSen[0]] !== null) {
                winner = board[winSen[0]];
                return;
            }
        }
    });

    if (!board.includes(null) && winner === null) {
        winner = 'T';
    }
}

function handleReset (evt) {
    init();
}



