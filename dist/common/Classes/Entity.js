"use strict";
var Vector_1 = require("./Vector");
var Entity = (function () {
    function Entity(_a) {
        var _b = _a.positionX, positionX = _b === void 0 ? 0 : _b, _c = _a.positionY, positionY = _c === void 0 ? 0 : _c, _d = _a.texture, texture = _d === void 0 ? 0 : _d, _e = _a.solid, solid = _e === void 0 ? false : _e, _f = _a.static, staticElem = _f === void 0 ? false : _f, model = _a.model;
        this.position = new Vector_1.default(positionX, positionY);
        this.velocity = new Vector_1.default(0, 0);
        this.force = new Vector_1.default(0, 0);
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
    return Entity;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
