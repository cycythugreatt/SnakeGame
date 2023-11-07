const gameContainer = document.querySelector('.game-container');
const snake = document.getElementById('snake');
const food = document.getElementById('food');

let snakeX = 5;
let snakeY = 5;
let foodX;
let foodY;
let snakeSpeed = 100;
let snakeDirection = 'right';
let snakeLength = 1;

function updateFoodPosition() {
    foodX = Math.floor(Math.random() * 20);
    foodY = Math.floor(Math.random() * 20);
    food.style.left = foodX * 15 + 'px';
    food.style.top = foodY * 15 + 'px';
}

function updateSnakePosition() {
    switch (snakeDirection) {
        case 'right':
            snakeX++;
            break;
        case 'left':
            snakeX--;
            break;
        case 'up':
            snakeY--;
            break;
        case 'down':
            snakeY++;
            break;
    }

    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeLength++;
        snakeSpeed -= 5; // Snake moves faster as it eats
    }

    if (snakeX < 0 || snakeX >= 20 || snakeY < 0 || snakeY >= 20) {
        clearInterval(gameLoop);
        alert('Game Over');
    }

    if (snakeLength > 1) {
        const tail = document.createElement('div');
        tail.className = 'tail';
        tail.style.left = snakeX * 15 + 'px';
        tail.style.top = snakeY * 15 + 'px';
        gameContainer.appendChild(tail);

        const tails = document.querySelectorAll('.tail');
        if (tails.length > snakeLength) {
            gameContainer.removeChild(tails[0]);
        }
    }

    snake.style.left = snakeX * 15 + 'px';
    snake.style.top = snakeY * 15 + 'px';
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'down') {
                snakeDirection = 'up';
            }
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'up') {
                snakeDirection = 'down';
            }
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'right') {
                snakeDirection = 'left';
            }
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'left') {
                snakeDirection = 'right';
            }
            break;
    }
});

updateFoodPosition();
const gameLoop = setInterval(updateSnakePosition, snakeSpeed);
