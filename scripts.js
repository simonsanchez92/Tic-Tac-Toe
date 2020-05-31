
//######### TIC-TAC-TOE ##############//

//Grab each one of the squares of the board
let blocks = [...document.querySelectorAll('.block')];
//Grab top buttons and message box
let options = document.querySelectorAll('input[type="button"]');
let message = document.querySelector('#message');

//This array of arrays only represents the board, used to check whether there's a winning move
let board = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8]
];

//Define the moves and loop over the buttons to determine whether "x" or "o" will be the first move
let firstMove;
let secondMove;
options.forEach(option => {
    option.addEventListener('click', () => {
        options[0].disabled = true;
        options[1].disabled = true;
        firstMove = option.value;
        message.innerHTML = 'You are ' + firstMove + '!'
        if (firstMove === 'X') {
            secondMove = 'O';
        }
        if (firstMove == 'O') {
            secondMove = 'X';
        }
    })
})


// keep track of the number of moves, set its initial value to 1 and not 0 for checking purposes
//match variable will keep false until a winning move
let numMoves = 1;
let match = false;


//Function fired by the click on the squares 
function userMove() {
    //Assigns 'X' as the first move in case the user didn't choose a move 
    if (firstMove === undefined) {
        firstMove = 'X';
        secondMove = 'O';
        options[0].disabled = true;
        options[1].disabled = true;
        message.innerHTML = 'You are ' + firstMove + '!'
    }

    if ((match == false)) {
        //Variable squareNum stores the html data- attribute 'square' of the block that's been clicked 
        let squareNum = this.dataset.square;
        //loop over the whole board array one value matches the value of the squareNum variable
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == squareNum) {
                    //user move number will always be uneven
                    if (numMoves % 2 !== 0) {
                        if (this.innerHTML == '') {
                            //assign the innerHTML of the square to the value of firstMove 'X' or 'O', reassign correspondent value on board
                            // Increment numMoves and finaly excecute the function checkWin to corroborate whether there's been a winner 
                            this.innerHTML = firstMove;
                            board[i][j] = firstMove;
                            numMoves++;
                            checkWin();
                        } else {
                            return;
                        }


                        //Pc move randomly generated and fired after the user has clicked
                        let x = Math.floor(Math.random() * 9);
                        //Loop over the block divs until the random number coincides with an empty square
                        //secondMove is assigned to the innerHTML of the square div
                        //numMoves variable is incremented by 1
                        if (numMoves < 9 && match === false) {
                            while (blocks[x].innerHTML === 'X' || blocks[x].innerHTML === 'O') {
                                x = Math.floor(Math.random() * 9);
                            }
                            blocks[x].innerHTML = secondMove;
                            numMoves++;
                            //Loop over the fake board looking for the value that matches the previous random number
                            //Reassign the corresponding value with the value of secondMove and fire checkWin function to look for a winner
                            for (let i = 0; i < board.length; i++) {
                                for (let j = 0; j < 3; j++) {
                                    if (board[i][j] == x) {
                                        board[i][j] = secondMove;
                                        checkWin();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//All the checking is done over the board variable, a fictitious board that's updated each time there is a new move
function checkWin() {
    //Create a loop to check for matches on rows
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            let winner = board[i][0];
            message.innerHTML = winner + ' Wins!';
            match = true;
            return
        }
    }
    //Create a loop to check for matches on columns
    for (let i = 0; i < board.length; i++) {
        if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            let winner = board[0][i];
            message.innerHTML = winner + ' Wins!';
            match = true;
            return
        }
    }

    //Create two conditionals to check for matches on diagonals
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
        let winner = board[0][0];
        message.innerHTML = winner + ' Wins!';
        match = true;
    }
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        let winner = board[2][0];
        message.innerHTML = winner + ' Wins!';
        match = true;
    }

    //Message in case there's no winner when the board is all filled
    if (numMoves === 10 && match == false) {
        message.innerHTML = 'It is a tie! do you want to play again?';
    }
}


//When a square of the board is clicked, the userMove function fires
blocks.forEach(block => {
    block.addEventListener('click', userMove);
});


//Loop over all the squares of the board to set their inner text to an empty string
//Set the match, numMoves, firstMove, secondMove and board variables to their initial value
//Enable the buttons to select 'X' or 'O once again
function restartGame() {
    blocks.forEach(block => {
        block.innerHTML = '';
    });
    match = false;
    numMoves = 1;
    message.innerHTML = 'X or O ???';
    firstMove = undefined;
    secondMove = undefined;
    board = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
    ];

    options[0].disabled = false;
    options[1].disabled = false;
}
