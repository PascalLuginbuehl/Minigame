"use strict";
var Vector_1 = require("./Vector");
var Rectangle = (function () {
    function Rectangle(_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.w, w = _d === void 0 ? 0 : _d, _e = _a.h, h = _e === void 0 ? 0 : _e, min = _a.min, max = _a.max;
        if (min != undefined && max != undefined) {
            this.min = min;
            this.max = max;
        }
        else {
            this.min = new Vector_1.default(x, y);
            this.max = new Vector_1.default(w, h);
        }
    }
    Rectangle.prototype.checkCollision = function (origin, originRect, rect) {
        var rectMin = rect.min.add(originRect);
        var thisMin = this.min.add(origin);
        if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
            return true;
        }
        return false;
    };
    Rectangle.prototype.drawRect = function (position, ctx) {
        ctx.save();
        position = position.add(this.min);
        ctx.translate(position.x, position.y);
        ctx.fillStyle = "rgba(0, 0, 0, .3)";
        ctx.fillRect(0, 0, this.max.x, this.max.y);
        ctx.restore();
    };
    ;
    return Rectangle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
