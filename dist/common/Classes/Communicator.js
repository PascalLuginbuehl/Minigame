"use strict";
var Vector_1 = require("./Vector");
var Entity_1 = require("./Entity");
var Communicator = (function () {
    function Communicator(game) {
        var _this = this;
        this.game = game;
        this.websocket = new WebSocket('ws://192.168.1.112:8080');
        this.player = new Entity_1.default(new Vector_1.default(300, 300), game.models['duck']);
        this.websocket.onopen = function () {
        };
        this.websocket.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };
        setInterval(function () {
            _this.websocket.send(JSON.stringify({ action: "movingElements" }));
        }, this.game.config.gameLoopInterval * 2);
        this.websocket.onmessage = function (e) {
            try {
                var data = JSON.parse(e.data);
                switch (data.action) {
                    case "staticElements":
                        _this.updateStaticElements(data.params);
                        break;
                    case "movingElements":
                        _this.updateMovingElements(data.params);
                        break;
                    case "force":
                        _this.updateForce(data.params);
                        break;
                    case "player":
                        _this.createPlayer(data.params);
                        break;
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        this.websocket.onopen = function () {
            _this.websocket.send('{"action": "staticElements"}');
        };
    }
    Communicator.prototype.updateForce = function (_a) {
        var arrayPosition = _a.arrayPosition, force = _a.force;
        this.game.entitys[arrayPosition].force = new Vector_1.default(force);
    };
    Communicator.prototype.getMovingElements = function () {
    };
    Communicator.prototype.updateMovingElements = function (data) {
        for (var i = 0; i < data.length; i++) {
            var entity = data[i];
            if (entity) {
                this.game.entitys[i] = new Entity_1.default(entity.position, this.game.models[entity.model], new Vector_1.default(entity.velocity), new Vector_1.default(entity.force));
            }
        }
        this.player = this.game.entitys[this.arrayPosition];
    };
    Communicator.prototype.createPlayer = function (params) {
        this.arrayPosition = params;
        this.player = this.game.entitys[params];
    };
    Communicator.prototype.updateStaticElements = function (data) {
        for (var i = 0; i < data.length; i++) {
            var entity = data[i];
            if (entity) {
                this.game.entitys[i] = new Entity_1.default(entity.position, this.game.models[entity.model]);
            }
        }
    };
    Communicator.prototype.sendInput = function (v) {
        this.websocket.send(JSON.stringify(v));
    };
    return Communicator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communicator;
