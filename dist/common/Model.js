"use strict";
var Model = (function () {
    function Model(hitbox, texture, name, textureSize, spriteMax) {
        if (spriteMax === void 0) { spriteMax = 1; }
        this.hitbox = hitbox;
        this.name = name;
        this.textureSize = textureSize;
        this.spriteMax = spriteMax;
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
