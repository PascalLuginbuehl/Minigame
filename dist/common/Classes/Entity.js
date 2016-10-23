"use strict";
var Vector_1 = require("./Vector");
var Entity = (function () {
    function Entity(position, model, velocity, force, lastSprite) {
        if (velocity === void 0) { velocity = new Vector_1.default(0, 0); }
        if (force === void 0) { force = new Vector_1.default(0, 0); }
        if (lastSprite === void 0) { lastSprite = 0; }
        this.position = new Vector_1.default(position);
        this.velocity = velocity;
        this.force = force;
        this.lastSprite = lastSprite;
        this.model = model;
    }
    Entity.prototype.renderTexture = function (ctx) {
        if (this.lastSprite == undefined || this.lastSprite >= this.model.spriteMax) {
            this.lastSprite = 0;
        }
        var rad = Math.atan2(this.velocity.x, this.velocity.y);
        var a = Math.round(rad * (4 / Math.PI));
        var direction = (a < -0 ? a * (-1) + 4 : a);
        var speed = 0;
        switch (direction) {
            case 0:
                speed = this.velocity.y;
                break;
            case 1:
                speed = (this.velocity.x + this.velocity.y) / 2;
                break;
            case 2:
                speed = this.velocity.x;
                break;
            case 3:
                speed = (this.velocity.x + (this.velocity.y * -1)) / 2;
                break;
            case 8:
            case 4:
                speed = this.velocity.y * -1;
                break;
            case 5:
                speed = ((this.velocity.x * -1) + this.velocity.y) / 2;
                break;
            case 6:
                speed = this.velocity.x * -1;
                break;
            case 7:
                speed = ((this.velocity.x + this.velocity.y) / 2) * -1;
                break;
        }
        this.lastSprite += speed / 500;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.lastSprite), 0, this.model.textureSize.x, this.model.textureSize.y, 0, 0, this.model.textureSize.x, this.model.textureSize.y);
        ctx.restore();
    };
    Entity.prototype.getModel = function (models) {
        for (var name in models) {
            if (this.model == models[name]) {
                return name;
            }
        }
    };
    return Entity;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
