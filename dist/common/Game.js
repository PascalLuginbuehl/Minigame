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
