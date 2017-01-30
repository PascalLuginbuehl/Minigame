"use strict";
var Model = (function () {
    function Model(hitbox, texturePath, name, textureSize, spriteMax, hasPattern, spriteHeight) {
        if (spriteMax === void 0) { spriteMax = 1; }
        if (hasPattern === void 0) { hasPattern = false; }
        if (spriteHeight === void 0) { spriteHeight = 1; }
        this.hitbox = hitbox;
        this.name = name;
        this.textureSize = textureSize;
        this.hasPattern = hasPattern;
        this.spriteHeight = spriteHeight;
        this.spriteMax = spriteMax;
        this.texturePath = texturePath;
    }
    Model.prototype.checkCollision = function (origin, originHitbox, model) {
        return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
    };
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
