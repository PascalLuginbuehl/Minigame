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
