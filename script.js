let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newBtn = document.querySelector('#newBtn');
let message = document.querySelector('#message');
let msgContainer = document.querySelector('.msg-container');
let game = document.querySelector('main');
let welcome = document.querySelector('#welcome');

let turnO = true;
let gameOver = false;
let endGameTimeout;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    clearTimeout(endGameTimeout);
    turnO = true;
    gameOver = false;
    enableBoxes();
    game.classList.remove('hidden');
    message.classList.add('hidden');
    msgContainer.classList.add('hidden');
}

const startGame = () => {
    resetGame();
    welcome.classList.add('hidden');
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }   
}
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }   
}

const showWinner = (winner) => {
    gameOver = true;
    message.innerText = `Winner is ${winner}`;
    disableBoxes();
    endGameTimeout = setTimeout(endGame, 750);
};

const endGame = () => {
    gameOver = true;
    disableBoxes();
    game.classList.add('hidden');
    msgContainer.classList.remove('hidden');
    message.classList.remove('hidden');
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

        if (post1Val != "" && post2Val != "" && post3Val != "") {
            if (post1Val === post2Val && post2Val === post3Val) {
                showWinner(post1Val);
                return;
            }
        }
    }

    if ([...boxes].every((box) => box.innerText !== "")) {
        gameOver = true;
        message.innerText = "It's a draw!";
        endGame();
    }
};
 
newBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
