"use strict";
var Vector_1 = require("./Vector");
var Communicator = (function () {
    function Communicator(game) {
        var _this = this;
        this.websocket = new WebSocket('ws://localhost');
        this.websocket.onopen = function () {
            _this.websocket.send('Ping');
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
                    case "loadStaticElements":
                        _this.loadStaticElements(data.params);
                        break;
                    case "loadMovingElements":
                        _this.loadMovingElements(data.params);
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
    Communicator.prototype.loadStaticElements = function (param) {
    };
    Communicator.prototype.loadMovingElements = function (param) {
    };
    Communicator.prototype.loadMap = function () {
    };
    Communicator.prototype.sendInput = function (v) {
        this.websocket.send(JSON.stringify(v));
    };
    return Communicator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communicator;
