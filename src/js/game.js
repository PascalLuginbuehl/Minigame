'use strict'
// IDEA: Circle collision
// IDEA: z-index
// IDEA: collision side
// IDEA: Pathfinding
// IDEA: sprites
// IDEA: Players controller
// IDEA: collsion speedup (AABB detection with outer part
// FIXME: Outer colisionbox

const CONFIG = {
  gameLoopInterval: 16,

  map: {
    height: 1000,
    width: 1000,
  },

  textureBasepath: 'assets/images/',
  textures: {
    'dirt': {
      texture: 'dirt.png',
      size: {
        x: 10,
        y: 10,
      }
    },
    'house': {
      texture: 'house.png',
      size: {
        x: 64,
        y: 50,
      }
    },
  },

  models: {
    'dirt': {
      solid: true,
      static: false,
      hitbox: [{
        x: 0,
        y: 0,
        w: 10,
        h: 10,
      },{
        x: 10,
        y: 10,
        w: 10,
        h: 10,
      }],
    },
    'house': {
      solid: true,
      static: true,
      hitbox: [{
        x: 0,
        y: 0,
        w: 48,
        h: 48,
      },{
        x: 49,
        y: 8,
        w: 15,
        h: 32,
      },{
        x: 16,
        y: 48,
        w: 4,
        h: 2,
      },{
        x: 28,
        y: 48,
        w: 4,
        h: 2,
      }],
    }
  },
}



class V {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new V(Math.round((v.x + this.x) * 10) / 10, Math.round((v.y + this.y) * 10) / 10);
  }

  subtract(v) {
    return new V(this.x - v.x, this.y - v.y);
  }

  scale(s) {
    return new V(Math.round((this.x * s) * 10) / 10 , Math.round((this.y * s) * 10) / 10);
  }

  dot(v) {
    return (this.x * v.x + this.y * v.y);
  }

  cross(v) {
    return (this.x * v.y - this.y * v.x);
  }

  smalest(v) {
    let x = this.x < v.x ? this.x : v.x
      , y = this.y < v.y ? this.y : v.y;
    return new V(x, y);
  }

  biggest(v) {
    let x = this.x > v.x ? this.x : v.x
      , y = this.y > v.y ? this.y : v.y;
    return new V(x, y);
  }

  rotate(angle, vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    let x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
    let y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));

    return new V(x_prime, y_prime);
  }
}



class Rectangle {
  constructor({x: x, y: y, w: w, h: h, min: min, max: max}) {
    if (min != undefined && max != undefined) {
      this.min = min;
      this.max = max;
    } else {
      this.min = new V(x, y);
      this.max = new V(w, h);
    }
    // this._rotation = 0;
    // let rotation = 5;
    // this.center = new V(0, 0);
  }

  // get rotation() {
  //   console.log(rotation, "asd");
  //   return rotation;
  // }

  // set rotation(rotation) {
  //   this._rotation = rotation;
  // }

  checkCollision(origin, originRect, rect) {
    let rectMin = rect.min.add(originRect);

    // let thisMin = rect.min.add(origin).add(rect.min);
    let thisMin = this.min.add(origin);

    if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
      return true;
    }
    return false;
  }
}

class Hitbox {
  constructor(hitboxconf) {
    this.hitboxes = [];
    for (let i = 0; i < hitboxconf.length; i++) {
      this.hitboxes.push(new Rectangle(hitboxconf[i]));
    }

    this.collisionBox = this.getCollisionBox();
  }

  checkCollision(origin, eOrigin, eHitbox) {
    if (this.collisionBox.checkCollision(origin, eOrigin, eHitbox.collisionBox)) {
      for (let i = 0; i < this.hitboxes.length; i++) {
        let hitboxes = this.hitboxes[i];

        for (let o = 0; o < eHitbox.hitboxes.length; o++) {

          if (hitboxes.checkCollision(origin, eOrigin, eHitbox.hitboxes[o])) {
            return true;
            console.log(entity.velocity);
          }
        }
      }
    }
    return false;
  }

  getCollisionBox() {
    let max = new V(0, 0);

    for (let i = 0; i < this.hitboxes.length; i++) {
      let hitbox = this.hitboxes[i];

      max = max.biggest(hitbox.min.add(hitbox.max));
    }

    let min = new V(max.x, max.y);

    for (let i = 0; i < this.hitboxes.length; i++) {
      min = min.smalest(this.hitboxes[i].min);
    }

    return new Rectangle({min, max});
  }
}


class Model {
  constructor({solid: solid = true, static: staticElem = false, hitbox: hitbox}) {
    // this.hitbox = [new Rectangle({x: 0, y: 0, w: 10, h: 10})];


    // comes to renderengine
    // IDEA: Also able to set via reference to type
    // this.texture = texture;
    // this.textureSize = new V(10, 10);

    // FIXME: Fix inputs from config
    // parameters
    this.solid = solid;
    this.static = staticElem;

    this.hitbox = new Hitbox(hitbox);
  }
}


class Entity {
  constructor({positionX = 0, positionY = 0, texture = 0, solid = false, static: staticElem = false, model: model}) {
    // position
    // left top of hitbox
    this.position = new V(positionX, positionY);

    // velocity for movement
    this.velocity = new V(0, 0);

    // pulls into Direction
    this.force = new V(0, 0);

    // IDEA: z-index

    // Textures and rest is safed in here
    this.model = model;
  }
}

// Constructor
class Game {
  constructor(config) {
    this.config = config;

    // Map starting corner left bottom, render left top
    // IDEA: Chunks for more performence

    this.height = config.map.height;
    this.width = config.map.width;
    this.entitys = [];


    this.models = {};
    for (var name in this.config.models) {
      this.models[name] = new Model(this.config.models[name]);
    }


    this.addEntity(new Entity({
      positionX: 70,
      positionY: 70,

      model: this.models['dirt'],
    }));

    this.addEntity(new Entity({
      positionX: 0,
      positionY: 0,

      model: this.models['house'],
    }));


    // Timer for gameloop
    this.expectedInterval = window.performance.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }

  addEntity (entity) {
    this.entitys.push(entity);
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
    for (let i = 0; i < this.entitys.length; i++) {
      let entity = this.entitys[i];

      if(!entity.static) {
        let acceleration = entity.force.scale(2000);
        // idk wahts betta
        // let friction = 0.08;
        let friction = 0.8;
        // entity.velocity = entity.velocity.add(acceleration.subtract(entity.velocity.scale(friction)));
        entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(.92);
        // console.log(entity.velocity);
        let position = entity.position.add(entity.velocity.scale(delay));
        // let rect = new Rectangle({min: entity.hitbox.min.add(entity.velocity.scale(delay)), max: entity.hitbox.max});
        // velocity += acceleration * time_step
        // position += velocity * time_step

        let collision = false;

        // collisions
        for (let o = 0; o < this.entitys.length; o++) {
          let entity2 = this.entitys[o];
          // check collision

          if (entity != entity2 && entity.model.solid) {

            // FIXME: do better physX
            // Collision detection
            collision = entity.model.hitbox.checkCollision(position, entity2.position, entity2.model.hitbox);
          }
        }

        // TODO: Test this
        // not sure if workst
        // fix for only one object
        if (collision) {
          entity.velocity = entity.velocity.scale(.1);
        } else {
          entity.position = position;
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
    this.canvas.height = game.height;
    this.canvas.width = game.width;
    canvasParent.appendChild(this.canvas);

    this.canvas.style.imageRendering = "pixelated";

    this.ctx = this.canvas.getContext("2d");

    // preload images
    this.game = game;

    this.debugging = debugging;


    for (var name in this.game.models) {
      let img = new Image();
      let texture = this.game.config.textures[name];

      img.src = "assets/images/" + texture.texture;

      this.game.models[name].texture = img;
      this.game.models[name].textureSize = new V(texture.size.x, texture.size.y);
    }




    Entity.prototype.renderTexture = function (ctx) {
      ctx.save();

      // add center to it so it can rotate from center
      // ctx.translate(this.position.x + this.center.x, this.position.y + this.center.y);
      ctx.translate(this.position.x, this.position.y);
      // ctx.rotate(this.angle);

      ctx.drawImage(this.model.texture, 0, 0, this.model.textureSize.x, this.model.textureSize.y);
      // ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, this.size.x, this.size.y);
      ctx.restore();
    }


    Rectangle.prototype.drawRect = function (position, ctx) {
      ctx.save();

      // add center to it so it can rotate from center
      // ctx.translate(this.position.x + this.center.x, this.position.y + this.center.y);
      position = position.add(this.min);
      ctx.translate(position.x, position.y);
      // ctx.rotate(this.angle);
      ctx.fillStyle = "rgba(0, 0, 0, .3)";
      ctx.fillRect(0, 0, this.max.x, this.max.y);

      // ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, this.size.x, this.size.y);
      ctx.restore();
    };


    // this.render();
    // setTimeout(this.render.bind(this), 1);

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }


  render() {

    // Clear old stuff
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < game.entitys.length; i++) {
      let entity = game.entitys[i];
      entity.renderTexture(this.ctx);
      for (let i = 0; i < entity.model.hitbox.length; i++) {
        entity.model.hitbox[i].drawRect(entity.position, this.ctx);
      }
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
      this.entitys[0].force = (v);
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
