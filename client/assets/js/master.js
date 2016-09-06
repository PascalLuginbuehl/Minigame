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
    height: 1000,
    width: 1000,
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
      constructor({positionX = 0, positionY = 0, sizeX = 10, sizeY = 10, texture = 0, solid = false, static: staticElem = false}) {
        // position
        // left top of hitbox
        this.position = new V(positionX, positionY);

        // velocity for movement
        this.velocity = new V(0, 0);

        // pulls into Direction
        this.force = new V(0, 0);

        this.size = new V(sizeX, sizeY);

        // IDEA: z-index

        // IDEA: Also able to set via reference to type
        this.texture = texture;


        // parameters
        this.solid = solid;
        this.static = staticElem;
      }

      applyForce() {

      }
    }


    this.map = new this.Map(this.config.map);
    let texture = new Image();
    texture.src = "assets/images/dirt.png";

    this.map.addEntity(new this.Entity({
      positionX: 50,
      positionY: 50,

      sizeX: 16,
      sizeY: 16,

      texture: texture,

      solid: true,
      static: false,
    }));


    // Timer for gameloop
    this.expectedInterval = window.performance.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }

  // catch up loop
  gameLoop() {
    // special for communicator and input
    this.specialInput();

    let overtime = window.performance.now() - this.expectedInterval;

    if (overtime > this.config.gameLoopInterval) {
      this.overtimeError(overtime);
      this.expectedInterval = window.performance.now();
      // error, overtime longer then Interval, sync with server...
    }

    let delay = (overtime + this.config.gameLoopInterval) / 1000;
    // console.log(delay);

    // physics here
    for (let i = 0; i < this.map.entitys.length; i++) {
      let entity = this.map.entitys[i];

      if(!entity.static) {
        let acceleration = entity.force.scale(2000);
        // idk wahts betta
        // let friction = 0.08;
        let friction = 0.8;
        // entity.velocity = entity.velocity.add(acceleration.subtract(entity.velocity.scale(friction)));
        entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(.92);
        console.log(entity.velocity);
        entity.position = entity.position.add(entity.velocity.scale(delay));
        // velocity += acceleration * time_step
        // position += velocity * time_step


        // collisions
        for (var o = 0; o < this.map.entitys.length; o++) {
          let entity2 = this.map.entitys[o];
          // check collision
          if (entity != entity2 && entity.solid) {
            // FIXME: do better physX
            //
          }
        }
      }
    }


    this.expectedInterval += this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
  }

  overtimeError(overtime) {
    console.error("overtimeError: " + overtime);
  }

  specialInput() {

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



    game.Entity.prototype.renderTexture = function (ctx) {
      ctx.drawImage(this.texture, this.position.x, this.position.y, this.size.x, this.size.y);
    }




    // this.render();
    // setTimeout(this.render.bind(this), 1);

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }


  render() {

    // Clear old stuff
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < game.map.entitys.length; i++) {
      let entity = game.map.entitys[i];
      entity.renderTexture(this.ctx);
    }
  }
}


/**
 * Input for user inputs.
 * Communicator for communicating to WebSocket
 */
class Input {
  constructor(game) {
    this.game = game;

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

    var keys = this.keys;

    game.__proto__.specialInput = function() {
      let v = new V(0, 0);
      if (keys.w) {
        v.y-- ;
      }
      if (keys.a) {
        v.x--;
      }
      if (keys.s) {
        v.y++;
      }
      if (keys.d) {
        v.x++;
      }
      this.map.entitys[0].force = (v);
    }

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
  }
}


/**
 * Errorhandling for Client Server has its own...
 */
class Communicator {
  constructor(game) {
    this.game = game;
    game.__proto__.overtimeError = (overtime) => {
      // console.log(overtime);
      // console.log(this);
      this.expectedInterval = window.performance.now();
    };
  }
}

let game = new Game(CONFIG);
let input = new Input(game);
let communicator = new Communicator(game, input);

document.addEventListener('DOMContentLoaded', () => {
  let render = new Render(game, document.body, {
    renderHitbox: true
  });
});
