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

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
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
        this.position = new Vector2(params.positionX, params.positionY);

        // velocity for movement
        this.linearVelocity = new Vector2(0, 0);

        // pulls into Direction
        this.force = new Vector2(0, 0);


        // rotation
        this.angle = 0;
        this.angularVelocity = 0;
        this.torque = 0;


        // IDEA: z-index

        // IDEA: Also able to set via reference to type
        this.texture = params.texture;

        // Size for Texture
        this.height = params.height;
        this.width = params.width;

        // Array of polygons
        // Needs mass for boxshape
        this.hitbox = params.hitbox;


        // parameters
        this.solid = params.solid;
        this.static = params.static;
      }

      applyForce() {

      }
    }

    this.map = new this.Map(this.config.map);
    let texture = new Image();
    texture.src = "assets/images/dirt.png";

    this.map.addEntity(new this.Entity({
      positionX: 10,
      positionY: 10,

      texture: texture,

      height: 20,
      width: 20,

      hitbox: [{positionX: 0, positionY: 0}, {positionX:20, positionY: 0}, {positionX: 0, positionY: 20}],

      solid: true,
      static: true,
    }))

    // Timer for gameloop
    this.expectedInterval = window.performance.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }

  // catch up loop
  gameLoop() {
    let overtime = window.performance.now() - this.expectedInterval;

    if (overtime > this.config.gameLoopInterval) {
      this.overtimeError(overtime);
      this.expectedInterval = window.performance.now();
      // error, overtime longer then Interval, sync with server...
    }

    let delay = overtime + this.config.gameLoopInterval;
    // console.log(delay);

    // physics here


    this.expectedInterval += this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
  }

  overtimeError(overtime) {
    console.error("overtimeError: " + overtime);
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



    // adding new prototypes for rendering and debugging
    game.Entity.prototype.renderHitbox = function (ctx) {
      let x = this.position.x;
      let y = this.position.y;
      ctx.beginPath();
      ctx.moveTo(x + this.hitbox[0].positionX, y + this.hitbox[0].positionY);

      for (let position = 0; position < this.hitbox.length; position++) {
        let localHitbox = this.hitbox[position];
        ctx.lineTo(x + localHitbox.positionX, y + localHitbox.positionY);
        ctx.moveTo(x + localHitbox.positionX, y + localHitbox.positionY);
      }

      ctx.lineTo(x + this.hitbox[0].positionX, y + this.hitbox[0].positionY);

      ctx.stroke();
    }

    game.Entity.prototype.renderTexture = function (ctx) {
      let x = this.position.x;
      let y = this.position.y;

      ctx.drawImage(this.texture, x, y, this.height, this.width);
    }



    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < game.map.entitys.length; i++) {
      let entity = game.map.entitys[i];

      entity.renderTexture(this.ctx);


      if (this.debugging.renderHitbox) {
        entity.renderHitbox(this.ctx);
      }
    }
  }

  // toRender(positionX, positionY) {
  //   positionX - this.height;
  //   positionY;
  // }
}


/**
 * Input for user inputs.
 * Communicator for communicating to WebSocket
 */
class Input {
  constructor(game) {
    this.game = game;

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = true;
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = false;
        e.preventDefault();
      }
    });

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      ArrowUp: false,
      ArrowLeft: false,
      ArrowDown: false,
      ArrowRigth: false,
    }
  }
}


/**
 * Errorhandling for Client Server has its own...
 */
class Communicator {
  constructor(game) {
    this.game = game;
    game.__proto__.overtimeError = (overtime) => {
      console.log(overtime);
      console.log(this);
      this.expectedInterval = window.performance.now();
    };
  }
}

let game = new Game(CONFIG);
let input = new Input(game);
let communicator = new Communicator(game);

document.addEventListener('DOMContentLoaded', () => {
  let render = new Render(game, document.body, {
    renderHitbox: true
  });
});
