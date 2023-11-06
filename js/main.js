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

    render();
}

function handleReset (evt) {
    init();
}


