(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Game_1 = require("./../../common/Classes/Game");
var Communicator_1 = require("./../../common/Classes/Communicator");
var Render_1 = require("./../../common/Classes/Render");
var Input_1 = require("./../../common/Classes/Input");
'use strict';
var CONFIG = {
    gameLoopInterval: 16,
    map: {
        height: 1000,
        width: 1000,
    },
    textureBasepath: 'assets/images/',
    textures: {
        'dirt': {
            texture: 'dirt.png',
            w: 16,
            h: 16,
            spriteMax: 5,
        },
        'house': {
            texture: 'house.png',
            w: 254,
            h: 198,
            spriteMax: 1,
        },
        'duck': {
            texture: 'player.png',
            w: 16,
            h: 18,
            spriteMax: 4,
        },
    },
    models: {
        'dirt': {
            solid: true,
            static: false,
            hitbox: [{
                    x: 0,
                    y: 0,
                    w: 16,
                    h: 16,
                }],
        },
        'house': {
            solid: true,
            static: true,
            hitbox: [{
                    x: 0,
                    y: 0,
                    w: 254,
                    h: 198,
                }],
        },
        'duck': {
            solid: true,
            static: false,
            hitbox: [{
                    x: 0,
                    y: 0,
                    w: 18,
                    h: 18,
                }],
        }
    },
};
var game = new Game_1.default(CONFIG, function () { return window.performance.now(); });
var communicator = new Communicator_1.default(game);
var input = new Input_1.default(game, communicator);
document.addEventListener('DOMContentLoaded', function () {
    var render = new Render_1.default(game, document.body, {
        renderHitbox: true
    }, input.player);
});
},{"./../../common/Classes/Communicator":2,"./../../common/Classes/Game":4,"./../../common/Classes/Input":6,"./../../common/Classes/Render":9}],2:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Communicator = (function () {
    function Communicator(game) {
        var _this = this;
        this.websocket = new WebSocket('ws://localhost');
        this.websocket.onopen = function () {
            _this.getStaticElements();
            _this.getMovingElements();
        };
        this.websocket.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };
        this.websocket.onmessage = function (e) {
            try {
                var data = JSON.parse(e.data);
                switch (data.action) {
                    case "updateMovement":
                        _this.updateMovement(data.params);
                        break;
                    case "staticElements":
                        _this.updateStaticElements(data.params);
                        break;
                    case "movingElements":
                        _this.updateMovingElements(data.params);
                        break;
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        this.game = game;
    }
    Communicator.prototype.updateMovement = function (_a) {
        var arrayPosition = _a.arrayPosition, force = _a.force;
        this.game.entitys[arrayPosition].force = new Vector_1.default(force);
    };
    Communicator.prototype.getStaticElements = function () {
    };
    Communicator.prototype.getMovingElements = function () {
    };
    Communicator.prototype.updateMovingElements = function (data) {
    };
    Communicator.prototype.updateStaticElements = function (data) {
    };
    Communicator.prototype.sendInput = function (v) {
        this.websocket.send(JSON.stringify(v));
    };
    return Communicator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communicator;
},{"./Vector":10}],3:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Entity = (function () {
    function Entity(_a) {
        var _b = _a.positionX, positionX = _b === void 0 ? 0 : _b, _c = _a.positionY, positionY = _c === void 0 ? 0 : _c, model = _a.model;
        this.position = new Vector_1.default(positionX, positionY);
        this.velocity = new Vector_1.default(0, 0);
        this.force = new Vector_1.default(0, 0);
        this.model = model;
    }
    Entity.prototype.renderTexture = function (ctx) {
        if (this.lastSprite == undefined || this.lastSprite >= this.model.spriteMax) {
            this.lastSprite = 0;
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
        this.lastSprite += speed / 500;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.lastSprite), 0, this.model.textureSize.x, this.model.textureSize.y, 0, 0, this.model.textureSize.x, this.model.textureSize.y);
        ctx.restore();
    };
    return Entity;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
},{"./Vector":10}],4:[function(require,module,exports){
"use strict";
var Model_1 = require("./Model");
var Entity_1 = require("./Entity");
var Game = (function () {
    function Game(config, timeFunction) {
        this.config = config;
        this.height = config.map.height;
        this.width = config.map.width;
        this.timeFunction = timeFunction;
        this.entitys = [];
        this.models = {};
        for (var name in this.config.models) {
            this.models[name] = new Model_1.default(this.config.models[name]);
        }
        this.addEntity(new Entity_1.default({
            positionX: 300,
            positionY: 70,
            model: this.models['duck'],
        }));
        this.addEntity(new Entity_1.default({
            positionX: 0,
            positionY: 0,
            model: this.models['house'],
        }));
        this.addEntity(new Entity_1.default({
            positionX: 700,
            positionY: 700,
            model: this.models['house'],
        }));
        this.expectedInterval = this.timeFunction() + this.config.gameLoopInterval;
        setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
    }
    Game.prototype.addEntity = function (entity) {
        this.entitys.push(entity);
    };
    Game.prototype.gameLoop = function () {
        this.specialInput();
        var overtime = this.timeFunction() - this.expectedInterval;
        if (overtime > this.config.gameLoopInterval) {
            this.overtimeError(overtime);
            this.expectedInterval = this.timeFunction();
        }
        var delay = (overtime + this.config.gameLoopInterval) / 1000;
        for (var i = 0; i < this.entitys.length; i++) {
            var entity = this.entitys[i];
            if (!entity.model.static) {
                var acceleration = entity.force.scale(2000);
                var friction = 0.8;
                entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(.92);
                var position = entity.position.add(entity.velocity.scale(delay));
                var collision = false;
                for (var o = 0; o < this.entitys.length; o++) {
                    var entity2 = this.entitys[o];
                    if (entity != entity2 && entity.model.solid && entity2.model.solid) {
                        if (entity.model.hitbox.checkCollision(position, entity2.position, entity2.model.hitbox)) {
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
        this.expectedInterval += this.config.gameLoopInterval;
        setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
    };
    Game.prototype.overtimeError = function (overtime) {
        console.error("overtimeError: " + overtime);
    };
    Game.prototype.specialInput = function () {
    };
    Game.prototype.exportMap = function () {
        var returnValue = [];
        for (var i = 0; i < this.entitys.length; i++) {
            var entity = this.entitys[i];
            for (var model in this.models) {
                if (this.models[model] == entity.model) {
                    returnValue.push({ position: entity.position, velocity: entity.velocity, force: entity.force, model: model });
                }
            }
        }
        return returnValue;
    };
    return Game;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
},{"./Entity":3,"./Model":7}],5:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox = (function () {
    function Hitbox(hitboxconf) {
        this.hitboxes = [];
        for (var i = 0; i < hitboxconf.length; i++) {
            this.hitboxes.push(new Rectangle_1.default(hitboxconf[i]));
        }
        this.collisionBox = this.getCollisionBox();
    }
    Hitbox.prototype.checkCollision = function (origin, eOrigin, eHitbox) {
        if (this.collisionBox.checkCollision(origin, eOrigin, eHitbox.collisionBox)) {
            for (var i = 0; i < this.hitboxes.length; i++) {
                var hitboxes = this.hitboxes[i];
                for (var o = 0; o < eHitbox.hitboxes.length; o++) {
                    if (hitboxes.checkCollision(origin, eOrigin, eHitbox.hitboxes[o])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Hitbox.prototype.getCollisionBox = function () {
        var max = new Vector_1.default(0, 0);
        for (var i = 0; i < this.hitboxes.length; i++) {
            var hitbox = this.hitboxes[i];
            max = max.biggest(hitbox.min.add(hitbox.max));
        }
        var min = new Vector_1.default(max.x, max.y);
        for (var i = 0; i < this.hitboxes.length; i++) {
            min = min.smalest(this.hitboxes[i].min);
        }
        return new Rectangle_1.default({ min: min, max: max });
    };
    return Hitbox;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hitbox;
},{"./Rectangle":8,"./Vector":10}],6:[function(require,module,exports){
"use strict";
var Entity_1 = require("./Entity");
var Vector_1 = require("./Vector");
var Input = (function () {
    function Input(game, communicator) {
        var _this = this;
        this.game = game;
        this.communicator = communicator;
        this.player = new Entity_1.default({
            positionX: 300,
            positionY: 300,
            model: this.game.models['duck'],
        });
        this.game.addEntity(this.player);
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            ArrowUp: false,
            ArrowLeft: false,
            ArrowDown: false,
            ArrowRigth: false,
        };
        var keys = this.keys;
        var player = this.player;
        window.addEventListener('keydown', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key] = true;
                _this.player.force = _this.direction();
                _this.communicator.sendInput({ action: "updateMovement", params: { arrayPosition: 3, force: _this.direction() } });
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key] = false;
                _this.player.force = _this.direction();
                _this.communicator.sendInput({ action: "updateMovement", params: { arrayPosition: 3, force: _this.direction() } });
                e.preventDefault();
            }
        });
    }
    Input.prototype.direction = function () {
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
    return Input;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
},{"./Entity":3,"./Vector":10}],7:[function(require,module,exports){
"use strict";
var Hitbox_1 = require("./Hitbox");
var Model = (function () {
    function Model(_a) {
        var _b = _a.solid, solid = _b === void 0 ? true : _b, _c = _a.static, staticElem = _c === void 0 ? false : _c, hitbox = _a.hitbox;
        this.solid = solid;
        this.static = staticElem;
        this.hitbox = new Hitbox_1.default(hitbox);
    }
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
},{"./Hitbox":5}],8:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Rectangle = (function () {
    function Rectangle(_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.w, w = _d === void 0 ? 0 : _d, _e = _a.h, h = _e === void 0 ? 0 : _e, min = _a.min, max = _a.max;
        if (min != undefined && max != undefined) {
            this.min = min;
            this.max = max;
        }
        else {
            this.min = new Vector_1.default(x, y);
            this.max = new Vector_1.default(w, h);
        }
    }
    Rectangle.prototype.checkCollision = function (origin, originRect, rect) {
        var rectMin = rect.min.add(originRect);
        var thisMin = this.min.add(origin);
        if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
            return true;
        }
        return false;
    };
    Rectangle.prototype.drawRect = function (position, ctx) {
        ctx.save();
        position = position.add(this.min);
        ctx.translate(position.x, position.y);
        ctx.fillStyle = "rgba(0, 0, 0, .3)";
        ctx.fillRect(0, 0, this.max.x, this.max.y);
        ctx.restore();
    };
    ;
    return Rectangle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
},{"./Vector":10}],9:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Render = (function () {
    function Render(game, canvasParent, debugging, origin) {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width = this.canvas.width = document.documentElement.clientWidth;
        canvasParent.appendChild(this.canvas);
        this.canvas.style.imageRendering = "pixelated";
        this.ctx = this.canvas.getContext("2d");
        this.origin = origin;
        this.game = game;
        this.debugging = debugging;
        for (var name_1 in this.game.models) {
            var img = new Image();
            var texture = this.game.config.textures[name_1];
            img.src = "assets/images/" + texture.texture;
            this.game.models[name_1].spriteMax = texture.spriteMax;
            this.game.models[name_1].texture = img;
            this.game.models[name_1].textureSize = new Vector_1.default(texture.w, texture.h);
        }
        window.addEventListener('resize', function () {
            _this.canvas.width = document.documentElement.clientWidth;
            _this.canvas.height = document.documentElement.clientHeight;
        });
        setInterval(this.render.bind(this), Math.round(1000 / 60));
    }
    Render.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.origin.position.x * -1 + this.canvas.width / 2, this.origin.position.y * -1 + this.canvas.height / 2);
        for (var i = 0; i < this.game.entitys.length; i++) {
            var entity = this.game.entitys[i];
            entity.renderTexture(this.ctx);
            for (var i_1 = 0; i_1 < entity.model.hitbox.hitboxes.length; i_1++) {
                entity.model.hitbox.hitboxes[i_1].drawRect(entity.position, this.ctx);
            }
        }
        this.ctx.restore();
    };
    return Render;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Render;
},{"./Vector":10}],10:[function(require,module,exports){
"use strict";
var V = (function () {
    function V(x, y) {
        if (x instanceof Object) {
            this.x = Math.round(x.x * 10) / 10;
            this.y = Math.round(x.y * 10) / 10;
        }
        else {
            this.x = Math.round(x * 10) / 10;
            this.y = Math.round(y * 10) / 10;
        }
    }
    V.prototype.add = function (v) {
        return new V(Math.round((v.x + this.x) * 10) / 10, Math.round((v.y + this.y) * 10) / 10);
    };
    V.prototype.subtract = function (v) {
        return new V(Math.round((this.x - v.x) * 10) / 10, Math.round((this.y - v.y) * 10) / 10);
    };
    V.prototype.scale = function (s) {
        return new V(Math.round((this.x * s) * 10) / 10, Math.round((this.y * s) * 10) / 10);
    };
    V.prototype.dot = function (v) {
        return (this.x * v.x + this.y * v.y);
    };
    V.prototype.cross = function (v) {
        return (this.x * v.y - this.y * v.x);
    };
    V.prototype.smalest = function (v) {
        var x = this.x < v.x ? this.x : v.x, y = this.y < v.y ? this.y : v.y;
        return new V(x, y);
    };
    V.prototype.biggest = function (v) {
        var x = this.x > v.x ? this.x : v.x, y = this.y > v.y ? this.y : v.y;
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
