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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsiQ09ORklHIiwiZ2FtZUxvb3BJbnRlcnZhbCIsIm1hcCIsImhlaWdodCIsIndpZHRoIiwidGV4dHVyZXMiLCJkaXJ0IiwidHlwZXMiLCJzb2xpZCIsInN0YXRpYyIsInNpemUiLCJWIiwieCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInkiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0aGlzIiwidiIsInMiLCJhbmdsZSIsInZlY3RvciIsInhfcHJpbWUiLCJNYXRoIiwiY29zIiwic2luIiwieV9wcmltZSIsIkdhbWUiLCJjb25maWciLCJNYXAiLCJfY2xhc3MiLCJlbnRpdHlzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJlbnRpdHkiLCJwdXNoIiwiRW50aXR5IiwiX2NsYXNzMiIsIl9yZWYiLCJfcmVmJHBvc2l0aW9uWCIsInBvc2l0aW9uWCIsIl9yZWYkcG9zaXRpb25ZIiwicG9zaXRpb25ZIiwiX3JlZiRjZW50ZXJYIiwiY2VudGVyWCIsIl9yZWYkY2VudGVyWSIsImNlbnRlclkiLCJfcmVmJGFuZ2xlIiwiX3JlZiR0ZXh0dXJlIiwidGV4dHVyZSIsIl9yZWYkaGVpZ2h0IiwiX3JlZiR3aWR0aCIsIl9yZWYkaGl0Ym94IiwiaGl0Ym94IiwiX3JlZiRzb2xpZCIsIl9yZWYkc3RhdGljIiwic3RhdGljRWxlbSIsInBvc2l0aW9uIiwibGluZWFyVmVsb2NpdHkiLCJmb3JjZSIsImNlbnRlciIsImFuZ3VsYXJWZWxvY2l0eSIsInRvcnF1ZSIsImNvbGxpc2lvbiIsImxhc3REb3QiLCJhZGQiLCJpIiwiZG90IiwiYSIsInN1YnRyYWN0Iiwic2NhbGFyIiwiY29uc29sZSIsImxvZyIsImxhc3REb3QyIiwicG9zWCIsIm1vcmUiLCJvIiwiZG90MiIsIm1vcmUyIiwiSW1hZ2UiLCJzcmMiLCJhZGRFbnRpdHkiLCJleHBlY3RlZEludGVydmFsIiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJub3ciLCJzZXRUaW1lb3V0IiwiZ2FtZUxvb3AiLCJiaW5kIiwiaW5wdXQiLCJvdmVydGltZSIsIm92ZXJ0aW1lRXJyb3IiLCJlbnRpdHkyIiwiY2hlY2tDb2xsaXNpb24iLCJlcnJvciIsIlJlbmRlciIsImdhbWUiLCJjYW52YXNQYXJlbnQiLCJkZWJ1Z2dpbmciLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiaW1hZ2VSZW5kZXJpbmciLCJjdHgiLCJnZXRDb250ZXh0IiwicHJvdG90eXBlIiwicmVuZGVyQ2VudGVyIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJyZW5kZXJIaXRib3giLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsb2NhbEhpdGJveCIsImxpbmVUbyIsInN0cm9rZVN0eWxlIiwic3Ryb2tlIiwicmVuZGVyVGV4dHVyZSIsImRyYXdJbWFnZSIsInNldEludGVydmFsIiwicmVuZGVyIiwicm91bmQiLCJjbGVhclJlY3QiLCJzYXZlIiwidHJhbnNmb3JtQ29udGVudCIsInJlc3RvcmUiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJJbnB1dCIsIl90aGlzIiwia2V5cyIsInciLCJkIiwiQXJyb3dVcCIsIkFycm93TGVmdCIsIkFycm93RG93biIsIkFycm93UmlndGgiLCJfX3Byb3RvX18iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImhhc093blByb3BlcnR5IiwicHJldmVudERlZmF1bHQiLCJib2R5Il0sIm1hcHBpbmdzIjoiQUFBQSw2WEF1Qk1BLFFBQ0pDLGlCQUFrQixHQUVsQkMsS0FDRUMsT0FBUSxJQUNSQyxNQUFPLEtBR1RDLFVBQ0VDLEtBQVEsWUFHVkMsT0FDRUQsTUFDRUUsT0FBTyxFQUNQQyxVQUFRLEVBQ1JDLE1BQ0VQLE9BQVEsSUFDUkMsTUFBTyxRQU1UTyxhQUNKLFFBQUFBLEtBQTJCLEdBQWRDLEdBQWNDLFVBQUFDLFFBQUEsR0FBQUMsU0FBQUYsVUFBQSxHQUFWLEVBQVVBLFVBQUEsR0FBUEcsRUFBT0gsVUFBQUMsUUFBQSxHQUFBQyxTQUFBRixVQUFBLEdBQUgsRUFBR0EsVUFBQSxFQUFBSSxpQkFBQUMsS0FBQVAsR0FDekJPLEtBQUtOLEVBQUlBLEVBQ1RNLEtBQUtGLEVBQUlBLHFEQUdVLEdBQWpCRyxHQUFpQk4sVUFBQUMsUUFBQSxHQUFBQyxTQUFBRixVQUFBLEdBQWIsR0FBSUYsR0FBRSxFQUFHLEdBQUlFLFVBQUEsRUFDbkIsT0FBTyxJQUFJRixHQUFFUSxFQUFFUCxFQUFJTSxLQUFLTixFQUFHTyxFQUFFSCxFQUFJRSxLQUFLRixzQ0FHZCxHQUFqQkcsR0FBaUJOLFVBQUFDLFFBQUEsR0FBQUMsU0FBQUYsVUFBQSxHQUFiLEdBQUlGLEdBQUUsRUFBRyxHQUFJRSxVQUFBLEVBQ3hCLE9BQU8sSUFBSUYsR0FBRU8sS0FBS04sRUFBSU8sRUFBRVAsRUFBR00sS0FBS0YsRUFBSUcsRUFBRUgsbUNBRzNCLEdBQVBJLEdBQU9QLFVBQUFDLFFBQUEsR0FBQUMsU0FBQUYsVUFBQSxHQUFILEVBQUdBLFVBQUEsRUFDWCxPQUFPLElBQUlGLEdBQUVPLEtBQUtOLEVBQUlRLEVBQUdGLEtBQUtGLEVBQUlJLGlDQUdmLEdBQWpCRCxHQUFpQk4sVUFBQUMsUUFBQSxHQUFBQyxTQUFBRixVQUFBLEdBQWIsR0FBSUYsR0FBRSxFQUFHLEdBQUlFLFVBQUEsRUFDbkIsT0FBUUssTUFBS04sRUFBSU8sRUFBRVAsRUFBSU0sS0FBS0YsRUFBSUcsRUFBRUgsa0NBR2IsR0FBakJHLEdBQWlCTixVQUFBQyxRQUFBLEdBQUFDLFNBQUFGLFVBQUEsR0FBYixHQUFJRixHQUFFLEVBQUcsR0FBSUUsVUFBQSxFQUNyQixPQUFRSyxNQUFLTixFQUFJTyxFQUFFSCxFQUFJRSxLQUFLRixFQUFJRyxFQUFFUCxpQ0FHN0JTLEVBQU9DLEdBQ1osR0FBSVYsR0FBSU0sS0FBS04sRUFBSVUsRUFBT1YsRUFDcEJJLEVBQUlFLEtBQUtGLEVBQUlNLEVBQU9OLEVBRXBCTyxFQUFVRCxFQUFPVixHQUFNQSxFQUFJWSxLQUFLQyxJQUFJSixHQUFXTCxFQUFJUSxLQUFLRSxJQUFJTCxJQUM1RE0sRUFBVUwsRUFBT04sR0FBTUosRUFBSVksS0FBS0UsSUFBSUwsR0FBV0wsRUFBSVEsS0FBS0MsSUFBSUosR0FFaEUsT0FBTyxJQUFJVixHQUFFWSxFQUFTSSxZQU1wQkMsZ0JBQ0osUUFBQUEsR0FBWUMsR0FBUVosZ0JBQUFDLEtBQUFVLEdBQ2xCVixLQUFLVyxPQUFTQSxFQUlkWCxLQUFLWSxJQUFMLFdBQ0UsUUFBQUMsR0FBWUYsR0FBUVosZ0JBQUFDLEtBQUFhLEdBQ2xCYixLQUFLZCxNQUFReUIsRUFBT3pCLE1BQ3BCYyxLQUFLZixPQUFTMEIsRUFBTzFCLE9BQ3JCZSxLQUFLYyxXQUpULE1BQUFDLGNBQUFGLElBQUFHLElBQUEsWUFBQUMsTUFBQSxTQU9hQyxHQUNUbEIsS0FBS2MsUUFBUUssS0FBS0QsT0FSdEJMLEtBWUFiLEtBQUtvQixPQUFMLFdBQ0UsUUFBQUMsR0FBQUMsR0FBNEssR0FBQUMsR0FBQUQsRUFBL0pFLFVBQUFBLEVBQStKM0IsU0FBQTBCLEVBQW5KLEVBQW1KQSxFQUFBRSxFQUFBSCxFQUFoSkksVUFBQUEsRUFBZ0o3QixTQUFBNEIsRUFBcEksRUFBb0lBLEVBQUFFLEVBQUFMLEVBQWpJTSxRQUFBQSxFQUFpSS9CLFNBQUE4QixFQUF2SCxFQUF1SEEsRUFBQUUsRUFBQVAsRUFBcEhRLFFBQUFBLEVBQW9IakMsU0FBQWdDLEVBQTFHLEVBQTBHQSxFQUFBRSxFQUFBVCxFQUF2R25CLE1BQUFBLEVBQXVHTixTQUFBa0MsRUFBL0YsRUFBK0ZBLEVBQUFDLEVBQUFWLEVBQTVGVyxRQUFBQSxFQUE0RnBDLFNBQUFtQyxFQUFsRixFQUFrRkEsRUFBQUUsRUFBQVosRUFBL0VyQyxPQUFBQSxFQUErRVksU0FBQXFDLEVBQXRFLEVBQXNFQSxFQUFBQyxFQUFBYixFQUFuRXBDLE1BQUFBLEVBQW1FVyxTQUFBc0MsRUFBM0QsRUFBMkRBLEVBQUFDLEVBQUFkLEVBQXhEZSxPQUFBQSxFQUF3RHhDLFNBQUF1QyxFQUEvQyxFQUErQ0EsRUFBQUUsRUFBQWhCLEVBQTVDaEMsTUFBQUEsRUFBNENPLFNBQUF5QyxHQUFwQyxFQUFvQ0EsRUFBQUMsRUFBQWpCLEVBQUFBLFVBQXJCa0IsRUFBcUIzQyxTQUFBMEMsR0FBUixFQUFRQSxDQUFBeEMsaUJBQUFDLEtBQUFxQixHQUsxS3JCLEtBQUt5QyxTQUFXLEdBQUloRCxHQUFFK0IsRUFBV0UsR0FHakMxQixLQUFLMEMsZUFBaUIsR0FBSWpELEdBQUUsRUFBRyxHQUcvQk8sS0FBSzJDLE1BQVEsR0FBSWxELEdBQUUsRUFBRyxHQUd0Qk8sS0FBSzRDLE9BQVMsR0FBSW5ELEdBQUVtQyxFQUFTRSxHQUk3QjlCLEtBQUtHLE1BQVFBLEVBQ2JILEtBQUs2QyxnQkFBa0IsRUFDdkI3QyxLQUFLOEMsT0FBUyxFQUdkOUMsS0FBSytDLFdBQVksRUFLakIvQyxLQUFLaUMsUUFBVUEsRUFHZmpDLEtBQUtmLE9BQVNBLEVBQ2RlLEtBQUtkLE1BQVFBLEVBSWJjLEtBQUtxQyxPQUFTQSxFQUlkckMsS0FBS1YsTUFBUUEsRUFDYlUsS0FBQUEsVUFBY3dDLEVBMUNsQixNQUFBekIsY0FBQU0sSUFBQUwsSUFBQSxpQkFBQUMsTUFBQSxTQTZDaUJDLEdBR2IsSUFBSyxHQUZEOEIsR0FBVWhELEtBQUtxQyxPQUFPLEdBQUdZLElBQUlqRCxLQUFLeUMsVUFFN0JTLEVBQUksRUFBR0EsRUFBSWxELEtBQUtxQyxPQUFPekMsT0FBUXNELElBQUssQ0FDM0MsR0FBSUMsR0FBTW5ELEtBQUtxQyxPQUFPYSxHQUFHRCxJQUFJakQsS0FBS3lDLFVBRTlCVyxFQUFJRCxFQUFJRSxTQUFTTCxHQUNqQk0sRUFBU0YsRUFBRXRELEVBQUlzRCxFQUFFMUQsQ0FDckI2RCxTQUFRQyxJQUFJRixFQU9aLEtBQUssR0FKREcsR0FBV3ZDLEVBQU9tQixPQUFPLEdBQUdZLElBQUkvQixFQUFPdUIsVUFDdkNpQixFQUFPRCxFQUFTM0QsRUFBSXdELEVBQ3BCSyxFQUFPRCxFQUFPVixFQUFRdEQsRUFFakJrRSxFQUFJLEVBQUdBLEVBQUkxQyxFQUFPbUIsT0FBT3pDLE9BQVFnRSxJQUFLLENBQzdDLEdBQUlDLEdBQU8zQyxFQUFPbUIsT0FBT2EsR0FBR0QsSUFBSS9CLEVBQU91QixVQUVuQ3FCLEdBRFFELEVBQUsvRCxFQUFJd0QsRUFDVEksRUFBT0csRUFBS25FLEVBQ3hCLElBQUlpRSxHQUFRRyxFQUNWLE9BQU8sQ0FFVEgsR0FBT0csR0FNWCxPQUFPLEtBekVYOUMsSUFBQSxrQkFBQUMsTUFBQSxXQTZFSSxNQUFPLElBQUl4QixNQTdFZnVCLElBQUEsYUFBQUMsTUFBQSxnQkFBQUksS0F1RkFyQixLQUFLaEIsSUFBTSxHQUFJZ0IsTUFBS1ksSUFBSVosS0FBS1csT0FBTzNCLElBQ3BDLElBQUlpRCxHQUFVLEdBQUk4QixNQUNsQjlCLEdBQVErQixJQUFNLHlCQUVkaEUsS0FBS2hCLElBQUlpRixVQUFVLEdBQUlqRSxNQUFLb0IsUUFDMUJJLFVBQVcsRUFDWEUsVUFBVyxFQUVYTyxRQUFTQSxFQUVUOUIsTUFBTyxFQUVQeUIsUUFBUyxHQUNURSxRQUFTLEdBRVQ3QyxPQUFRLEdBQ1JDLE1BQU8sR0FFUG1ELFFBQVMsR0FBSTVDLEdBQUUsRUFBRyxHQUFJLEdBQUlBLEdBQUUsR0FBSSxHQUFJLEdBQUlBLEdBQUUsRUFBRyxLQUU3Q0gsT0FBTyxFQUNQQyxVQUFRLEtBR1ZTLEtBQUtoQixJQUFJaUYsVUFBVSxHQUFJakUsTUFBS29CLFFBQzFCSSxVQUFXLEdBQ1hFLFVBQVcsR0FFWE8sUUFBU0EsRUFFVDlCLE1BQU8sRUFFUHlCLFFBQVMsR0FDVEUsUUFBUyxHQUVUN0MsT0FBUSxHQUNSQyxNQUFPLEdBRVBtRCxRQUFTLEdBQUk1QyxHQUFFLEVBQUcsR0FBSSxHQUFJQSxHQUFFLEdBQUksR0FBSSxHQUFJQSxHQUFFLEVBQUcsS0FFN0NILE9BQU8sRUFDUEMsVUFBUSxLQUtWUyxLQUFLa0UsaUJBQW1CQyxPQUFPQyxZQUFZQyxNQUFRckUsS0FBS1csT0FBTzVCLGlCQUMvRHVGLFdBQVd0RSxLQUFLdUUsU0FBU0MsS0FBS3hFLE1BQU9BLEtBQUtXLE9BQU81QiwyR0FTakRpQixLQUFLeUUsT0FDTCxJQUFJQyxHQUFXUCxPQUFPQyxZQUFZQyxNQUFRckUsS0FBS2tFLGdCQUUzQ1EsR0FBVzFFLEtBQUtXLE9BQU81QixtQkFDekJpQixLQUFLMkUsY0FBY0QsR0FDbkIxRSxLQUFLa0UsaUJBQW1CQyxPQUFPQyxZQUFZQyxNQVE3QyxLQUFLLEdBQUluQixJQUpHd0IsRUFBVzFFLEtBQUtXLE9BQU81QixpQkFJdEIsR0FBR21FLEVBQUlsRCxLQUFLaEIsSUFBSThCLFFBQVFsQixPQUFRc0QsSUFFM0MsSUFBSyxHQUREaEMsR0FBU2xCLEtBQUtoQixJQUFJOEIsUUFBUW9DLEdBQ3JCVSxFQUFJLEVBQUdBLEVBQUk1RCxLQUFLaEIsSUFBSThCLFFBQVFsQixPQUFRZ0UsSUFBSyxDQUNoRCxHQUFJZ0IsR0FBVTVFLEtBQUtoQixJQUFJOEIsUUFBUThDLEVBQzNCMUMsSUFBVTBELEdBQ1IxRCxFQUFPMkQsZUFBZUQsS0FDeEIxRCxFQUFPNkIsV0FBWSxHQU0zQi9DLEtBQUtrRSxrQkFBb0JsRSxLQUFLVyxPQUFPNUIsaUJBQ3JDdUYsV0FBV3RFLEtBQUt1RSxTQUFTQyxLQUFLeEUsTUFBT0EsS0FBS1csT0FBTzVCLGlCQUFtQjJGLHlDQUd4REEsR0FDWm5CLFFBQVF1QixNQUFNLGtCQUFvQkosWUFLaENLLGtCQUNKLFFBQUFBLEdBQVlDLEVBQU1DLEVBQWNDLEdBQVduRixnQkFBQUMsS0FBQStFLEdBQ3pDL0UsS0FBS21GLE9BQVNDLFNBQVNDLGNBQWMsVUFDckNyRixLQUFLbUYsT0FBT2xHLE9BQVMrRixFQUFLaEcsSUFBSUMsT0FDOUJlLEtBQUttRixPQUFPakcsTUFBUThGLEVBQUtoRyxJQUFJRSxNQUM3QitGLEVBQWFLLFlBQVl0RixLQUFLbUYsUUFFOUJuRixLQUFLbUYsT0FBT0ksTUFBTUMsZUFBaUIsWUFFbkN4RixLQUFLeUYsSUFBTXpGLEtBQUttRixPQUFPTyxXQUFXLE1BR2xDMUYsS0FBS2dGLEtBQU9BLEVBRVpoRixLQUFLa0YsVUFBWUEsRUFNakJGLEVBQUs1RCxPQUFPdUUsVUFBVUMsYUFBZSxTQUFVSCxHQUM3Q0EsRUFBSUksS0FBSyxFQUFHLEVBQUcsRUFBRyxHQUNsQkosRUFBSUssVUFBWSxNQUNoQkwsRUFBSU0sUUFJTmYsRUFBSzVELE9BQU91RSxVQUFVSyxhQUFlLFNBQVVQLEdBQ3JDekYsS0FBS3lDLFNBQVMvQyxFQUNkTSxLQUFLeUMsU0FBUzNDLENBRXRCMkYsR0FBSVEsWUFDSlIsRUFBSVMsT0FBT2xHLEtBQUtxQyxPQUFPLEdBQUczQyxFQUFJTSxLQUFLNEMsT0FBT2xELEVBQUdNLEtBQUtxQyxPQUFPLEdBQUd2QyxFQUFJRSxLQUFLNEMsT0FBTzlDLEVBRTVFLEtBQUssR0FBSTJDLEdBQVcsRUFBR0EsRUFBV3pDLEtBQUtxQyxPQUFPekMsT0FBUTZDLElBQVksQ0FDaEUsR0FBSTBELEdBQWNuRyxLQUFLcUMsT0FBT0ksRUFDOUJnRCxHQUFJVyxPQUFPRCxFQUFZekcsRUFBSU0sS0FBSzRDLE9BQU9sRCxFQUFHeUcsRUFBWXJHLEVBQUlFLEtBQUs0QyxPQUFPOUMsR0FDdEUyRixFQUFJUyxPQUFPQyxFQUFZekcsRUFBSU0sS0FBSzRDLE9BQU9sRCxFQUFHeUcsRUFBWXJHLEVBQUlFLEtBQUs0QyxPQUFPOUMsR0FHeEUyRixFQUFJVyxPQUFPcEcsS0FBS3FDLE9BQU8sR0FBRzNDLEVBQUlNLEtBQUs0QyxPQUFPbEQsRUFBR00sS0FBS3FDLE9BQU8sR0FBR3ZDLEVBQUlFLEtBQUs0QyxPQUFPOUMsR0FFeEVFLEtBQUsrQyxZQUNQMEMsRUFBSVksWUFBYyxXQUdwQlosRUFBSWEsVUFJTnRCLEVBQUs1RCxPQUFPdUUsVUFBVVksY0FBZ0IsU0FBVWQsR0FDOUMsR0FFSXhHLElBRkllLEtBQUt5QyxTQUFTL0MsRUFDZE0sS0FBS3lDLFNBQVMzQyxFQUNURSxLQUFLZixRQUNkQyxFQUFRYyxLQUFLZCxLQUVqQnVHLEdBQUllLFVBQVV4RyxLQUFLaUMsUUFBUyxFQUFJakMsS0FBSzRDLE9BQU9sRCxFQUFHLEVBQUlNLEtBQUs0QyxPQUFPOUMsRUFBR2IsRUFBUUMsSUFXNUV1SCxZQUFZekcsS0FBSzBHLE9BQU9sQyxLQUFLeEUsTUFBT00sS0FBS3FHLE1BQU0sSUFBTywyREFPdEQzRyxLQUFLeUYsSUFBSW1CLFVBQVUsRUFBRyxFQUFHNUcsS0FBS21GLE9BQU9qRyxNQUFPYyxLQUFLbUYsT0FBT2xHLE9BRXhELEtBQUssR0FBSWlFLEdBQUksRUFBR0EsRUFBSThCLEtBQUtoRyxJQUFJOEIsUUFBUWxCLE9BQVFzRCxJQUFLLENBQ2hEbEQsS0FBS3lGLElBQUlvQixNQUVULElBQUkzRixHQUFTOEQsS0FBS2hHLElBQUk4QixRQUFRb0MsRUFFOUJsRCxNQUFLOEcsaUJBQWlCOUcsS0FBS3lGLElBQUt2RSxHQUVoQ0EsRUFBT3FGLGNBQWN2RyxLQUFLeUYsS0FDMUJ2RSxFQUFPMEUsYUFBYTVGLEtBQUt5RixLQUVyQnpGLEtBQUtrRixVQUFVYyxjQUNqQjlFLEVBQU84RSxhQUFhaEcsS0FBS3lGLEtBSTNCekYsS0FBS3lGLElBQUlzQixvREFJSXRCLEVBQUt2RSxHQUNwQixHQUFJeEIsR0FBSXdCLEVBQU91QixTQUFTL0MsRUFDcEJJLEVBQUlvQixFQUFPdUIsU0FBUzNDLEVBQ3BCSyxFQUFRZSxFQUFPZixLQUduQnNGLEdBQUl1QixVQUFVdEgsRUFBSXdCLEVBQU8wQixPQUFPbEQsRUFBR0ksRUFBSW9CLEVBQU8wQixPQUFPOUMsR0FDckQyRixFQUFJd0IsT0FBTzlHLFlBU1QrRyxNQUNKLFFBQUFBLEdBQVlsQyxHQUFNLEdBQUFtQyxHQUFBbkgsSUFBQUQsaUJBQUFDLEtBQUFrSCxHQUNoQmxILEtBQUtnRixLQUFPQSxFQUVaaEYsS0FBS29ILE1BQ0hDLEdBQUcsRUFDSGpFLEdBQUcsRUFDSGxELEdBQUcsRUFDSG9ILEdBQUcsRUFDSEMsU0FBUyxFQUNUQyxXQUFXLEVBQ1hDLFdBQVcsRUFDWEMsWUFBWSxFQUVkLElBQUlOLEdBQU9wSCxLQUFLb0gsSUFFaEJwSCxNQUFLZ0YsS0FBSzJDLFVBQVVsRCxNQUFRLFdBQzFCLEdBQUl4RSxHQUFJLEdBQUlSLEdBQUUsRUFBRyxFQUNiMkgsR0FBS0MsR0FDUHBILEVBQUVILElBRUFzSCxFQUFLaEUsR0FDUG5ELEVBQUVQLElBRUEwSCxFQUFLbEgsR0FDUEQsRUFBRUgsSUFFQXNILEVBQUtFLEdBQ1BySCxFQUFFUCxJQUVKTSxLQUFLaEIsSUFBSThCLFFBQVEsR0FBRzJCLFNBQVd6QyxLQUFLaEIsSUFBSThCLFFBQVEsR0FBRzJCLFNBQVNRLElBQUloRCxJQUlsRWtFLE9BQU95RCxpQkFBaUIsVUFBVyxTQUFDQyxHQUM5QlYsRUFBS0MsS0FBS1UsZUFBZUQsRUFBRTdHLE9BQzdCbUcsRUFBS0MsS0FBS1MsRUFBRTdHLE1BQU8sRUFDbkI2RyxFQUFFRSxvQkFJTjVELE9BQU95RCxpQkFBaUIsUUFBUyxTQUFDQyxHQUM1QlYsRUFBS0MsS0FBS1UsZUFBZUQsRUFBRTdHLE9BQzdCbUcsRUFBS0MsS0FBS1MsRUFBRTdHLE1BQU8sRUFDbkI2RyxFQUFFRSxxQkFPTi9DLEtBQU8sR0FBSXRFLE1BQUs1QixRQUNoQjJGLE1BQVEsR0FBSXlDLE9BQU1sQyxLQUV0QkksVUFBU3dDLGlCQUFpQixtQkFBb0IsV0FDL0IsR0FBSTdDLFFBQU9DLEtBQU1JLFNBQVM0QyxNQUNyQ2hDLGNBQWMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG4vKipcclxuICogQWx3YXlzIGZpcnN0IFggdGhlbiBZXHJcbiAqIERpcmVjdGlvbnM6XHJcbiAqIFggLS1cclxuICogWSB8XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEdyYXZpdHkgZm9yIERpcmVjdGlvbiBzdGVhcmluZywgdGhlIHZlbG9jaXR5IGdldHMgaGlnaGVyLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcmxvb3BcclxuICpcclxuICogR2FtZWxvb3BcclxuICogSW1wb3J0YW50LCBzZWxmIGFkanVzdGluZyB0aW1lcnMgKGVsc2Ugbm90IGluIHN5bmMgOiggKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBJREVBOiBDaHVua3MgZm9yIGJldHRlciBwZXJmb3JtZW5jZSwgb25seSBsb2FkIGNodW5rcyBuZWFyIHRoZSBQbGF5ZXJcclxuICovXHJcblxyXG5jb25zdCBDT05GSUcgPSB7XHJcbiAgZ2FtZUxvb3BJbnRlcnZhbDogMTYsXHJcblxyXG4gIG1hcDoge1xyXG4gICAgaGVpZ2h0OiAyMDAsXHJcbiAgICB3aWR0aDogMTAwLFxyXG4gIH0sXHJcblxyXG4gIHRleHR1cmVzOiB7XHJcbiAgICAnZGlydCc6ICdkaXJ0LnBuZycsXHJcbiAgfSxcclxuXHJcbiAgdHlwZXM6IHtcclxuICAgIGRpcnQ6IHtcclxuICAgICAgc29saWQ6IHRydWUsXHJcbiAgICAgIHN0YXRpYzogdHJ1ZSxcclxuICAgICAgc2l6ZToge1xyXG4gICAgICAgIGhlaWdodDogMTAwLFxyXG4gICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59XHJcblxyXG5jbGFzcyBWIHtcclxuICBjb25zdHJ1Y3RvciAoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIGFkZCh2ID0gbmV3IFYoMCwgMCkpIHtcclxuICAgIHJldHVybiBuZXcgVih2LnggKyB0aGlzLngsIHYueSArIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICBzdWJ0cmFjdCh2ID0gbmV3IFYoMCwgMCkpIHtcclxuICAgIHJldHVybiBuZXcgVih0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSk7XHJcbiAgfVxyXG5cclxuICBzY2FsZShzID0gMCkge1xyXG4gICAgcmV0dXJuIG5ldyBWKHRoaXMueCAqIHMsIHRoaXMueSAqIHMpO1xyXG4gIH1cclxuXHJcbiAgZG90KHYgPSBuZXcgVigwLCAwKSkge1xyXG4gICAgcmV0dXJuICh0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkpO1xyXG4gIH1cclxuXHJcbiAgY3Jvc3ModiA9IG5ldyBWKDAsIDApKSB7XHJcbiAgICByZXR1cm4gKHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUsIHZlY3Rvcikge1xyXG4gICAgbGV0IHggPSB0aGlzLnggLSB2ZWN0b3IueDtcclxuICAgIGxldCB5ID0gdGhpcy55IC0gdmVjdG9yLnk7XHJcblxyXG4gICAgbGV0IHhfcHJpbWUgPSB2ZWN0b3IueCArICgoeCAqIE1hdGguY29zKGFuZ2xlKSkgLSAoeSAqIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgbGV0IHlfcHJpbWUgPSB2ZWN0b3IueSArICgoeCAqIE1hdGguc2luKGFuZ2xlKSkgKyAoeSAqIE1hdGguY29zKGFuZ2xlKSkpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVih4X3ByaW1lLCB5X3ByaW1lKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vLyBDb25zdHJ1Y3RvclxyXG5jbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIC8vIE1hcCBzdGFydGluZyBjb3JuZXIgbGVmdCBib3R0b20sIHJlbmRlciBsZWZ0IHRvcFxyXG4gICAgLy8gSURFQTogQ2h1bmtzIGZvciBtb3JlIHBlcmZvcm1lbmNlXHJcbiAgICB0aGlzLk1hcCA9IGNsYXNzIHtcclxuICAgICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGNvbmZpZy53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5lbnRpdHlzID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFkZEVudGl0eSAoZW50aXR5KSB7XHJcbiAgICAgICAgdGhpcy5lbnRpdHlzLnB1c2goZW50aXR5KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkVudGl0eSA9IGNsYXNzIHtcclxuICAgICAgY29uc3RydWN0b3Ioe3Bvc2l0aW9uWCA9IDAsIHBvc2l0aW9uWSA9IDAsIGNlbnRlclggPSAwLCBjZW50ZXJZID0gMCwgYW5nbGUgPSAwLCB0ZXh0dXJlID0gMCwgaGVpZ2h0ID0gMCwgd2lkdGggPSAwLCBoaXRib3ggPSAwLCBzb2xpZCA9IGZhbHNlLCBzdGF0aWM6IHN0YXRpY0VsZW0gPSBmYWxzZX0pIHtcclxuXHJcblxyXG4gICAgICAgIC8vIHBvc2l0aW9uXHJcbiAgICAgICAgLy8gbGVmdCB0b3Agb2YgaGl0Ym94XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcclxuXHJcbiAgICAgICAgLy8gdmVsb2NpdHkgZm9yIG1vdmVtZW50XHJcbiAgICAgICAgdGhpcy5saW5lYXJWZWxvY2l0eSA9IG5ldyBWKDAsIDApO1xyXG5cclxuICAgICAgICAvLyBwdWxscyBpbnRvIERpcmVjdGlvblxyXG4gICAgICAgIHRoaXMuZm9yY2UgPSBuZXcgVigwLCAwKTtcclxuXHJcbiAgICAgICAgLy8gY2VudGVyIG9mIG1hc3MgYW5kIHJvdGF0aW9uIHBvaW50XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBuZXcgVihjZW50ZXJYLCBjZW50ZXJZKTtcclxuXHJcblxyXG4gICAgICAgIC8vIHJvdGF0aW9uXHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgIHRoaXMuYW5ndWxhclZlbG9jaXR5ID0gMDtcclxuICAgICAgICB0aGlzLnRvcnF1ZSA9IDA7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBJREVBOiB6LWluZGV4XHJcblxyXG4gICAgICAgIC8vIElERUE6IEFsc28gYWJsZSB0byBzZXQgdmlhIHJlZmVyZW5jZSB0byB0eXBlXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgLy8gU2l6ZSBmb3IgVGV4dHVyZVxyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHJcbiAgICAgICAgLy8gQXJyYXkgb2YgcG9seWdvbnNcclxuICAgICAgICAvLyBOZWVkcyBtYXNzIGZvciBib3hzaGFwZVxyXG4gICAgICAgIHRoaXMuaGl0Ym94ID0gaGl0Ym94O1xyXG5cclxuXHJcbiAgICAgICAgLy8gcGFyYW1ldGVyc1xyXG4gICAgICAgIHRoaXMuc29saWQgPSBzb2xpZDtcclxuICAgICAgICB0aGlzLnN0YXRpYyA9IHN0YXRpY0VsZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNoZWNrQ29sbGlzaW9uKGVudGl0eSkge1xyXG4gICAgICAgIGxldCBsYXN0RG90ID0gdGhpcy5oaXRib3hbMF0uYWRkKHRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuaGl0Ym94Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgZG90ID0gdGhpcy5oaXRib3hbaV0uYWRkKHRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgIGxldCBhID0gZG90LnN1YnRyYWN0KGxhc3REb3QpO1xyXG4gICAgICAgICAgbGV0IHNjYWxhciA9IGEueSAvIGEueDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHNjYWxhcik7XHJcblxyXG5cclxuICAgICAgICAgIGxldCBsYXN0RG90MiA9IGVudGl0eS5oaXRib3hbMF0uYWRkKGVudGl0eS5wb3NpdGlvbik7XHJcbiAgICAgICAgICBsZXQgcG9zWCA9IGxhc3REb3QyLnkgKiBzY2FsYXI7XHJcbiAgICAgICAgICBsZXQgbW9yZSA9IHBvc1ggPCBsYXN0RG90LnggPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgbyA9IDE7IG8gPCBlbnRpdHkuaGl0Ym94Lmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgIGxldCBkb3QyID0gZW50aXR5LmhpdGJveFtpXS5hZGQoZW50aXR5LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHBvc1gyID0gZG90Mi55ICogc2NhbGFyO1xyXG4gICAgICAgICAgICBsZXQgbW9yZTIgPSBwb3NYIDwgZG90Mi54ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobW9yZSAhPSBtb3JlMikge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vcmUgPSBtb3JlMjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmhpdGJveFtpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbGN1bGF0ZUNlbnRlcigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFYoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXBwbHlGb3JjZSgpIHtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoaXMubWFwID0gbmV3IHRoaXMuTWFwKHRoaXMuY29uZmlnLm1hcCk7XHJcbiAgICBsZXQgdGV4dHVyZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGV4dHVyZS5zcmMgPSBcImFzc2V0cy9pbWFnZXMvZGlydC5wbmdcIjtcclxuXHJcbiAgICB0aGlzLm1hcC5hZGRFbnRpdHkobmV3IHRoaXMuRW50aXR5KHtcclxuICAgICAgcG9zaXRpb25YOiAwLFxyXG4gICAgICBwb3NpdGlvblk6IDAsXHJcblxyXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlLFxyXG5cclxuICAgICAgYW5nbGU6IDAsXHJcblxyXG4gICAgICBjZW50ZXJYOiAxMCxcclxuICAgICAgY2VudGVyWTogMTAsXHJcblxyXG4gICAgICBoZWlnaHQ6IDIwLFxyXG4gICAgICB3aWR0aDogMjAsXHJcblxyXG4gICAgICBoaXRib3g6IFtuZXcgVigwLCAwKSwgbmV3IFYoMjAsIDApLCBuZXcgVigwLCAyMCldLFxyXG5cclxuICAgICAgc29saWQ6IHRydWUsXHJcbiAgICAgIHN0YXRpYzogdHJ1ZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLm1hcC5hZGRFbnRpdHkobmV3IHRoaXMuRW50aXR5KHtcclxuICAgICAgcG9zaXRpb25YOiA1MCxcclxuICAgICAgcG9zaXRpb25ZOiA1MCxcclxuXHJcbiAgICAgIHRleHR1cmU6IHRleHR1cmUsXHJcblxyXG4gICAgICBhbmdsZTogMCxcclxuXHJcbiAgICAgIGNlbnRlclg6IDEwLFxyXG4gICAgICBjZW50ZXJZOiAxMCxcclxuXHJcbiAgICAgIGhlaWdodDogMjAsXHJcbiAgICAgIHdpZHRoOiAyMCxcclxuXHJcbiAgICAgIGhpdGJveDogW25ldyBWKDAsIDApLCBuZXcgVigyMCwgMCksIG5ldyBWKDAsIDIwKV0sXHJcblxyXG4gICAgICBzb2xpZDogdHJ1ZSxcclxuICAgICAgc3RhdGljOiB0cnVlLFxyXG4gICAgfSkpO1xyXG5cclxuXHJcbiAgICAvLyBUaW1lciBmb3IgZ2FtZWxvb3BcclxuICAgIHRoaXMuZXhwZWN0ZWRJbnRlcnZhbCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSArIHRoaXMuY29uZmlnLmdhbWVMb29wSW50ZXJ2YWw7XHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuZ2FtZUxvb3AuYmluZCh0aGlzKSwgdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbCk7XHJcbiAgfVxyXG5cclxuICBpbnB1dCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBjYXRjaCB1cCBsb29wXHJcbiAgZ2FtZUxvb3AoKSB7XHJcbiAgICB0aGlzLmlucHV0KCk7XHJcbiAgICBsZXQgb3ZlcnRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmV4cGVjdGVkSW50ZXJ2YWw7XHJcblxyXG4gICAgaWYgKG92ZXJ0aW1lID4gdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLm92ZXJ0aW1lRXJyb3Iob3ZlcnRpbWUpO1xyXG4gICAgICB0aGlzLmV4cGVjdGVkSW50ZXJ2YWwgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgIC8vIGVycm9yLCBvdmVydGltZSBsb25nZXIgdGhlbiBJbnRlcnZhbCwgc3luYyB3aXRoIHNlcnZlci4uLlxyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWxheSA9IG92ZXJ0aW1lICsgdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbDtcclxuICAgIC8vIGNvbnNvbGUubG9nKGRlbGF5KTtcclxuXHJcbiAgICAvLyBwaHlzaWNzIGhlcmVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXAuZW50aXR5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgZW50aXR5ID0gdGhpcy5tYXAuZW50aXR5c1tpXTtcclxuICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCB0aGlzLm1hcC5lbnRpdHlzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgbGV0IGVudGl0eTIgPSB0aGlzLm1hcC5lbnRpdHlzW29dO1xyXG4gICAgICAgIGlmIChlbnRpdHkgIT0gZW50aXR5Mikge1xyXG4gICAgICAgICAgaWYgKGVudGl0eS5jaGVja0NvbGxpc2lvbihlbnRpdHkyKSkge1xyXG4gICAgICAgICAgICBlbnRpdHkuY29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV4cGVjdGVkSW50ZXJ2YWwgKz0gdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbDtcclxuICAgIHNldFRpbWVvdXQodGhpcy5nYW1lTG9vcC5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5nYW1lTG9vcEludGVydmFsIC0gb3ZlcnRpbWUpO1xyXG4gIH1cclxuXHJcbiAgb3ZlcnRpbWVFcnJvcihvdmVydGltZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIm92ZXJ0aW1lRXJyb3I6IFwiICsgb3ZlcnRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIFJlbmRlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgY2FudmFzUGFyZW50LCBkZWJ1Z2dpbmcpIHtcclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBnYW1lLm1hcC5oZWlnaHQ7XHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGdhbWUubWFwLndpZHRoO1xyXG4gICAgY2FudmFzUGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZyA9IFwicGl4ZWxhdGVkXCI7XHJcblxyXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgLy8gcHJlbG9hZCBpbWFnZXNcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5kZWJ1Z2dpbmcgPSBkZWJ1Z2dpbmc7XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gYWRkaW5nIG5ldyBwcm90b3R5cGVzIGZvciByZW5kZXJpbmcgYW5kIGRlYnVnZ2luZ1xyXG4gICAgZ2FtZS5FbnRpdHkucHJvdG90eXBlLnJlbmRlckNlbnRlciA9IGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgY3R4LnJlY3QoMCwgMCwgMSwgMSk7XHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcclxuICAgICAgY3R4LmZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRpbmcgbmV3IHByb3RvdHlwZXMgZm9yIHJlbmRlcmluZyBhbmQgZGVidWdnaW5nXHJcbiAgICBnYW1lLkVudGl0eS5wcm90b3R5cGUucmVuZGVySGl0Ym94ID0gZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICBsZXQgeCA9IHRoaXMucG9zaXRpb24ueFxyXG4gICAgICAgICwgeSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHJcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgY3R4Lm1vdmVUbyh0aGlzLmhpdGJveFswXS54IC0gdGhpcy5jZW50ZXIueCwgdGhpcy5oaXRib3hbMF0ueSAtIHRoaXMuY2VudGVyLnkpO1xyXG5cclxuICAgICAgZm9yIChsZXQgcG9zaXRpb24gPSAwOyBwb3NpdGlvbiA8IHRoaXMuaGl0Ym94Lmxlbmd0aDsgcG9zaXRpb24rKykge1xyXG4gICAgICAgIGxldCBsb2NhbEhpdGJveCA9IHRoaXMuaGl0Ym94W3Bvc2l0aW9uXTtcclxuICAgICAgICBjdHgubGluZVRvKGxvY2FsSGl0Ym94LnggLSB0aGlzLmNlbnRlci54LCBsb2NhbEhpdGJveC55IC0gdGhpcy5jZW50ZXIueSk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhsb2NhbEhpdGJveC54IC0gdGhpcy5jZW50ZXIueCwgbG9jYWxIaXRib3gueSAtIHRoaXMuY2VudGVyLnkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdHgubGluZVRvKHRoaXMuaGl0Ym94WzBdLnggLSB0aGlzLmNlbnRlci54LCB0aGlzLmhpdGJveFswXS55IC0gdGhpcy5jZW50ZXIueSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb2xsaXNpb24pIHtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmMDAwMCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2FtZS5FbnRpdHkucHJvdG90eXBlLnJlbmRlclRleHR1cmUgPSBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgIGxldCB4ID0gdGhpcy5wb3NpdGlvbi54XHJcbiAgICAgICAgLCB5ID0gdGhpcy5wb3NpdGlvbi55XHJcbiAgICAgICAgLCBoZWlnaHQgPSB0aGlzLmhlaWdodFxyXG4gICAgICAgICwgd2lkdGggPSB0aGlzLndpZHRoO1xyXG5cclxuICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnRleHR1cmUsIDAgLSB0aGlzLmNlbnRlci54LCAwIC0gdGhpcy5jZW50ZXIueSwgaGVpZ2h0LCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gdGhpcy5yZW5kZXIoKTtcclxuICAgIC8vIHNldFRpbWVvdXQodGhpcy5yZW5kZXIuYmluZCh0aGlzKSwgMSk7XHJcbiAgICAvLyBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcyksIDEwMDApO1xyXG5cclxuICAgIC8vIHN0YW5kYXJkIEludGVydmFsXHJcbiAgICBzZXRJbnRlcnZhbCh0aGlzLnJlbmRlci5iaW5kKHRoaXMpLCBNYXRoLnJvdW5kKDEwMDAgLyA2MCkpO1xyXG4gIH1cclxuXHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHJcbiAgICAvLyBDbGVhciBvbGQgc3R1ZmZcclxuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdhbWUubWFwLmVudGl0eXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5jdHguc2F2ZSgpO1xyXG5cclxuICAgICAgbGV0IGVudGl0eSA9IGdhbWUubWFwLmVudGl0eXNbaV07XHJcblxyXG4gICAgICB0aGlzLnRyYW5zZm9ybUNvbnRlbnQodGhpcy5jdHgsIGVudGl0eSk7XHJcblxyXG4gICAgICBlbnRpdHkucmVuZGVyVGV4dHVyZSh0aGlzLmN0eCk7XHJcbiAgICAgIGVudGl0eS5yZW5kZXJDZW50ZXIodGhpcy5jdHgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZGVidWdnaW5nLnJlbmRlckhpdGJveCkge1xyXG4gICAgICAgIGVudGl0eS5yZW5kZXJIaXRib3godGhpcy5jdHgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyByZXN0b3JlIHN0YXR1c1xyXG4gICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGN0eCwgZW50aXR5KSB7XHJcbiAgICBsZXQgeCA9IGVudGl0eS5wb3NpdGlvbi54XHJcbiAgICAgICwgeSA9IGVudGl0eS5wb3NpdGlvbi55XHJcbiAgICAgICwgYW5nbGUgPSBlbnRpdHkuYW5nbGU7XHJcblxyXG4gICAgLy8gYWRkIGNlbnRlciB0byBpdCBzbyBpdCBjYW4gcm90YXRlIGZyb20gY2VudGVyXHJcbiAgICBjdHgudHJhbnNsYXRlKHggKyBlbnRpdHkuY2VudGVyLngsIHkgKyBlbnRpdHkuY2VudGVyLnkpO1xyXG4gICAgY3R4LnJvdGF0ZShhbmdsZSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIElucHV0IGZvciB1c2VyIGlucHV0cy5cclxuICogQ29tbXVuaWNhdG9yIGZvciBjb21tdW5pY2F0aW5nIHRvIFdlYlNvY2tldFxyXG4gKi9cclxuY2xhc3MgSW5wdXQge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5rZXlzID0ge1xyXG4gICAgICB3OiBmYWxzZSxcclxuICAgICAgYTogZmFsc2UsXHJcbiAgICAgIHM6IGZhbHNlLFxyXG4gICAgICBkOiBmYWxzZSxcclxuICAgICAgQXJyb3dVcDogZmFsc2UsXHJcbiAgICAgIEFycm93TGVmdDogZmFsc2UsXHJcbiAgICAgIEFycm93RG93bjogZmFsc2UsXHJcbiAgICAgIEFycm93UmlndGg6IGZhbHNlLFxyXG4gICAgfVxyXG4gICAgdmFyIGtleXMgPSB0aGlzLmtleXM7XHJcblxyXG4gICAgdGhpcy5nYW1lLl9fcHJvdG9fXy5pbnB1dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHYgPSBuZXcgVigwLCAwKTtcclxuICAgICAgaWYgKGtleXMudykge1xyXG4gICAgICAgIHYueS0tIDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoa2V5cy5hKSB7XHJcbiAgICAgICAgdi54LS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGtleXMucykge1xyXG4gICAgICAgIHYueSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChrZXlzLmQpIHtcclxuICAgICAgICB2LngrKztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1hcC5lbnRpdHlzWzBdLnBvc2l0aW9uID0gdGhpcy5tYXAuZW50aXR5c1swXS5wb3NpdGlvbi5hZGQodik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgaWYgKHRoaXMua2V5cy5oYXNPd25Qcm9wZXJ0eShlLmtleSkpIHtcclxuICAgICAgICB0aGlzLmtleXNbZS5rZXldID0gdHJ1ZTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmtleXMuaGFzT3duUHJvcGVydHkoZS5rZXkpKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzW2Uua2V5XSA9IGZhbHNlO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGdhbWUgPSBuZXcgR2FtZShDT05GSUcpO1xyXG5sZXQgaW5wdXQgPSBuZXcgSW5wdXQoZ2FtZSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGxldCByZW5kZXIgPSBuZXcgUmVuZGVyKGdhbWUsIGRvY3VtZW50LmJvZHksIHtcclxuICAgIHJlbmRlckhpdGJveDogdHJ1ZVxyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
