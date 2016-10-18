import Game from "./../common/Classes/Game";
import Entity from "./../common/Classes/Entity";
import Player from "./Player";


export default class Communicator {
  game: Game;
  expressWs: any;
  staticElements: Array<Entity>;
  players: Array<Player>;

  constructor(game, app, expressWs) {
    this.game = game;
    this.expressWs = expressWs;
    this.players = [];
    this.staticElements = [];


    for (let i = 0; i < this.game.entitys.length; i++) {
      let entity = this.game.entitys[i];
      if (entity.model.static) {
        this.staticElements.push(entity);
      }
    }

    app.ws('/', (ws, req) => {
      this.players.push(new Player(ws, this.game, this.staticElements, this.broadcast.bind(this)));
    });
  }

  broadcast(msg) {
    this.expressWs.getWss().clients.forEach(function (client) {
      client.send(msg);
    });
  }
}
