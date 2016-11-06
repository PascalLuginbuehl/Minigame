"use strict";
var Rectangle = (function () {
    function Rectangle(min, max) {
        this.min = min;
        this.max = max;
    }
    Rectangle.prototype.checkCollision = function (rect) {
        var rectMin = rect.min;
        var thisMin = this.min;
        if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
            return true;
        }
        return false;
    };
    Rectangle.prototype.drawRectangle = function (origin, ctx) {
        ctx.fillRect(origin.x + this.min.x, origin.y + this.min.y, this.max.x, this.max.y);
        ctx.fillStyle = "rgba(0, 0, 0, .5)";
        ctx.fill();
    };
    return Rectangle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
