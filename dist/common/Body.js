"use strict";
var Body = (function () {
    function Body(positon, model) {
        this.position = positon;
        this.model = model;
    }
    Body.prototype.checkCollision = function (body, newPositon) {
        if (newPositon === void 0) { newPositon = this.position; }
        return this.model.checkCollision(body.position, newPositon, body.model);
    };
    Body.prototype.render = function (ctx) {
        if (this.model.hasPattern) {
            var pattern = ctx.createPattern(this.model.texture, "repeat");
            ctx.rect(this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y);
            ctx.fillStyle = pattern;
            ctx.fill();
        }
        else {
            ctx.drawImage(this.model.texture, 0, 0, this.model.texture.width, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
        }
    };
    return Body;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Body;
