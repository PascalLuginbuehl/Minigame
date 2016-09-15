'use strict';
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONFIG = {
  gameLoopInterval: 16,

  map: {
    height: 200,
    width: 100
  },

  textures: {
    'dirt': 'dirt.png'
  },

  types: {
    dirt: {
      solid: true,
      static: true,
      size: {
        height: 100,
        width: 100
      }
    }
  }
};

var V = function () {
  function V() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, V);

    this.x = x;
    this.y = y;
  }

  _createClass(V, [{
    key: 'add',
    value: function add() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return new V(v.x + this.x, v.y + this.y);
    }
  }, {
    key: 'subtract',
    value: function subtract() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return new V(this.x - v.x, this.y - v.y);
    }
  }, {
    key: 'scale',
    value: function scale() {
      var s = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return new V(this.x * s, this.y * s);
    }
  }, {
    key: 'dot',
    value: function dot() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: 'cross',
    value: function cross() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return this.x * v.y - this.y * v.x;
    }
  }, {
    key: 'rotate',
    value: function rotate(angle, vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;

      var x_prime = vector.x + (x * Math.cos(angle) - y * Math.sin(angle));
      var y_prime = vector.y + (x * Math.sin(angle) + y * Math.cos(angle));

      return new V(x_prime, y_prime);
    }
  }]);

  return V;
}();

// Constructor


var Game = function () {
  function Game(config) {
    _classCallCheck(this, Game);

    this.config = config;

    // Map starting corner left bottom, render left top
    // IDEA: Chunks for more performence
    this.Map = function () {
      function _class(config) {
        _classCallCheck(this, _class);

        this.width = config.width;
        this.height = config.height;
        this.entitys = [];
      }

      _createClass(_class, [{
        key: 'addEntity',
        value: function addEntity(entity) {
          this.entitys.push(entity);
        }
      }]);

      return _class;
    }();

    this.Entity = function () {
      function _class2(_ref) {
        var _ref$positionX = _ref.positionX;
        var positionX = _ref$positionX === undefined ? 0 : _ref$positionX;
        var _ref$positionY = _ref.positionY;
        var positionY = _ref$positionY === undefined ? 0 : _ref$positionY;
        var _ref$centerX = _ref.centerX;
        var centerX = _ref$centerX === undefined ? 0 : _ref$centerX;
        var _ref$centerY = _ref.centerY;
        var centerY = _ref$centerY === undefined ? 0 : _ref$centerY;
        var _ref$angle = _ref.angle;
        var angle = _ref$angle === undefined ? 0 : _ref$angle;
        var _ref$texture = _ref.texture;
        var texture = _ref$texture === undefined ? 0 : _ref$texture;
        var _ref$height = _ref.height;
        var height = _ref$height === undefined ? 0 : _ref$height;
        var _ref$width = _ref.width;
        var width = _ref$width === undefined ? 0 : _ref$width;
        var _ref$hitbox = _ref.hitbox;
        var hitbox = _ref$hitbox === undefined ? 0 : _ref$hitbox;
        var _ref$solid = _ref.solid;
        var solid = _ref$solid === undefined ? false : _ref$solid;
        var _ref$static = _ref.static;
        var staticElem = _ref$static === undefined ? false : _ref$static;

        _classCallCheck(this, _class2);

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

        this.collision = false;

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

      _createClass(_class2, [{
        key: 'checkCollision',
        value: function checkCollision(entity) {
          var lastDot = this.hitbox[0].add(this.position);

          for (var i = 1; i < this.hitbox.length; i++) {
            var dot = this.hitbox[i].add(this.position);

            var a = dot.subtract(lastDot);
            var scalar = a.y / a.x;
            console.log(scalar);

            var lastDot2 = entity.hitbox[0].add(entity.position);
            var posX = lastDot2.y * scalar;
            var more = posX < lastDot.x ? true : false;

            for (var o = 1; o < entity.hitbox.length; o++) {
              var dot2 = entity.hitbox[i].add(entity.position);
              var posX2 = dot2.y * scalar;
              var more2 = posX < dot2.x ? true : false;
              if (more != more2) {
                return true;
              }
              more = more2;
            }

            // console.log(this.hitbox[i]);
          }

          return false;
        }
      }, {
        key: 'calculateCenter',
        value: function calculateCenter() {
          return new V();
        }
      }, {
        key: 'applyForce',
        value: function applyForce() {}
      }]);

      return _class2;
    }();

    this.map = new this.Map(this.config.map);
    var texture = new Image();
    texture.src = "assets/images/dirt.png";

    this.map.addEntity(new this.Entity({
      positionX: 0,
      positionY: 0,

      texture: texture,

      angle: 0,

      centerX: 10,
      centerY: 10,

      height: 20,
      width: 20,

      hitbox: [new V(0, 0), new V(20, 0), new V(0, 20)],

      solid: true,
      static: true
    }));

    this.map.addEntity(new this.Entity({
      positionX: 50,
      positionY: 50,

      texture: texture,

      angle: 0,

      centerX: 10,
      centerY: 10,

      height: 20,
      width: 20,

      hitbox: [new V(0, 0), new V(20, 0), new V(0, 20)],

      solid: true,
      static: true
    }));

    // Timer for gameloop
    this.expectedInterval = window.performance.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }

  _createClass(Game, [{
    key: 'input',
    value: function input() {}

    // catch up loop

  }, {
    key: 'gameLoop',
    value: function gameLoop() {
      this.input();
      var overtime = window.performance.now() - this.expectedInterval;

      if (overtime > this.config.gameLoopInterval) {
        this.overtimeError(overtime);
        this.expectedInterval = window.performance.now();
        // error, overtime longer then Interval, sync with server...
      }

      var delay = overtime + this.config.gameLoopInterval;
      // console.log(delay);

      // physics here
      for (var i = 0; i < this.map.entitys.length; i++) {
        var entity = this.map.entitys[i];
        for (var o = 0; o < this.map.entitys.length; o++) {
          var entity2 = this.map.entitys[o];
          if (entity != entity2) {
            if (entity.checkCollision(entity2)) {
              entity.collision = true;
            }
          }
        }
      }

      this.expectedInterval += this.config.gameLoopInterval;
      setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
    }
  }, {
    key: 'overtimeError',
    value: function overtimeError(overtime) {
      console.error("overtimeError: " + overtime);
    }
  }]);

  return Game;
}();

var Render = function () {
  function Render(game, canvasParent, debugging) {
    _classCallCheck(this, Render);

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
    };

    // adding new prototypes for rendering and debugging
    game.Entity.prototype.renderHitbox = function (ctx) {
      var x = this.position.x,
          y = this.position.y;

      ctx.beginPath();
      ctx.moveTo(this.hitbox[0].x - this.center.x, this.hitbox[0].y - this.center.y);

      for (var position = 0; position < this.hitbox.length; position++) {
        var localHitbox = this.hitbox[position];
        ctx.lineTo(localHitbox.x - this.center.x, localHitbox.y - this.center.y);
        ctx.moveTo(localHitbox.x - this.center.x, localHitbox.y - this.center.y);
      }

      ctx.lineTo(this.hitbox[0].x - this.center.x, this.hitbox[0].y - this.center.y);

      if (this.collision) {
        ctx.strokeStyle = '#ff0000';
      }

      ctx.stroke();
    };

    game.Entity.prototype.renderTexture = function (ctx) {
      var x = this.position.x,
          y = this.position.y,
          height = this.height,
          width = this.width;

      ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, height, width);
    };

    // this.render();
    // setTimeout(this.render.bind(this), 1);
    // setTimeout(this.render.bind(this), 1000);

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }

  _createClass(Render, [{
    key: 'render',
    value: function render() {

      // Clear old stuff
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i = 0; i < game.map.entitys.length; i++) {
        this.ctx.save();

        var entity = game.map.entitys[i];

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
  }, {
    key: 'transformContent',
    value: function transformContent(ctx, entity) {
      var x = entity.position.x,
          y = entity.position.y,
          angle = entity.angle;

      // add center to it so it can rotate from center
      ctx.translate(x + entity.center.x, y + entity.center.y);
      ctx.rotate(angle);
    }
  }]);

  return Render;
}();

/**
 * Input for user inputs.
 * Communicator for communicating to WebSocket
 */


var Input = function Input(game) {
  var _this = this;

  _classCallCheck(this, Input);

  this.game = game;

  this.keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRigth: false
  };
  var keys = this.keys;

  this.game.__proto__.input = function () {
    var v = new V(0, 0);
    if (keys.w) {
      v.y--;
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
    this.map.entitys[0].position = this.map.entitys[0].position.add(v);
  };

  window.addEventListener('keydown', function (e) {
    if (_this.keys.hasOwnProperty(e.key)) {
      _this.keys[e.key] = true;
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', function (e) {
    if (_this.keys.hasOwnProperty(e.key)) {
      _this.keys[e.key] = false;
      e.preventDefault();
    }
  });
};

var game = new Game(CONFIG);
var input = new Input(game);

document.addEventListener('DOMContentLoaded', function () {
  var render = new Render(game, document.body, {
    renderHitbox: true
  });
});