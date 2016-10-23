"use strict";
var Game_1 = require("./../common/Classes/Game");
var Player_1 = require("./Player");
var Communicator = (function () {
    function Communicator(game, app, expressWs) {
        var _this = this;
        this.game = game;
        this.expressWs = expressWs;
        this.players = [];
        this.staticElements = [];
        for (var i = 0; i < this.game.entitys.length; i++) {
            var entity = this.game.entitys[i];
            if (entity.model.static) {
                this.staticElements[i] = {
                    position: entity.position,
                    model: entity.getModel(this.game.models),
                };
            }
            else {
                this.staticElements[i] = null;
            }
        }
        app.ws('/', function (ws, req) {
            var counter = 0;
            Game_1.default.prototype.specialInput = function () {
                if (counter < 5) {
                    counter = 0;
                    var elems = [];
                    for (var i = 0; i < _this.game.entitys.length; i++) {
                        var entity = _this.game.entitys[i];
                        if (entity && !entity.model.static) {
                            var model = entity.getModel(_this.game.models);
                            elems[i] = {
                                position: entity.position,
                                model: model,
                                velocity: entity.velocity,
                                force: entity.force
                            };
                        }
                        else {
                            elems[i] = null;
                        }
                    }
                    _this.broadcast(null, JSON.stringify({ action: "movingElements", params: elems }));
                }
                counter++;
            };
            var a = _this.players.push(new Player_1.default(ws, _this.game, _this.staticElements, _this.broadcast.bind(_this)));
            for (var i = 0; i < _this.players.length; i++) {
                if (a != i) {
                    _this.players[i].sendMovingElements();
                }
            }
        });
    }
    Communicator.prototype.broadcast = function (ws, msg) {
        this.expressWs.getWss().clients.forEach(function (client) {
            if (client != ws && client.readyState == 1) {
                client.send(msg);
            }
        });
    };
    return Communicator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communicator;
