"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Body_1 = require("./Body");
var Vector_1 = require("./Vector");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(position, model, force, velocity) {
        if (force === void 0) { force = new Vector_1.default(0, 0); }
        if (velocity === void 0) { velocity = new Vector_1.default(0, 0); }
        _super.call(this, position, model);
        this.velocity = velocity;
        this.force = force;
    }
    return Entity;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
