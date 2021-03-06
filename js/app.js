// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // enemy position
    this.x = x;
    this.y = y;
    this.randomFactor = Math.floor(Math.random() * 500);
    this.speed = 100 + this.randomFactor;
    // TODO: randomize enemy speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if(this.x > 500) {
        this.x = -100;
        this.randomFactor = Math.floor(Math.random() * 500);
        this.speed = 100 + this.randomFactor;
    }
    // detect collision
    if(this.x > player.x && this.x < player.x + player.width ) {
        if(this.y > player.y && this.y < player.y + player.height) {
            player.positionRest();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.width = 100;
        this.height = 80;
        this.default_x = x;
        this.default_y = y;
    }
    update() {
        // this is always running
    }
    positionRest() {
        this.x = this.default_x;
        this.y = this.default_y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyPress) {
        // player movement
        switch (keyPress) {
            case "up":
                if (this.y - 85 < 50) {
                    this.positionRest();
                } else {
                    this.y = this.y - 85;
                }
                break;
            case "down":
                this.y = this.y + 85 > 390 ? this.y : this.y + 85;
                break;
            case "left":
                this.x = this.x - 100 < 0 ? this.x : this.x - 100;
                break;
            case "right":
                this.x = this.x + 100 > 400 ? this.x : this.x + 100;
                break;
            default:
                console.log("x: " + this.x, "y: " + this.y);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-100,60);
const enemy2 = new Enemy(-130,145);
const enemy3 = new Enemy(-300, 230);
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200,390);

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
