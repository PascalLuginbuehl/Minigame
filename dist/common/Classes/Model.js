"use strict";
var Hitbox_1 = require("./Hitbox");
var Model = (function () {
    function Model(_a) {
        var _b = _a.solid, solid = _b === void 0 ? true : _b, _c = _a.static, staticElem = _c === void 0 ? false : _c, hitbox = _a.hitbox;
        this.solid = solid;
        this.static = staticElem;
        this.hitbox = new Hitbox_1.default(hitbox);
    }
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
