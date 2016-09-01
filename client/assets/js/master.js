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

class V {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new V(v.x + this.x, v.y + this.y);
  }

  subtract(v) {
    return new V(this.x - v.x, this.y - v.y);
  }

  scale(s) {
    return new V(this.x * s, this.y * s);
  }

  dot(v) {
    return (this.x * v.x + this.y * v.y);
  }

  cross(v) {
    return (this.x * v.y - this.y * v.x);
  }

  rotate(angle, vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    let x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
    let y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));

    return new V(x_prime, y_prime);
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
      constructor({positionX = 0, positionY = 0, centerX = 0, centerY = 0, angle = 0, texture = 0, height = 0, width = 0, hitbox = 0, solid = false, static: staticElem = false}) {


        // position
        // left top of hitbox
        this.position = new V(positionX, positionY);

        // velocity for movement
        this.linearVelocity = new V(0, 0);

        // pulls into Direction
        this.force = new V(0, 0);

        // center of mass and rotation point
        this.center = new V(centerX, centerY);


        // rotation
        this.angle = angle;
        this.angularVelocity = 0;
        this.torque = 0;


        // IDEA: z-index

        // IDEA: Also able to set via reference to type
        this.texture = texture;

        // Size for Texture
        this.height = height;
        this.width = width;

        // Array of polygons
        // Needs mass for boxshape
        this.hitbox = hitbox;


        // parameters
        this.solid = solid;
        this.static = staticElem;
      }

      calculateCenter() {
        return new V();
      }

      applyForce() {

      }
      
    }

    this.map = new this.Map(this.config.map);
    let texture = new Image();
    texture.src = "assets/images/dirt.png";

    this.map.addEntity(new this.Entity({
      positionX: 30,
      positionY: 30,

      texture: texture,

      angle: Math.PI*2,

      centerX: 10,
      centerY: 10,

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
    game.Entity.prototype.renderCenter = function (ctx) {
      ctx.rect(0, 0, 1, 1);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    // adding new prototypes for rendering and debugging
    game.Entity.prototype.renderHitbox = function (ctx) {
      let x = this.position.x;
      let y = this.position.y;

      ctx.beginPath();
      ctx.moveTo(this.hitbox[0].positionX - this.center.x, this.hitbox[0].positionY - this.center.y);

      for (let position = 0; position < this.hitbox.length; position++) {
        let localHitbox = this.hitbox[position];
        ctx.lineTo(localHitbox.positionX - this.center.x, localHitbox.positionY - this.center.y);
        ctx.moveTo(localHitbox.positionX - this.center.x, localHitbox.positionY - this.center.y);
      }

      ctx.lineTo(this.hitbox[0].positionX - this.center.x, this.hitbox[0].positionY - this.center.y);

      ctx.stroke();
    }


    game.Entity.prototype.renderTexture = function (ctx) {
      let x = this.position.x
        , y = this.position.y
        , height = this.height
        , width = this.width;

      ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, height, width);
    }




    // this.render();
    setTimeout(this.render.bind(this), 1);

    // standard Interval
    // setInterval(this.render.bind(this), Math.round(1000 / 60));
  }


  render() {
    // save status
    this.ctx.save();

    // Clear old stuff
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < game.map.entitys.length; i++) {
      let entity = game.map.entitys[i];


      this.transformContent(this.ctx, entity);

      entity.renderTexture(this.ctx);
      entity.renderCenter(this.ctx);

      if (this.debugging.renderHitbox) {
        entity.renderHitbox(this.ctx);
      }

      // restore status
      this.ctx.restore();
    }
  }

  transformContent(ctx, entity) {
    let x = entity.position.x
      , y = entity.position.y
      , angle = entity.angle;

    // add center to it so it can rotate from center
    ctx.translate(x + entity.center.x, y + entity.center.y);
    ctx.rotate(angle);
  }
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
