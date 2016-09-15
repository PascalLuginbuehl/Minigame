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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONFIG = {
  gameLoopInterval: 16,

  map: {
    height: 1000,
    width: 1000
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
  function V(x, y) {
    _classCallCheck(this, V);

    this.x = x;
    this.y = y;
  }

  _createClass(V, [{
    key: 'add',
    value: function add(v) {
      return new V(v.x + this.x, v.y + this.y);
    }
  }, {
    key: 'subtract',
    value: function subtract(v) {
      return new V(this.x - v.x, this.y - v.y);
    }
  }, {
    key: 'scale',
    value: function scale(s) {
      return new V(this.x * s, this.y * s);
    }
  }, {
    key: 'dot',
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: 'cross',
    value: function cross(v) {
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

var Shape = function () {
  function Shape() {
    _classCallCheck(this, Shape);

    this.position = new V(0, 0);
  }

  _createClass(Shape, [{
    key: 'checkCollision',
    value: function checkCollision(shape) {}
  }]);

  return Shape;
}();

var Circle = function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle() {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, x, y));

    _this.center = new V(0, 0);
    _this.radius = 0;
    return _this;
  }

  return Circle;
}(Shape);

var Rectangle = function (_Shape2) {
  _inherits(Rectangle, _Shape2);

  function Rectangle() {
    _classCallCheck(this, Rectangle);

    var _this2 = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, x, y));

    _this2.max = new V(0, 0);
    _this2._rotation = 0;
    return _this2;
  }

  _createClass(Rectangle, [{
    key: 'rotation',
    get: function get() {
      return this._rotation;
    },
    set: function set(rotation) {
      this._rotation = rotation;
    }
  }]);

  return Rectangle;
}(Shape);

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
        var _ref$sizeX = _ref.sizeX;
        var sizeX = _ref$sizeX === undefined ? 10 : _ref$sizeX;
        var _ref$sizeY = _ref.sizeY;
        var sizeY = _ref$sizeY === undefined ? 10 : _ref$sizeY;
        var _ref$texture = _ref.texture;
        var texture = _ref$texture === undefined ? 0 : _ref$texture;
        var _ref$solid = _ref.solid;
        var solid = _ref$solid === undefined ? false : _ref$solid;
        var _ref$static = _ref.static;
        var staticElem = _ref$static === undefined ? false : _ref$static;

        _classCallCheck(this, _class2);

        // position
        // left top of hitbox
        this.position = new V(positionX, positionY);

        // velocity for movement
        this.velocity = new V(0, 0);

        // pulls into Direction
        this.force = new V(0, 0);

        this.size = new V(sizeX, sizeY);

        this.angle = 0;

        this.center = new V(0, 0);

        // IDEA: z-index

        // IDEA: Also able to set via reference to type
        this.texture = texture;

        // parameters
        this.solid = solid;
        this.static = staticElem;
      }

      _createClass(_class2, [{
        key: 'checkCollision',
        value: function checkCollision(entity) {
          if (this.position.x < entity.position.x + entity.size.x && this.position.x + this.size.x > entity.position.x && this.position.y < entity.position.y + entity.size.y && this.position.y + this.size.x > entity.position.y) {
            return true;
          }
          return false;
        }
      }]);

      return _class2;
    }();

    this.map = new this.Map(this.config.map);
    var texture = new Image();
    texture.src = "assets/images/dirt.png";

    this.map.addEntity(new this.Entity({
      positionX: 50,
      positionY: 50,

      sizeX: 16,
      sizeY: 16,

      texture: texture,

      solid: true,
      static: false
    }));
    this.map.addEntity(new this.Entity({
      positionX: 50,
      positionY: 50,

      sizeX: 16,
      sizeY: 16,

      texture: texture,

      solid: true,
      static: false
    }));

    // Timer for gameloop
    this.expectedInterval = window.performance.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }

  // catch up loop


  _createClass(Game, [{
    key: 'gameLoop',
    value: function gameLoop() {
      // special for communicator and input
      this.specialInput();

      var overtime = window.performance.now() - this.expectedInterval;

      if (overtime > this.config.gameLoopInterval) {
        this.overtimeError(overtime);
        this.expectedInterval = window.performance.now();
        // error, overtime longer then Interval, sync with server...
      }

      var delay = (overtime + this.config.gameLoopInterval) / 1000;
      // console.log(delay);

      // physics here
      for (var i = 0; i < this.map.entitys.length; i++) {
        var entity = this.map.entitys[i];

        if (!entity.static) {
          var acceleration = entity.force.scale(2000);
          // idk wahts betta
          // let friction = 0.08;
          var friction = 0.8;
          // entity.velocity = entity.velocity.add(acceleration.subtract(entity.velocity.scale(friction)));
          entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(.92);
          // console.log(entity.velocity);
          entity.position = entity.position.add(entity.velocity.scale(delay));
          // velocity += acceleration * time_step
          // position += velocity * time_step


          // collisions
          for (var o = 0; o < this.map.entitys.length; o++) {
            var entity2 = this.map.entitys[o];
            // check collision
            if (entity != entity2 && entity.solid) {
              // FIXME: do better physX
              console.log(entity.checkCollision(entity2));
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
  }, {
    key: 'specialInput',
    value: function specialInput() {}
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

    game.Entity.prototype.renderTexture = function (ctx) {
      ctx.save();

      // add center to it so it can rotate from center
      ctx.translate(this.position.x + this.center.x, this.position.y + this.center.y);
      ctx.rotate(this.angle);

      ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, this.size.x, this.size.y);
      ctx.restore();
    };

    // this.render();
    // setTimeout(this.render.bind(this), 1);

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }

  _createClass(Render, [{
    key: 'render',
    value: function render() {

      // Clear old stuff
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i = 0; i < game.map.entitys.length; i++) {
        var entity = game.map.entitys[i];
        entity.renderTexture(this.ctx);
      }
    }
  }]);

  return Render;
}();

/**
 * Input for user inputs.
 * Communicator for communicating to WebSocket
 */


var Input = function Input(game) {
  var _this3 = this;

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

  game.__proto__.specialInput = function () {
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
    this.map.entitys[0].force = v;
  };

  window.addEventListener('keydown', function (e) {
    if (_this3.keys.hasOwnProperty(e.key)) {
      _this3.keys[e.key] = true;
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', function (e) {
    if (_this3.keys.hasOwnProperty(e.key)) {
      _this3.keys[e.key] = false;
      e.preventDefault();
    }
  });
};

/**
 * Errorhandling for Client Server has its own...
 */


var Communicator = function Communicator(game) {
  var _this4 = this;

  _classCallCheck(this, Communicator);

  this.game = game;
  game.__proto__.overtimeError = function (overtime) {
    // console.log(overtime);
    // console.log(this);
    _this4.expectedInterval = window.performance.now();
  };
};

var game = new Game(CONFIG);
var input = new Input(game);
var communicator = new Communicator(game, input);

document.addEventListener('DOMContentLoaded', function () {
  var render = new Render(game, document.body, {
    renderHitbox: true
  });
});