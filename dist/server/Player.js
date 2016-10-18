"use strict";
var Entity_1 = require('./../common/Classes/Entity');
var Player = (function () {
    function Player(ws, game, staticElements, broadcast) {
        this.entity = new Entity_1.default({
            positionX: 300,
            positionY: 300,
            model: game.models["duck"],
        });
        this.game = game;
        this.ws = ws;
        this.ws.on('close', function () {
            console.log("close");
        });
        this.ws.on('error', function () {
            console.log("err");
        });
        this.ws.on('message', function (msg) {
            broadcast(msg);
            console.log(msg);
        });
    }
    Player.prototype.sendMovingElements = function (ws) {
        var elems = [];
        for (var i = 0; i < this.game.entitys.length; i++) {
            var entity = this.game.entitys[i];
            if (!entity.model.static) {
                elems.push(entity);
            }
        }
        this.send(ws, elems);
    };
    Player.prototype.send = function (ws, data) {
        ws.send(JSON.stringify(data));
    };
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
