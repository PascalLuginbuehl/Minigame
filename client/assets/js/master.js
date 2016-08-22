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
      }

      addEntity (entity) {
        this.entitys.push(entity);
      }
    };

    this.Entity = class {
      constructor(params) {

        // position
        // left top of hitbox
        this.positionX = params.positionX;
        this.positionY = params.positionY;

        this.rotation = params.rotation;

        // velocity for movement
        this.velocityX = params.velocityX;
        this.velocityY = params.velocityY;
        this.accelerationX = params.accelerationX;
        this.accelerationY = params.accelerationY;

        // IDEA: z-index

        // IDEA: Also able to set via reference to type
        this.texture = params.texture;

        // Size for Texture
        this.height = params.height;
        this.width = params.width;

        // Array of polygons
        this.hitbox = params.hitbox;


        // parameters
        this.solid = params.solid;
        this.static = params.static;
      }

      setVelocity() {

      }
    }

    this.map = new this.Map(this.config.map);
    this.map.addEntity(new this.Entity({
      positionX: 10,
      positionY: 10,

      rotation: 0,

      velocityX: 0,
      velocityY: 0,
      accelerationX: 0,
      accelerationY: 0,

      texture: new Image("assets/images/dirt.png"),

      height: 20,
      width: 20,

      hitbox: [{positionX: 0, positionY: 0}, {positionX:20, positionY: 0}, {positionX: 0, positionY: 20}],

      solid: true,
      static: true,
    }))

    // Timer for gameloop
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
    this.canvas = document.createElement('canvas');
    this.canvas.height = game.map.height;
    this.canvas.width = game.map.width;
    canvasParent.appendChild(this.canvas);

    this.canvas.style.imageRendering = "pixelated";

    this.ctx = this.canvas.getContext("2d");

    // preload images
    this.game = game;

    this.debugging = debugging;

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < game.map.entitys.length; i++) {
      let entity = game.map.entitys[i];

      if (this.debugging.renderHitbox) {
        this.ctx.beginPath();
        this.ctx.moveTo(entity.positionX + entity.hitbox[0].positionX, entity.positionY + entity.hitbox[0].positionY);

        for (let position = 0; position < entity.hitbox.length; position++) {
          let localHitbox = entity.hitbox[position];
          this.ctx.lineTo(entity.positionX + localHitbox.positionX, entity.positionY + localHitbox.positionY);
          this.ctx.moveTo(entity.positionX + localHitbox.positionX, entity.positionY + localHitbox.positionY);
        }

        this.ctx.lineTo(entity.positionX + entity.hitbox[0].positionX, entity.positionY + entity.hitbox[0].positionY);

        this.ctx.stroke();
      }
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
  let render = new Render(game, document.body, {
    renderHitbox: true
  });
});
