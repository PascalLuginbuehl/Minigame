"use strict";
var V = (function () {
    function V(x, y) {
        if (x instanceof Object) {
            this.x = Math.round(x.x * 10) / 10;
            this.y = Math.round(x.y * 10) / 10;
        }
        else {
            this.x = Math.round(x * 10) / 10;
            this.y = Math.round(y * 10) / 10;
        }
    }
    V.prototype.add = function (v) {
        return new V(Math.round((v.x + this.x) * 10) / 10, Math.round((v.y + this.y) * 10) / 10);
    };
    V.prototype.subtract = function (v) {
        return new V(Math.round((this.x - v.x) * 10) / 10, Math.round((this.y - v.y) * 10) / 10);
    };
    V.prototype.scale = function (s) {
        return new V(Math.round((this.x * s) * 10) / 10, Math.round((this.y * s) * 10) / 10);
    };
    V.prototype.dot = function (v) {
        return (this.x * v.x + this.y * v.y);
    };
    V.prototype.cross = function (v) {
        return (this.x * v.y - this.y * v.x);
    };
    V.prototype.smalest = function (v) {
        var x = this.x < v.x ? this.x : v.x, y = this.y < v.y ? this.y : v.y;
        return new V(x, y);
    };
    V.prototype.biggest = function (v) {
        var x = this.x > v.x ? this.x : v.x, y = this.y > v.y ? this.y : v.y;
        return new V(x, y);
    };
    V.prototype.rotate = function (angle, vector) {
        var x = this.x - vector.x;
        var y = this.y - vector.y;
        var x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
        var y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));
        return new V(x_prime, y_prime);
    };
    return V;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = V;
