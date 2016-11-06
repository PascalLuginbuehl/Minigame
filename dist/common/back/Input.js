"use strict";
var Vector_1 = require("./Vector");
var Input = (function () {
    function Input(game, communicator) {
        var _this = this;
        this.game = game;
        this.communicator = communicator;
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            ArrowUp: false,
            ArrowLeft: false,
            ArrowDown: false,
            ArrowRigth: false,
        };
        var keys = this.keys;
        window.addEventListener('keydown', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key] = true;
                _this.communicator.player.force = _this.direction();
                _this.communicator.sendInput({ action: "force", params: _this.direction() });
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key] = false;
                _this.communicator.player.force = _this.direction();
                _this.communicator.sendInput({ action: "force", params: _this.direction() });
                e.preventDefault();
            }
        });
    }
    Input.prototype.direction = function () {
        var v = new Vector_1.default(0, 0);
        if (this.keys.w) {
            v.y--;
        }
        if (this.keys.a) {
            v.x--;
        }
        if (this.keys.s) {
            v.y++;
        }
        if (this.keys.d) {
            v.x++;
        }
        return v;
    };
    return Input;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
