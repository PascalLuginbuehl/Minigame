"use strict";
var Rectangle = (function () {
    function Rectangle(min, max) {
        this.min = min;
        this.max = max;
    }
    Rectangle.prototype.checkCollision = function (origin, originRect, rect) {
        var rectMin = rect.min.add(originRect);
        var thisMin = this.min.add(origin);
        if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
            return true;
        }
        return false;
    };
    return Rectangle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
