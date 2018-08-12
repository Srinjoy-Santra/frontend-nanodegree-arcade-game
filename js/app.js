const winMessage = document.querySelector('h2');
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    // Update the enemy's x position in case it leaves the
    // visible area  and speed
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };
  
    // Prevent collisions
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our players, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
// a handleInput() method.
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        console.log("Won");
            
            
        winMessage.setAttribute("style","visibility: visible; display: inherit;");
        /*winMessage.setAttribute("style","display: inherit;");*/
        this.x = 200;
        this.y = 380;
        setTimeout(function(){
            winMessage.setAttribute("style","visibility: hidden; display: none;");
        },2000);
        
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey)
{
    switch(pressedKey)
        {
            case 'left' : 
                this.x -= this.speed + 50;
                break;
            case 'right' : 
                this.x += this.speed + 50;
                break;
            case 'up' : 
                this.y -= this.speed + 30;
                break;
            case 'down' : 
                this.y += this.speed + 30;
                break;
        }
}

// Now instantiate your objects.
var allEnemies = [];
// Place all enemy objects in an array called allEnemies
var enemyPosition = [60, 140, 220];
// Place the player object in a variable called player
var player = new Player(200, 380, 50);
var enemy;
// Position "y" where the enemies will are created
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
