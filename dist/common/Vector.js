"use strict";
var V = (function () {
    function V(x, y) {
        if (typeof (x) == "object") {
            this.x = Math.round(x.x * 10) / 10;
            this.y = Math.round(x.y * 10) / 10;
        }
        else {
            this.x = Math.round(x * 10) / 10;
            this.y = Math.round(y * 10) / 10;
        }
    }
    V.prototype.add = function (vector) {
        return new V(Math.round((vector.x + this.x) * 10) / 10, Math.round((vector.y + this.y) * 10) / 10);
    };
    V.prototype.subtract = function (vector) {
        return new V(Math.round((this.x - vector.x) * 10) / 10, Math.round((this.y - vector.y) * 10) / 10);
    };
    V.prototype.scale = function (s) {
        return new V(Math.round((this.x * s) * 10) / 10, Math.round((this.y * s) * 10) / 10);
    };
    V.prototype.dot = function (vector) {
        return (this.x * vector.x + this.y * vector.y);
    };
    V.prototype.cross = function (vector) {
        return (this.x * vector.y - this.y * vector.x);
    };
    V.prototype.smalest = function (vector) {
        var x = this.x < vector.x ? this.x : vector.x, y = this.y < vector.y ? this.y : vector.y;
        return new V(x, y);
    };
    V.prototype.biggest = function (vector) {
        var x = this.x > vector.x ? this.x : vector.x, y = this.y > vector.y ? this.y : vector.y;
        return new V(x, y);
    };
    V.prototype.rotate = function (angle, vector) {
        var x = this.x - vector.x;
        var y = this.y - vector.y;
        var x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
        var y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));
        return new V(x_prime, y_prime);
    };
    V.prototype.round = function () {
        return new V(this.x > 0 ? Math.floor(this.x) : Math.ceil(this.x), this.y > 0 ? Math.floor(this.y) : Math.ceil(this.y));
    };
    V.prototype.equal = function (v) {
        return (this.x == v.x && this.y == v.y);
    };
    return V;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = V;
