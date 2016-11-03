"use strict";
var Block_1 = require("./Block");
var Entity_1 = require("./Entity");
var Vector_1 = require("./Vector");
var Map = (function () {
    function Map(game) {
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
