const playBoard = document.querySelector(".play-board");
let foodX, foodY;
let snakeX = 5, snakeY = 5; // Posición inicial de la serpiente
let snakeBody = [];
let velocidadX = 0, velocidadY = 0;
let gameOver = false;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocidadY !== 1) {
        velocidadX = 0;
        velocidadY = -1;
    } else if(e.key === "ArrowDown" && velocidadY !== -1) {
        velocidadX = 0;
        velocidadY = 1;
    } else if(e.key === "ArrowLeft" && velocidadX !== 1) {
        velocidadX = -1;
        velocidadY = 0;
    } else if(e.key === "ArrowRight" && velocidadX !== -1) {
        velocidadX = 1;
        velocidadY = 0;
    }
}

const initGame = () => {
    if (gameOver) return; // Detener el juego si es Game Over
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Comprobar si la serpiente ha comido la comida
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        // Agregar la posición actual a la cola del cuerpo de la serpiente
        snakeBody.push([foodY, foodX]);
    }

    // Actualizar la posición del cuerpo de la serpiente
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeY, snakeX];
    }

    // Actualizar la posición de la cabeza de la serpiente
    snakeX += velocidadX;
    snakeY += velocidadY;

    // Comprobar si la serpiente choca consigo misma
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] === snakeY && snakeBody[i][1] === snakeX) {
            gameOver = true;
            alert("Game Over! La serpiente chocó consigo misma.");
            return;
        }
    }

    // Generar la serpiente en el tablero
    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
    }

    // Generar la cabeza de la serpiente
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
