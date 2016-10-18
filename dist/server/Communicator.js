"use strict";
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
                this.staticElements.push(entity);
            }
        }
        app.ws('/', function (ws, req) {
            _this.players.push(new Player_1.default(ws, _this.game, _this.staticElements, _this.broadcast.bind(_this)));
        });
    }
    Communicator.prototype.broadcast = function (msg) {
        this.expressWs.getWss().clients.forEach(function (client) {
            client.send(msg);
        });
    };
    return Communicator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Communicator;
