"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Body_1 = require("./Body");
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(position, model) {
        _super.call(this, position, model);
    }
    return Block;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Block;
