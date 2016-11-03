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
    }, game.map.entitys[1]);
});
},{"../../common/Game":5,"../../common/Input":7,"../../common/Player":10,"../../common/Render":12,"../../common/Vector":13}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Body_1 = require("./Body");
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(position, model, collision) {
        if (collision === void 0) { collision = true; }
        _super.call(this, position, model);
        this.collision = collision;
    }
    return Block;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Block;
},{"./Body":3}],3:[function(require,module,exports){
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
        if (this.model.hasPattern) {
            var pattern = ctx.createPattern(this.model.texture, "repeat");
            ctx.rect(this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y);
            ctx.fillStyle = pattern;
            ctx.fill();
        }
        else {
            ctx.drawImage(this.model.texture, 0, 0, this.model.texture.width, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
        }
    };
    return Body;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Body;
},{}],4:[function(require,module,exports){
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
        ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.spritePositon), 0, this.model.texture.width / this.model.spriteMax, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
    };
    return Entity;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
},{"./Body":3,"./Vector":13}],5:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Map_1 = require("./Map");
var Model_1 = require("./Model");
var Hitbox_1 = require("./Hitbox");
var Rectangle_1 = require("./Rectangle");
;
var Game = (function () {
    function Game() {
        this.models = {
            grass: new Model_1.default(new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, 0), new Vector_1.default(10, 10)),
            ]), "assets/images/grass.png", "grass", new Vector_1.default(100000, 500), 1, true),
            dirt: new Model_1.default(new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, 0), new Vector_1.default(10, 10)),
            ]), "assets/images/dirt.png", "dirt", new Vector_1.default(10, 10), 1),
            player: new Model_1.default(new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, 0), new Vector_1.default(16, 18))
            ]), "assets/images/player.png", "player", new Vector_1.default(16, 18), 4)
        };
        this.map = new Map_1.default(this, 1000, 1000);
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
                for (var o = 0; o < this.map.blocks.length; o++) {
                    var block = this.map.blocks[o];
                    if (block) {
                        if (block.collision) {
                            if (entity.checkCollision(block, position)) {
                                collision = true;
                            }
                        }
                    }
                }
                for (var o = 0; o < this.map.entitys.length; o++) {
                    var entity2 = this.map.entitys[o];
                    if (entity2 && entity != entity2) {
                        if (entity.checkCollision(entity2, position)) {
                            collision = true;
                        }
                    }
                }
                if (collision || !new Rectangle_1.default(new Vector_1.default(0, 0), this.map.size).checkCollision(new Rectangle_1.default(position, entity.model.hitbox.collisionBox.max))) {
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
},{"./Hitbox":6,"./Map":8,"./Model":9,"./Rectangle":11,"./Vector":13}],6:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox = (function () {
    function Hitbox(rectangles) {
        this.rectangles = rectangles;
        this.collisionBox = this.getCollisionBox();
    }
    Hitbox.prototype.checkCollision = function (origin, originHitbox, hitbox) {
        var collisionBox = new Rectangle_1.default(this.collisionBox.min.add(originHitbox), this.collisionBox.max);
        var collisionBox2 = new Rectangle_1.default(hitbox.collisionBox.min.add(origin), hitbox.collisionBox.max);
        if (collisionBox.checkCollision(collisionBox2)) {
            for (var i = 0; i < this.rectangles.length; i++) {
                for (var o = 0; o < hitbox.rectangles.length; o++) {
                    var otherRect = hitbox.rectangles[o];
                    var thisRect = this.rectangles[i];
                    var rect = new Rectangle_1.default(thisRect.min.add(originHitbox), thisRect.max);
                    var rect2 = new Rectangle_1.default(otherRect.min.add(origin), otherRect.max);
                    if (rect.checkCollision(rect2)) {
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
},{"./Rectangle":11,"./Vector":13}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
"use strict";
var Block_1 = require("./Block");
var Entity_1 = require("./Entity");
var Vector_1 = require("./Vector");
var Map = (function () {
    function Map(game, sizeX, sizeY) {
        if (sizeX === void 0) { sizeX = 1000; }
        if (sizeY === void 0) { sizeY = 1000; }
        this.size = new Vector_1.default(sizeX, sizeY);
        this.blocks = [
            new Block_1.default(new Vector_1.default(0, 0), game.models["grass"], false),
            new Block_1.default(new Vector_1.default(20, 20), game.models["dirt"]),
        ];
        this.entitys = [
            new Entity_1.default(new Vector_1.default(100, 123), game.models["player"]),
            new Entity_1.default(new Vector_1.default(123, 123), game.models["player"])
        ];
    }
    return Map;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Map;
},{"./Block":2,"./Entity":4,"./Vector":13}],9:[function(require,module,exports){
"use strict";
var Model = (function () {
    function Model(hitbox, texturePath, name, textureSize, spriteMax, hasPattern) {
        if (spriteMax === void 0) { spriteMax = 1; }
        if (hasPattern === void 0) { hasPattern = false; }
        this.hitbox = hitbox;
        this.name = name;
        this.textureSize = textureSize;
        this.hasPattern = hasPattern;
        this.spriteMax = spriteMax;
        this.texturePath = texturePath;
    }
    Model.prototype.checkCollision = function (origin, originHitbox, model) {
        return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
    };
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
},{}],10:[function(require,module,exports){
"use strict";
var Vector_1 = require("./Vector");
var Player = (function () {
    function Player(input, index) {
        var _this = this;
        this.input = input;
        this.playerIndex = index;
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
},{"./Vector":13}],11:[function(require,module,exports){
"use strict";
var Rectangle = (function () {
    function Rectangle(min, max) {
        this.min = min;
        this.max = max;
    }
    Rectangle.prototype.checkCollision = function (rect) {
        var rectMin = rect.min;
        var thisMin = this.min;
        if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
            return true;
        }
        return false;
    };
    return Rectangle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
},{}],12:[function(require,module,exports){
"use strict";
var Render = (function () {
    function Render(game, canvasParent, getRenderPosition, cameraEntity) {
        var _this = this;
        this.game = game;
        this.cameraEntity = cameraEntity;
        this.canvas = document.createElement('canvas');
        canvasParent.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width = document.documentElement.clientWidth;
        this.mapCanvas = document.createElement('canvas');
        this.mapCanvas.height = this.game.map.size.x;
        this.mapCanvas.width = this.game.map.size.x;
        this.mapContext = this.mapCanvas.getContext('2d');
        window.addEventListener('resize', function () {
            _this.canvas.width = document.documentElement.clientWidth;
            _this.canvas.height = document.documentElement.clientHeight;
        });
        var texturesToLoad = Object.keys(this.game.models).length;
        var loadedTextures = 0;
        var _loop_1 = function(modelName) {
            var model = this_1.game.models[modelName];
            model.texture = new Image();
            model.texture.src = model.texturePath;
            model.texture.addEventListener('load', function () {
                loadedTextures++;
                if (model.hasPattern) {
                    model.pattern = _this.context.createPattern(model.texture, "repeat");
                }
                if (loadedTextures >= texturesToLoad) {
                    for (var i = 0; i < _this.game.map.blocks.length; i++) {
                        _this.game.map.blocks[i].render(_this.mapContext);
                    }
                    setInterval(_this.renderLoop.bind(_this), 16);
                }
            });
        };
        var this_1 = this;
        for (var modelName in this.game.models) {
            _loop_1(modelName);
        }
    }
    Render.prototype.renderLoop = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(Math.round(this.cameraEntity.position.x) * -1 + Math.round(this.canvas.width / 2), Math.round(this.cameraEntity.position.y) * -1 + Math.round(this.canvas.height / 2));
        this.context.drawImage(this.mapCanvas, 0, 0);
        for (var i = 0; i < this.game.map.entitys.length; i++) {
            this.game.map.entitys[i].render(this.context);
        }
        this.context.restore();
    };
    return Render;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Render;
},{}],13:[function(require,module,exports){
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
