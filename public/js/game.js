'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Rectangle = function () {
  function Rectangle(_ref) {
    var x = _ref.x;
    var y = _ref.y;
    var w = _ref.w;
    var h = _ref.h;

    _classCallCheck(this, Rectangle);

    this.min = new V(x, y);
    this.max = new V(w, h);
    this._rotation = 0;
    var rotation = 5;
    this.center = new V(0, 0);
  }

  _createClass(Rectangle, [{
    key: 'rotation',
    get: function get() {
      console.log(rotation, "asd");
      return rotation;
    },
    set: function set(rotation) {
      this._rotation = rotation;
    }
  }]);

  return Rectangle;
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
      function _class2(_ref2) {
        var _ref2$positionX = _ref2.positionX;
        var positionX = _ref2$positionX === undefined ? 0 : _ref2$positionX;
        var _ref2$positionY = _ref2.positionY;
        var positionY = _ref2$positionY === undefined ? 0 : _ref2$positionY;
        var _ref2$sizeX = _ref2.sizeX;
        var sizeX = _ref2$sizeX === undefined ? 10 : _ref2$sizeX;
        var _ref2$sizeY = _ref2.sizeY;
        var sizeY = _ref2$sizeY === undefined ? 10 : _ref2$sizeY;
        var _ref2$texture = _ref2.texture;
        var texture = _ref2$texture === undefined ? 0 : _ref2$texture;
        var _ref2$solid = _ref2.solid;
        var solid = _ref2$solid === undefined ? false : _ref2$solid;
        var _ref2$static = _ref2.static;
        var staticElem = _ref2$static === undefined ? false : _ref2$static;

        _classCallCheck(this, _class2);

        // position
        // left top of hitbox
        this.position = new V(positionX, positionY);

        // velocity for movement
        this.velocity = new V(0, 0);

        // pulls into Direction
        this.force = new V(0, 0);

        this.size = new V(sizeX, sizeY);
        this.hitbox = new Rectangle({ x: 0, y: 0, w: 10, h: 10 });

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

/**
 * Errorhandling for Client Server has its own...
 */


var Communicator = function Communicator(game) {
  var _this2 = this;

  _classCallCheck(this, Communicator);

  this.game = game;
  game.__proto__.overtimeError = function (overtime) {
    // console.log(overtime);
    // console.log(this);
    _this2.expectedInterval = window.performance.now();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWUuanMiXSwibmFtZXMiOlsiQ09ORklHIiwiZ2FtZUxvb3BJbnRlcnZhbCIsIm1hcCIsImhlaWdodCIsIndpZHRoIiwidGV4dHVyZXMiLCJkaXJ0IiwidHlwZXMiLCJzb2xpZCIsInN0YXRpYyIsInNpemUiLCJWIiwieCIsInkiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0aGlzIiwidiIsInMiLCJhbmdsZSIsInZlY3RvciIsInhfcHJpbWUiLCJNYXRoIiwiY29zIiwic2luIiwieV9wcmltZSIsIlJlY3RhbmdsZSIsIl9yZWYiLCJ3IiwiaCIsIm1pbiIsIm1heCIsIl9yb3RhdGlvbiIsImNlbnRlciIsImNvbnNvbGUiLCJsb2ciLCJyb3RhdGlvbiIsIkdhbWUiLCJjb25maWciLCJNYXAiLCJfY2xhc3MiLCJlbnRpdHlzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJlbnRpdHkiLCJwdXNoIiwiRW50aXR5IiwiX2NsYXNzMiIsIl9yZWYyIiwiX3JlZjIkcG9zaXRpb25YIiwicG9zaXRpb25YIiwidW5kZWZpbmVkIiwiX3JlZjIkcG9zaXRpb25ZIiwicG9zaXRpb25ZIiwiX3JlZjIkc2l6ZVgiLCJzaXplWCIsIl9yZWYyJHNpemVZIiwic2l6ZVkiLCJfcmVmMiR0ZXh0dXJlIiwidGV4dHVyZSIsIl9yZWYyJHNvbGlkIiwiX3JlZjIkc3RhdGljIiwic3RhdGljRWxlbSIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJmb3JjZSIsImhpdGJveCIsIkltYWdlIiwic3JjIiwiYWRkRW50aXR5IiwiZXhwZWN0ZWRJbnRlcnZhbCIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibm93Iiwic2V0VGltZW91dCIsImdhbWVMb29wIiwiYmluZCIsInNwZWNpYWxJbnB1dCIsIm92ZXJ0aW1lIiwib3ZlcnRpbWVFcnJvciIsImRlbGF5IiwiaSIsImxlbmd0aCIsImFjY2VsZXJhdGlvbiIsInNjYWxlIiwiYWRkIiwibyIsImVudGl0eTIiLCJjaGVja0NvbGxpc2lvbiIsImVycm9yIiwiUmVuZGVyIiwiZ2FtZSIsImNhbnZhc1BhcmVudCIsImRlYnVnZ2luZyIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJpbWFnZVJlbmRlcmluZyIsImN0eCIsImdldENvbnRleHQiLCJwcm90b3R5cGUiLCJyZW5kZXJUZXh0dXJlIiwic2F2ZSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsImRyYXdJbWFnZSIsInJlc3RvcmUiLCJzZXRJbnRlcnZhbCIsInJlbmRlciIsInJvdW5kIiwiY2xlYXJSZWN0IiwiSW5wdXQiLCJfdGhpcyIsImtleXMiLCJhIiwiZCIsIkFycm93VXAiLCJBcnJvd0xlZnQiLCJBcnJvd0Rvd24iLCJBcnJvd1JpZ3RoIiwiX19wcm90b19fIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJoYXNPd25Qcm9wZXJ0eSIsInByZXZlbnREZWZhdWx0IiwiQ29tbXVuaWNhdG9yIiwiX3RoaXMyIiwiaW5wdXQiLCJjb21tdW5pY2F0b3IiLCJib2R5IiwicmVuZGVySGl0Ym94Il0sIm1hcHBpbmdzIjoiQUFBQSw2WEFFTUEsUUFDSkMsaUJBQWtCLEdBRWxCQyxLQUNFQyxPQUFRLElBQ1JDLE1BQU8sS0FHVEMsVUFDRUMsS0FBUSxZQUdWQyxPQUNFRCxNQUNFRSxPQUFPLEVBQ1BDLFVBQVEsRUFDUkMsTUFDRVAsT0FBUSxJQUNSQyxNQUFPLFFBTVRPLGFBQ0osUUFBQUEsR0FBYUMsRUFBR0MsR0FBR0MsZ0JBQUFDLEtBQUFKLEdBQ2pCSSxLQUFLSCxFQUFJQSxFQUNURyxLQUFLRixFQUFJQSxtREFHUEcsR0FDRixNQUFPLElBQUlMLEdBQUVLLEVBQUVKLEVBQUlHLEtBQUtILEVBQUdJLEVBQUVILEVBQUlFLEtBQUtGLG9DQUcvQkcsR0FDUCxNQUFPLElBQUlMLEdBQUVJLEtBQUtILEVBQUlJLEVBQUVKLEVBQUdHLEtBQUtGLEVBQUlHLEVBQUVILGlDQUdsQ0ksR0FDSixNQUFPLElBQUlOLEdBQUVJLEtBQUtILEVBQUlLLEVBQUdG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LE1BQVNqRCxHQUcvQnVELE9BQU9vRCxpQkFBaUIsVUFBVyxTQUFDQyxHQUM5QlYsRUFBS0MsS0FBS1UsZUFBZUQsRUFBRWxGLE9BQzdCd0UsRUFBS0MsS0FBS1MsRUFBRWxGLE1BQU8sRUFDbkJrRixFQUFFRSxvQkFJTnZELE9BQU9vRCxpQkFBaUIsUUFBUyxTQUFDQyxHQUM1QlYsRUFBS0MsS0FBS1UsZUFBZUQsRUFBRWxGLE9BQzdCd0UsRUFBS0MsS0FBS1MsRUFBRWxGLE1BQU8sRUFDbkJrRixFQUFFRSxxQkFVSkMsYUFDSixRQUFBQSxHQUFZcEMsR0FBTSxHQUFBcUMsR0FBQWpILElBQUFELGlCQUFBQyxLQUFBZ0gsR0FDaEJoSCxLQUFLNEUsS0FBT0EsRUFDWkEsRUFBSytCLFVBQVUzQyxjQUFnQixTQUFDRCxHQUc5QmtELEVBQUsxRCxpQkFBbUJDLE9BQU9DLFlBQVlDLFFBSzdDa0IsS0FBTyxHQUFJdkQsTUFBS3BDLFFBQ2hCaUksTUFBUSxHQUFJaEIsT0FBTXRCLE1BQ2xCdUMsYUFBZSxHQUFJSCxjQUFhcEMsS0FBTXNDLE1BRTFDbEMsVUFBUzRCLGlCQUFpQixtQkFBb0IsV0FDL0IsR0FBSWpDLFFBQU9DLEtBQU1JLFNBQVNvQyxNQUNyQ0MsY0FBYyIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5jb25zdCBDT05GSUcgPSB7XHJcbiAgZ2FtZUxvb3BJbnRlcnZhbDogMTYsXHJcblxyXG4gIG1hcDoge1xyXG4gICAgaGVpZ2h0OiAxMDAwLFxyXG4gICAgd2lkdGg6IDEwMDAsXHJcbiAgfSxcclxuXHJcbiAgdGV4dHVyZXM6IHtcclxuICAgICdkaXJ0JzogJ2RpcnQucG5nJyxcclxuICB9LFxyXG5cclxuICB0eXBlczoge1xyXG4gICAgZGlydDoge1xyXG4gICAgICBzb2xpZDogdHJ1ZSxcclxuICAgICAgc3RhdGljOiB0cnVlLFxyXG4gICAgICBzaXplOiB7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAsXHJcbiAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbn1cclxuXHJcbmNsYXNzIFYge1xyXG4gIGNvbnN0cnVjdG9yICh4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIGFkZCh2KSB7XHJcbiAgICByZXR1cm4gbmV3IFYodi54ICsgdGhpcy54LCB2LnkgKyB0aGlzLnkpO1xyXG4gIH1cclxuXHJcbiAgc3VidHJhY3Qodikge1xyXG4gICAgcmV0dXJuIG5ldyBWKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55KTtcclxuICB9XHJcblxyXG4gIHNjYWxlKHMpIHtcclxuICAgIHJldHVybiBuZXcgVih0aGlzLnggKiBzLCB0aGlzLnkgKiBzKTtcclxuICB9XHJcblxyXG4gIGRvdCh2KSB7XHJcbiAgICByZXR1cm4gKHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSk7XHJcbiAgfVxyXG5cclxuICBjcm9zcyh2KSB7XHJcbiAgICByZXR1cm4gKHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUsIHZlY3Rvcikge1xyXG4gICAgbGV0IHggPSB0aGlzLnggLSB2ZWN0b3IueDtcclxuICAgIGxldCB5ID0gdGhpcy55IC0gdmVjdG9yLnk7XHJcblxyXG4gICAgbGV0IHhfcHJpbWUgPSB2ZWN0b3IueCArICgoeCAqIE1hdGguY29zKGFuZ2xlKSkgLSAoeSAqIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgbGV0IHlfcHJpbWUgPSB2ZWN0b3IueSArICgoeCAqIE1hdGguc2luKGFuZ2xlKSkgKyAoeSAqIE1hdGguY29zKGFuZ2xlKSkpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVih4X3ByaW1lLCB5X3ByaW1lKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBSZWN0YW5nbGUge1xyXG4gIGNvbnN0cnVjdG9yKHt4OiB4LCB5OiB5LCB3OiB3LCBoOiBofSkge1xyXG4gICAgdGhpcy5taW4gPSBuZXcgVih4LCB5KTtcclxuICAgIHRoaXMubWF4ID0gbmV3IFYodywgaCk7XHJcbiAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XHJcbiAgICBsZXQgcm90YXRpb24gPSA1O1xyXG4gICAgdGhpcy5jZW50ZXIgPSBuZXcgVigwLCAwKTtcclxuICB9XHJcblxyXG4gIGdldCByb3RhdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKHJvdGF0aW9uLCBcImFzZFwiKTtcclxuICAgIHJldHVybiByb3RhdGlvbjtcclxuICB9XHJcblxyXG4gIHNldCByb3RhdGlvbihyb3RhdGlvbikge1xyXG4gICAgdGhpcy5fcm90YXRpb24gPSByb3RhdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbi8vIENvbnN0cnVjdG9yXHJcbmNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgLy8gTWFwIHN0YXJ0aW5nIGNvcm5lciBsZWZ0IGJvdHRvbSwgcmVuZGVyIGxlZnQgdG9wXHJcbiAgICAvLyBJREVBOiBDaHVua3MgZm9yIG1vcmUgcGVyZm9ybWVuY2VcclxuICAgIHRoaXMuTWFwID0gY2xhc3Mge1xyXG4gICAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gY29uZmlnLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcclxuICAgICAgICB0aGlzLmVudGl0eXMgPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYWRkRW50aXR5IChlbnRpdHkpIHtcclxuICAgICAgICB0aGlzLmVudGl0eXMucHVzaChlbnRpdHkpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRW50aXR5ID0gY2xhc3Mge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih7cG9zaXRpb25YID0gMCwgcG9zaXRpb25ZID0gMCwgc2l6ZVggPSAxMCwgc2l6ZVkgPSAxMCwgdGV4dHVyZSA9IDAsIHNvbGlkID0gZmFsc2UsIHN0YXRpYzogc3RhdGljRWxlbSA9IGZhbHNlfSkge1xyXG4gICAgICAgIC8vIHBvc2l0aW9uXHJcbiAgICAgICAgLy8gbGVmdCB0b3Agb2YgaGl0Ym94XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcclxuXHJcbiAgICAgICAgLy8gdmVsb2NpdHkgZm9yIG1vdmVtZW50XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWKDAsIDApO1xyXG5cclxuICAgICAgICAvLyBwdWxscyBpbnRvIERpcmVjdGlvblxyXG4gICAgICAgIHRoaXMuZm9yY2UgPSBuZXcgVigwLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gbmV3IFYoc2l6ZVgsIHNpemVZKTtcclxuICAgICAgICB0aGlzLmhpdGJveCA9IG5ldyBSZWN0YW5nbGUoe3g6IDAsIHk6IDAsIHc6IDEwLCBoOiAxMH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gSURFQTogei1pbmRleFxyXG5cclxuICAgICAgICAvLyBJREVBOiBBbHNvIGFibGUgdG8gc2V0IHZpYSByZWZlcmVuY2UgdG8gdHlwZVxyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcblxyXG5cclxuICAgICAgICAvLyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgdGhpcy5zb2xpZCA9IHNvbGlkO1xyXG4gICAgICAgIHRoaXMuc3RhdGljID0gc3RhdGljRWxlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2hlY2tDb2xsaXNpb24oZW50aXR5KSB7XHJcbiAgICAgICAgaWYodGhpcy5wb3NpdGlvbi54IDwgZW50aXR5LnBvc2l0aW9uLnggKyBlbnRpdHkuc2l6ZS54ICYmIHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54ID4gZW50aXR5LnBvc2l0aW9uLnggJiYgdGhpcy5wb3NpdGlvbi55IDwgZW50aXR5LnBvc2l0aW9uLnkgKyBlbnRpdHkuc2l6ZS55ICYmIHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS54ID4gZW50aXR5LnBvc2l0aW9uLnkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5tYXAgPSBuZXcgdGhpcy5NYXAodGhpcy5jb25maWcubWFwKTtcclxuICAgIGxldCB0ZXh0dXJlID0gbmV3IEltYWdlKCk7XHJcbiAgICB0ZXh0dXJlLnNyYyA9IFwiYXNzZXRzL2ltYWdlcy9kaXJ0LnBuZ1wiO1xyXG5cclxuICAgIHRoaXMubWFwLmFkZEVudGl0eShuZXcgdGhpcy5FbnRpdHkoe1xyXG4gICAgICBwb3NpdGlvblg6IDUwLFxyXG4gICAgICBwb3NpdGlvblk6IDUwLFxyXG5cclxuICAgICAgc2l6ZVg6IDE2LFxyXG4gICAgICBzaXplWTogMTYsXHJcblxyXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlLFxyXG5cclxuICAgICAgc29saWQ6IHRydWUsXHJcbiAgICAgIHN0YXRpYzogZmFsc2UsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLm1hcC5hZGRFbnRpdHkobmV3IHRoaXMuRW50aXR5KHtcclxuICAgICAgcG9zaXRpb25YOiA1MCxcclxuICAgICAgcG9zaXRpb25ZOiA1MCxcclxuXHJcbiAgICAgIHNpemVYOiAxNixcclxuICAgICAgc2l6ZVk6IDE2LFxyXG5cclxuICAgICAgdGV4dHVyZTogdGV4dHVyZSxcclxuXHJcbiAgICAgIHNvbGlkOiB0cnVlLFxyXG4gICAgICBzdGF0aWM6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuXHJcbiAgICAvLyBUaW1lciBmb3IgZ2FtZWxvb3BcclxuICAgIHRoaXMuZXhwZWN0ZWRJbnRlcnZhbCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSArIHRoaXMuY29uZmlnLmdhbWVMb29wSW50ZXJ2YWw7XHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuZ2FtZUxvb3AuYmluZCh0aGlzKSwgdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbCk7XHJcbiAgfVxyXG5cclxuICAvLyBjYXRjaCB1cCBsb29wXHJcbiAgZ2FtZUxvb3AoKSB7XHJcbiAgICAvLyBzcGVjaWFsIGZvciBjb21tdW5pY2F0b3IgYW5kIGlucHV0XHJcbiAgICB0aGlzLnNwZWNpYWxJbnB1dCgpO1xyXG5cclxuICAgIGxldCBvdmVydGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMuZXhwZWN0ZWRJbnRlcnZhbDtcclxuXHJcbiAgICBpZiAob3ZlcnRpbWUgPiB0aGlzLmNvbmZpZy5nYW1lTG9vcEludGVydmFsKSB7XHJcbiAgICAgIHRoaXMub3ZlcnRpbWVFcnJvcihvdmVydGltZSk7XHJcbiAgICAgIHRoaXMuZXhwZWN0ZWRJbnRlcnZhbCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgLy8gZXJyb3IsIG92ZXJ0aW1lIGxvbmdlciB0aGVuIEludGVydmFsLCBzeW5jIHdpdGggc2VydmVyLi4uXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRlbGF5ID0gKG92ZXJ0aW1lICsgdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbCkgLyAxMDAwO1xyXG4gICAgLy8gY29uc29sZS5sb2coZGVsYXkpO1xyXG5cclxuICAgIC8vIHBoeXNpY3MgaGVyZVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcC5lbnRpdHlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBlbnRpdHkgPSB0aGlzLm1hcC5lbnRpdHlzW2ldO1xyXG5cclxuICAgICAgaWYoIWVudGl0eS5zdGF0aWMpIHtcclxuICAgICAgICBsZXQgYWNjZWxlcmF0aW9uID0gZW50aXR5LmZvcmNlLnNjYWxlKDIwMDApO1xuICAgICAgICAvLyBpZGsgd2FodHMgYmV0dGFcclxuICAgICAgICAvLyBsZXQgZnJpY3Rpb24gPSAwLjA4O1xyXG4gICAgICAgIGxldCBmcmljdGlvbiA9IDAuODtcclxuICAgICAgICAvLyBlbnRpdHkudmVsb2NpdHkgPSBlbnRpdHkudmVsb2NpdHkuYWRkKGFjY2VsZXJhdGlvbi5zdWJ0cmFjdChlbnRpdHkudmVsb2NpdHkuc2NhbGUoZnJpY3Rpb24pKSk7XHJcbiAgICAgICAgZW50aXR5LnZlbG9jaXR5ID0gZW50aXR5LnZlbG9jaXR5LmFkZChhY2NlbGVyYXRpb24uc2NhbGUoZGVsYXkpKS5zY2FsZSguOTIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGVudGl0eS52ZWxvY2l0eSk7XHJcbiAgICAgICAgZW50aXR5LnBvc2l0aW9uID0gZW50aXR5LnBvc2l0aW9uLmFkZChlbnRpdHkudmVsb2NpdHkuc2NhbGUoZGVsYXkpKTtcclxuICAgICAgICAvLyB2ZWxvY2l0eSArPSBhY2NlbGVyYXRpb24gKiB0aW1lX3N0ZXBcclxuICAgICAgICAvLyBwb3NpdGlvbiArPSB2ZWxvY2l0eSAqIHRpbWVfc3RlcFxyXG5cclxuXHJcbiAgICAgICAgLy8gY29sbGlzaW9uc1xyXG4gICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5tYXAuZW50aXR5cy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgbGV0IGVudGl0eTIgPSB0aGlzLm1hcC5lbnRpdHlzW29dO1xyXG4gICAgICAgICAgLy8gY2hlY2sgY29sbGlzaW9uXHJcbiAgICAgICAgICBpZiAoZW50aXR5ICE9IGVudGl0eTIgJiYgZW50aXR5LnNvbGlkKSB7XHJcbiAgICAgICAgICAgIC8vIEZJWE1FOiBkbyBiZXR0ZXIgcGh5c1hcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZW50aXR5LmNoZWNrQ29sbGlzaW9uKGVudGl0eTIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5leHBlY3RlZEludGVydmFsICs9IHRoaXMuY29uZmlnLmdhbWVMb29wSW50ZXJ2YWw7XHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuZ2FtZUxvb3AuYmluZCh0aGlzKSwgdGhpcy5jb25maWcuZ2FtZUxvb3BJbnRlcnZhbCAtIG92ZXJ0aW1lKTtcclxuICB9XHJcblxyXG4gIG92ZXJ0aW1lRXJyb3Iob3ZlcnRpbWUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJvdmVydGltZUVycm9yOiBcIiArIG92ZXJ0aW1lKTtcclxuICB9XHJcblxyXG4gIHNwZWNpYWxJbnB1dCgpIHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgUmVuZGVyIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCBjYW52YXNQYXJlbnQsIGRlYnVnZ2luZykge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGdhbWUubWFwLmhlaWdodDtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gZ2FtZS5tYXAud2lkdGg7XHJcbiAgICBjYW52YXNQYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gXCJwaXhlbGF0ZWRcIjtcclxuXHJcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAvLyBwcmVsb2FkIGltYWdlc1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcbiAgICB0aGlzLmRlYnVnZ2luZyA9IGRlYnVnZ2luZztcclxuXHJcblxyXG5cclxuICAgIGdhbWUuRW50aXR5LnByb3RvdHlwZS5yZW5kZXJUZXh0dXJlID0gZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICBjdHguc2F2ZSgpO1xyXG5cclxuICAgICAgLy8gYWRkIGNlbnRlciB0byBpdCBzbyBpdCBjYW4gcm90YXRlIGZyb20gY2VudGVyXHJcbiAgICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5jZW50ZXIueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5jZW50ZXIueSk7XHJcbiAgICAgIGN0eC5yb3RhdGUodGhpcy5hbmdsZSk7XHJcblxyXG4gICAgICBjdHguZHJhd0ltYWdlKHRoaXMudGV4dHVyZSwgMCAtIHRoaXMuY2VudGVyLngsIDAgLSB0aGlzLmNlbnRlci55LCB0aGlzLnNpemUueCwgdGhpcy5zaXplLnkpO1xyXG4gICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gdGhpcy5yZW5kZXIoKTtcclxuICAgIC8vIHNldFRpbWVvdXQodGhpcy5yZW5kZXIuYmluZCh0aGlzKSwgMSk7XHJcblxyXG4gICAgLy8gc3RhbmRhcmQgSW50ZXJ2YWxcclxuICAgIHNldEludGVydmFsKHRoaXMucmVuZGVyLmJpbmQodGhpcyksIE1hdGgucm91bmQoMTAwMCAvIDYwKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmVuZGVyKCkge1xyXG5cclxuICAgIC8vIENsZWFyIG9sZCBzdHVmZlxyXG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZS5tYXAuZW50aXR5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgZW50aXR5ID0gZ2FtZS5tYXAuZW50aXR5c1tpXTtcclxuICAgICAgZW50aXR5LnJlbmRlclRleHR1cmUodGhpcy5jdHgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbnB1dCBmb3IgdXNlciBpbnB1dHMuXHJcbiAqIENvbW11bmljYXRvciBmb3IgY29tbXVuaWNhdGluZyB0byBXZWJTb2NrZXRcclxuICovXHJcbmNsYXNzIElucHV0IHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIHRoaXMua2V5cyA9IHtcclxuICAgICAgdzogZmFsc2UsXHJcbiAgICAgIGE6IGZhbHNlLFxyXG4gICAgICBzOiBmYWxzZSxcclxuICAgICAgZDogZmFsc2UsXHJcbiAgICAgIEFycm93VXA6IGZhbHNlLFxyXG4gICAgICBBcnJvd0xlZnQ6IGZhbHNlLFxyXG4gICAgICBBcnJvd0Rvd246IGZhbHNlLFxyXG4gICAgICBBcnJvd1JpZ3RoOiBmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5cyA9IHRoaXMua2V5cztcclxuXHJcbiAgICBnYW1lLl9fcHJvdG9fXy5zcGVjaWFsSW5wdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgbGV0IHYgPSBuZXcgVigwLCAwKTtcclxuICAgICAgaWYgKGtleXMudykge1xyXG4gICAgICAgIHYueS0tIDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoa2V5cy5hKSB7XHJcbiAgICAgICAgdi54LS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGtleXMucykge1xyXG4gICAgICAgIHYueSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChrZXlzLmQpIHtcclxuICAgICAgICB2LngrKztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1hcC5lbnRpdHlzWzBdLmZvcmNlID0gKHYpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgaWYgKHRoaXMua2V5cy5oYXNPd25Qcm9wZXJ0eShlLmtleSkpIHtcclxuICAgICAgICB0aGlzLmtleXNbZS5rZXldID0gdHJ1ZTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmtleXMuaGFzT3duUHJvcGVydHkoZS5rZXkpKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzW2Uua2V5XSA9IGZhbHNlO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEVycm9yaGFuZGxpbmcgZm9yIENsaWVudCBTZXJ2ZXIgaGFzIGl0cyBvd24uLi5cclxuICovXHJcbmNsYXNzIENvbW11bmljYXRvciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIGdhbWUuX19wcm90b19fLm92ZXJ0aW1lRXJyb3IgPSAob3ZlcnRpbWUpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2cob3ZlcnRpbWUpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgdGhpcy5leHBlY3RlZEludGVydmFsID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBnYW1lID0gbmV3IEdhbWUoQ09ORklHKTtcclxubGV0IGlucHV0ID0gbmV3IElucHV0KGdhbWUpO1xyXG5sZXQgY29tbXVuaWNhdG9yID0gbmV3IENvbW11bmljYXRvcihnYW1lLCBpbnB1dCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGxldCByZW5kZXIgPSBuZXcgUmVuZGVyKGdhbWUsIGRvY3VtZW50LmJvZHksIHtcclxuICAgIHJlbmRlckhpdGJveDogdHJ1ZVxyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
