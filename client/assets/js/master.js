'use strict'
/**
 * Always first X then Y
 * Directions:
 * X --
 * Y |
 */

/**
 * Gravity for Direction stearing, the velocity gets higher...
 */

/**
 * Renderloop
 *
 * Gameloop
 * Important, self adjusting timers (else not in sync :( )
 */

/**
 * IDEA: Chunks for better performence, only load chunks near the Player
 */

const CONFIG = {
  gameLoopInterval: 16,

  map: {
    height: 200,
    width: 100,
  },

  textures: {
    'dirt': 'dirt.png',
  },

  types: {
    dirt: {
      solid: true,
      static: true,
      size: {
        height: 100,
        width: 100,
      }
    }
  },
}

// Constructor
class Game {
  constructor(config) {
    this.config = config;

    // Map starting corner left bottom, render left top
    // IDEA: Chunks for more performence
    this.Map = class {
      constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.entitys = [];
        // this.chuncks = [];
      }
    };

    this.Entity = class {
      constructor() {

        // position
        this.positionX;
        this.positionY;

        this.rotation;

        // velocity for movement
        this.velocityX;
        this.velocityY;
        this.gravityX;
        this.gravityY;
        this.acceleration;

        // IDEA: z-index

        this.type;
        // IDEA: Also able to set via reference to type

        // Size
        this.height;
        this.width;

        // hitbox with offset
        this.height;
        this.width;
        this.offsetX;
        this.offsetY;

        // parameters
        this.solid;
        this.static;
      }

      setVelocity() {

      }
    }

    this.map = new this.Map(this.config.map);

    this.expectedInterval = Date.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }

  // catch up loop
  gameLoop() {
    let overtime = Date.now() - this.expectedInterval;

    if (overtime > this.config.gameLoopInterval) {
      // error, overtime longer then Interval, sync with server...
    }

    let delay = overtime + this.config.gameLoopInterval;
    // physics here
    //
    /*
    var newPositionY = Math.round(0.01 * entity.velocity * 100 * 10) / 10;
    if(!entity.collisionDetection(this.map.entitys, 0, newPositionY)){
      entity.positionY = entity.positionY + newPositionY;
      entity.velocity = entity.velocity < 1 ? Math.round((entity.velocity + 0.01 * entity.gravity)*100)/100 : entity.velocity;
    } else {
      entity.velocity = 0;
    }
    */
    // console.log(delay);

    this.expectedInterval += this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
  }
}


class Render {
  constructor(game, canvasParent, debugging) {
    var canvas = document.createElement('canvas');
    console.log(game);
    canvas.height = game.map.height;
    canvas.width = game.map.width;
    canvasParent.appendChild(canvas);

    // preload images
    this.game = game;

    this.debugging = debugging ? true : false;

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }

  render() {
    console.log("asd");
    for (var i = 0; i < game.map.entitys.length; i++) {
      game.map.entitys[i];
      console.log("asd");
    }
  }

  toRender(positionX, positionY) {
    positionX - this.height;
    positionY;
  }
}

class Input {
  constructor(game) {
    this.game = game;
  }
}

let game = new Game(CONFIG);
let input = new Input(game);

document.addEventListener('DOMContentLoaded', () => {
  let render = new Render(game, document.body, true);
});
