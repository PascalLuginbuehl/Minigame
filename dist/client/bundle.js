(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Game_1 = require("../../common/Game");
var Render_1 = require("../../common/Render");
var Vector_1 = require("../../common/Vector");
var Input_1 = require("../../common/Input");
var Player_1 = require("../../common/Player");
var game = new Game_1.default();
var input = new Input_1.default(game);
var player = new Player_1.default(input, 1);
document.addEventListener('DOMContentLoaded', function () {
    var render = new Render_1.default(game, document.body, function () {
        return new Vector_1.default(0, 0);
    });
});
},{"../../common/Game":4,"../../common/Input":6,"../../common/Player":9,"../../common/Render":11,"../../common/Vector":12}],2:[function(require,module,exports){
"use strict";
var Body = (function () {
    function Body(positon, model) {
        this.position = positon;
        this.model = model;
    }
    Body.prototype.checkCollision = function (body, newPositon) {
        if (newPositon === void 0) { newPositon = this.position; }
        return this.model.checkCollision(body.position, newPositon, body.model);
    };
    Body.prototype.render = function (ctx) {
        ctx.drawImage(this.model.texture, this.position.x, this.position.y);
    };
    return Body;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Body;
},{}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Body_1 = require("./Body");
var Vector_1 = require("./Vector");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(position, model, force, velocity) {
        if (force === void 0) { force = new Vector_1.default(0, 0); }
        if (velocity === void 0) { velocity = new Vector_1.default(0, 0); }
        _super.call(this, position, model);
        this.velocity = velocity;
        this.force = force;
    }
    Entity.prototype.render = function (ctx) {
        if (this.spritePositon == undefined || Math.ceil(this.spritePositon) >= this.model.spriteMax) {
            this.spritePositon = 0;
        }
        var rad = Math.atan2(this.velocity.x, this.velocity.y);
        var a = Math.round(rad * (4 / Math.PI));
        var direction = (a < -0 ? a * (-1) + 4 : a);
        var speed = 0;
        switch (direction) {
            case 0:
                speed = this.velocity.y;
                break;
            case 1:
                speed = (this.velocity.x + this.velocity.y) / 2;
                break;
            case 2:
                speed = this.velocity.x;
                break;
            case 3:
                speed = (this.velocity.x + (this.velocity.y * -1)) / 2;
                break;
            case 8:
            case 4:
                speed = this.velocity.y * -1;
                break;
            case 5:
                speed = ((this.velocity.x * -1) + this.velocity.y) / 2;
                break;
            case 6:
                speed = this.velocity.x * -1;
                break;
            case 7:
                speed = ((this.velocity.x + this.velocity.y) / 2) * -1;
                break;
        }
        this.spritePositon += speed / 1000;
        ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.spritePositon), 0, this.model.texture.width / this.model.spriteMax, this.model.texture.height, this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y);
    };
    return Entity;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
},{"./Body":2,"./Vector":12}],4:[function(require,module,exports){
"use strict";
var Map_1 = require("./Map");
var Game = (function () {
    function Game() {
        this.map = new Map_1.default();
        setInterval(this.gameLoop.bind(this), 16);
    }
    Game.prototype.gameLoop = function () {
        var delay = 16 / 1000;
        for (var i = 0; i < this.map.entitys.length; i++) {
            var entity = this.map.entitys[i];
            if (entity) {
                var acceleration = entity.force.scale(2000);
                var friction = .92;
                entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(friction);
                var position = entity.position.add(entity.velocity.scale(delay));
                var collision = false;
                for (var o = 0; o < this.map.entitys.length; o++) {
                    var entity2 = this.map.entitys[o];
                    if (entity2 && entity != entity2) {
                        if (entity.checkCollision(entity2, position)) {
                            collision = true;
                        }
                    }
                }
                if (collision) {
                    entity.velocity = entity.velocity.scale(.1);
                }
                else {
                    entity.position = position;
                }
            }
        }
    };
    return Game;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
},{"./Map":7}],5:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox = (function () {
    function Hitbox(rectangles) {
        this.rectangles = rectangles;
        this.collisionBox = this.getCollisionBox();
    }
    Hitbox.prototype.checkCollision = function (origin, originHitbox, hitbox) {
        if (this.collisionBox.checkCollision(origin, originHitbox, hitbox.collisionBox)) {
            for (var i = 0; i < this.rectangles.length; i++) {
                for (var o = 0; o < hitbox.rectangles.length; o++) {
                    var otherRect = hitbox.rectangles[i];
                    var thisRect = this.rectangles[i];
                    if (thisRect.checkCollision(origin, originHitbox, otherRect)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Hitbox.prototype.getCollisionBox = function () {
        var max = new Vector_1.default(0, 0);
        for (var i = 0; i < this.rectangles.length; i++) {
            var hitbox = this.rectangles[i];
            max = max.biggest(hitbox.min.add(hitbox.max));
        }
        var min = new Vector_1.default(max.x, max.y);
        for (var i = 0; i < this.rectangles.length; i++) {
            min = min.smalest(this.rectangles[i].min);
        }
        return new Rectangle_1.default(min, max);
    };
    return Hitbox;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hitbox;
},{"./Rectangle":10,"./Vector":12}],6:[function(require,module,exports){
"use strict";
var Input = (function () {
    function Input(game) {
        this.game = game;
    }
    Input.prototype.setForce = function (index, force) {
        this.game.map.entitys[index].force = force;
    };
    Input.prototype.updateEntity = function (index, force, velocity, position) {
        this.game.map.entitys[index].force = force;
        this.game.map.entitys[index].position = position;
        this.game.map.entitys[index].velocity = velocity;
    };
    return Input;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
},{}],7:[function(require,module,exports){
"use strict";
var Entity_1 = require("./Entity");
var Vector_1 = require("./Vector");
var Model_1 = require("./Model");
var Hitbox_1 = require("./Hitbox");
var Rectangle_1 = require("./Rectangle");
var Map = (function () {
    function Map() {
        this.entitys = [
            new Entity_1.default(new Vector_1.default(10, 10), new Model_1.default(new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, 0), new Vector_1.default(10, 10))
            ]), "assets/images/dirt.png", "dirt", new Vector_1.default(10, 10)), new Vector_1.default(0, 0)),
            new Entity_1.default(new Vector_1.default(100, 10), new Model_1.default(new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, 0), new Vector_1.default(10, 10))
            ]), "assets/images/player.png", "player", new Vector_1.default(16, 18), 4))
        ];
        this.blocks = [];
        console.log(this.entitys);
    }
    return Map;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Map;
},{"./Entity":3,"./Hitbox":5,"./Model":8,"./Rectangle":10,"./Vector":12}],8:[function(require,module,exports){
"use strict";
var Model = (function () {
    function Model(hitbox, texture, name, textureSize, spriteMax) {
        if (spriteMax === void 0) { spriteMax = 1; }
        this.hitbox = hitbox;
        this.name = name;
        this.textureSize = textureSize;
        this.spriteMax = spriteMax;
        this.texture = new Image();
        this.texture.src = texture;
    }
    Model.prototype.checkCollision = function (origin, originHitbox, model) {
        return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
    };
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
},{}],9:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Player = (function () {
    function Player(input, index) {
        var _this = this;
        this.input = input;
        var date = Date.now();
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
        };
        window.addEventListener('keydown', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key] = true;
                _this.input.setForce(index, _this.getDirection(_this.keys));
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key] = false;
                _this.input.setForce(index, _this.getDirection(_this.keys));
                e.preventDefault();
            }
        });
    }
    Player.prototype.getDirection = function (keys) {
        var v = new Vector_1.default(0, 0);
        if (this.keys.w) {
            v.y--;
        }
        if (this.keys.a) {
            v.x--;
        }
        if (this.keys.s) {
            v.y++;
        }
        if (this.keys.d) {
            v.x++;
        }
        return v;
    };
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
},{"./Vector":12}],10:[function(require,module,exports){
"use strict";
var Rectangle = (function () {
    function Rectangle(min, max) {
        this.min = min;
        this.max = max;
    }
    Rectangle.prototype.checkCollision = function (origin, originRect, rect) {
        var rectMin = rect.min.add(originRect);
        var thisMin = this.min.add(origin);
        if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
            return true;
        }
        return false;
    };
    return Rectangle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
},{}],11:[function(require,module,exports){
"use strict";
var Render = (function () {
    function Render(game, canvasParent, getRenderPosition) {
        var _this = this;
        this.canvas = document.createElement('canvas');
        canvasParent.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.game = game;
        this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width = document.documentElement.clientWidth;
        window.addEventListener('resize', function () {
            _this.canvas.width = document.documentElement.clientWidth;
            _this.canvas.height = document.documentElement.clientHeight;
        });
        setInterval(this.renderLoop.bind(this), 16);
    }
    Render.prototype.renderLoop = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.game.map.blocks.length; i++) {
            this.game.map.blocks[i].render(this.context);
        }
        for (var i = 0; i < this.game.map.entitys.length; i++) {
            this.game.map.entitys[i].render(this.context);
        }
    };
    return Render;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Render;
},{}],12:[function(require,module,exports){
"use strict";
var V = (function () {
    function V(x, y) {
        if (typeof (x) == "object") {
            this.x = Math.round(x.x * 10) / 10;
            this.y = Math.round(x.y * 10) / 10;
        }
        else {
            this.x = Math.round(x * 10) / 10;
            this.y = Math.round(y * 10) / 10;
        }
    }
    V.prototype.add = function (vector) {
        return new V(Math.round((vector.x + this.x) * 10) / 10, Math.round((vector.y + this.y) * 10) / 10);
    };
    V.prototype.subtract = function (vector) {
        return new V(Math.round((this.x - vector.x) * 10) / 10, Math.round((this.y - vector.y) * 10) / 10);
    };
    V.prototype.scale = function (s) {
        return new V(Math.round((this.x * s) * 10) / 10, Math.round((this.y * s) * 10) / 10);
    };
    V.prototype.dot = function (vector) {
        return (this.x * vector.x + this.y * vector.y);
    };
    V.prototype.cross = function (vector) {
        return (this.x * vector.y - this.y * vector.x);
    };
    V.prototype.smalest = function (vector) {
        var x = this.x < vector.x ? this.x : vector.x, y = this.y < vector.y ? this.y : vector.y;
        return new V(x, y);
    };
    V.prototype.biggest = function (vector) {
        var x = this.x > vector.x ? this.x : vector.x, y = this.y > vector.y ? this.y : vector.y;
        return new V(x, y);
    };
    V.prototype.rotate = function (angle, vector) {
        var x = this.x - vector.x;
        var y = this.y - vector.y;
        var x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
        var y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));
        return new V(x_prime, y_prime);
    };
    return V;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = V;
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
