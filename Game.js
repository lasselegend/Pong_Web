let rectX, ballX, ballY, ballSpeedX, ballSpeedY, score;
let highScores = [0, 0, 0];
let gameStarted = false;

function setup() {
    createCanvas(800, 600);
    resetGame();
    }

function draw() {
    background(0);

    if (!gameStarted) {
        showTitleScreen();
        return;
    }

    moveBall();
    movePaddle();
    checkCollisions();
    drawGameElements();
}

function showTitleScreen() {
    Fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Hello", width / 2, height / 2 - 50);
    textSize(30);
    text("Press any key to start", width / 2, height / 2 + 20);
}

function keyPressed() {
    if (!gameStarted) {
        gameStarted = true;
        return;
    }
    if (keyCode === LEFT_ARROW) rectX -= 20;
    if (keyCode === RIGHT_ARROW) rectX += 20;
}

function resetGame() {
    rectX = width / 2 - 50;
    ballX = random(50, 750);
    ballY = 50;
    ballSpeedX = 5;
    ballSpeedY = 5;
    score = 0;
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function movePaddle() {
    rectX = constrain(rectX, 0, width - 100);
}

function checkCollisions() {
    if (ballX < 0 || ballX > width) ballSpeedX *= -1;
    if (ballY < 0) ballSpeedY *= -1;

    if (ballY >= height - 35 && ballX > rectX && ballX < rectX + 100) {
       ballSpeedY *= -1;
       score++;
       if (score % 5 == 0) {
        ballSpeedX += ballSpeedX > 0 ? 1 : -1;
        ballSpeedY += ballSpeedY > 0 ? 1 : -1;
       } 
    }

    if (ballY > height) {
        highScores.push(score);
        highScores.sort((a, b) => b - a).splice(3);
        resetGame();
    }
}

function drawGameElements() {
    fill(255);
    ellipse(ballX, ballY, 14);
    fill(0, 255, 0);
    rect(rectX, height - 20, 100, 10, 7);

    fill(255);
    textSize(20);
    text("Score: " + score, 650, 50);
    textSize(15);
    text("Top Scores:", 650, 80);
    for (let i = 0; i < highScores.length; i++) {
        text((i + 1) + ". " + highScores[i], 650, 100 + i * 20);
    }
}