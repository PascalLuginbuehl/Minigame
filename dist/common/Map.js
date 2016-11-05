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
