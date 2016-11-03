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
