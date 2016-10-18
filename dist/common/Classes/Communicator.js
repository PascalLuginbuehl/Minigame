"use strict";
var Vector_1 = require("./Vector");
var Communicator = (function () {
    function Communicator(game) {
        var _this = this;
        this.websocket = new WebSocket('ws://localhost');
        this.websocket.onopen = function () {
            _this.getStaticElements();
            _this.getMovingElements();
        };
        this.websocket.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };
        this.websocket.onmessage = function (e) {
            try {
                var data = JSON.parse(e.data);
                switch (data.action) {
                    case "updateMovement":
                        _this.updateMovement(data.params);
                        break;
                    case "staticElements":
                        _this.updateStaticElements(data.params);
                        break;
                    case "movingElements":
                        _this.updateMovingElements(data.params);
                        break;
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        this.game = game;
    }
    Communicator.prototype.updateMovement = function (_a) {
        var arrayPosition = _a.arrayPosition, force = _a.force;
        this.game.entitys[arrayPosition].force = new Vector_1.default(force);
    };
    Communicator.prototype.getStaticElements = function () {
    };
    Communicator.prototype.getMovingElements = function () {
    };
    Communicator.prototype.updateMovingElements = function (data) {
    };
    Communicator.prototype.updateStaticElements = function (data) {
    };
    Communicator.prototype.sendInput = function (v) {
        this.websocket.send(JSON.stringify(v));
    };
    return Communicator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communicator;
