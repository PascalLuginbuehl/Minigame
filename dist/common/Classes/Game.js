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
