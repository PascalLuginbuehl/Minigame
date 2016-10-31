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
