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
        this.map = new Map_1.default(this);
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
