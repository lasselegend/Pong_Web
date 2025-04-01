let ball;
let paddle;
let ballSpeedX = 5;
let ballSpeedY = 5;
let score = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ball = createvector(width / 2, 50);
    paddle = createVector(width / 2 - 50, height - 40);
    }

function draw() {
    background(0);
    fill(255);

    // Smooth paddle movement
    if (keyIsDown(LEFT_ARROW) && paddle.x > 0) {
        paddle.x -= 6;
    }
    if (keyIsDown(RIGHT_ARROW) && paddle.x < width - 100) {
        paddle.x += 6;
    }

    // Ball movement
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Ball collision with walls
    if (ball.x <= 0 || ball.x >= width) {
        ballSpeedX *= -1;
    }

    if (ball.y <= 0) {
        ballSpeedY *= -1;
    }

    // Ball collision with paddle
    if (ball.y >= paddle.y && ball.x > paddle.x && ball.x < paddle.x + 100){
        ballSpeedY *= -1;
        score++;
    }

        // Ball falls below paddle (Game Over)
    if (ball.y > height) {
        resetBall ();
        score = 0;
    }

    // Draw ball
    ellipse(ball.x, ball.y, 15, 15);

    // Draw paddle
    rect(paddle.x, paddle.y, 100, 10);

    // Display Score
    textSize(20);
    text("Score: " + score, width - 120, 30);
}

// Keyboard movement
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        paddle.x -= 50;
    } else if (keyCode === RIGHT_ARROW) {
        paddle.x += 50;
    }
}

// Touch controls
function touchMoved () {
    paddle.x = constrain(touches[0].x - 50, 0, width - 100);
    return false;
}

// Adjust canvas if screen size changes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    paddle.y = height - 40;
}
