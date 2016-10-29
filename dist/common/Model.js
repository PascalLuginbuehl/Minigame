"use strict";
var Model = (function () {
    function Model(hitbox, texture) {
        this.hitbox = hitbox;
        this.texture = new Image();
        this.texture.src = texture;
    }
    Model.prototype.checkCollision = function (origin, originHitbox, model) {
        return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
    };
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
