// Game configuration
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 20;
const PLAYER_SPEED = 5;
const ENEMY_SIZE = 15;
const ENEMY_SPEED = 3;

// Game state
let player = {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - PLAYER_SIZE * 2,
    score: 0
};

let enemies = [];
let gameLoop;
let canvas, ctx;

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // Start game loop
    resetGame();
    gameLoop = setInterval(update, 1000/60);

    // Add keyboard controls
    document.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(e) {
    const MOVE_DISTANCE = PLAYER_SPEED;

    switch(e.key) {
        case 'ArrowLeft':
            if (player.x > 0) player.x -= MOVE_DISTANCE;
            break;
        case 'ArrowRight':
            if (player.x < GAME_WIDTH - PLAYER_SIZE) player.x += MOVE_DISTANCE;
            break;
    }
}

function resetGame() {
    player.x = GAME_WIDTH / 2;
    player.score = 0;
    enemies = [];
}

function spawnEnemy() {
    if (Math.random() < 0.02) {  // 2% chance each frame
        enemies.push({
            x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
            y: -ENEMY_SIZE
        });
    }
}

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw player
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);

    // Spawn and update enemies
    spawnEnemy();

    // Update and draw enemies
    ctx.fillStyle = '#ff0000';
    enemies = enemies.filter(enemy => {
        enemy.y += ENEMY_SPEED;

        // Check collision
        if (checkCollision(player, enemy)) {
            resetGame();
            return false;
        }

        // Remove enemies that are off screen
        if (enemy.y > GAME_HEIGHT) {
            player.score++;
            return false;
        }

        ctx.fillRect(enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
        return true;
    });

    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px monospace';
    ctx.fillText(`Score: ${player.score}`, 10, 30);
}

function checkCollision(player, enemy) {
    return player.x < enemy.x + ENEMY_SIZE &&
           player.x + PLAYER_SIZE > enemy.x &&
           player.y < enemy.y + ENEMY_SIZE &&
           player.y + PLAYER_SIZE > enemy.y;
}