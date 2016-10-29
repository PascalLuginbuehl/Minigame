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
        ctx.drawImage(this.model.texture, this.position.x, this.position.y);
    };
    return Body;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Body;
