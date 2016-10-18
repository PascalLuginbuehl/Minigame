import Entity from './../common/Classes/Entity';
import Game from './../common/Classes/Game';


export default class Player {
  ws: any;
  entity: Entity;
  game: Game;

  constructor(ws: any, game: Game, staticElements: Array<Entity>, broadcast: Function) {
    this.entity = new Entity ({
      positionX: 300,
      positionY:300,
      model: game.models["duck"],
    });

    this.game = game;
    this.ws = ws;


    this.ws.on('close', function() {
      console.log("close");
    });

    this.ws.on('error', function() {
      console.log("err");
    });

    this.ws.on('message', function(msg) {
      // try {
      //   let data = JSON.parse(msg.data);
      //   switch (data.action) {
      //     case "updateMovement":
      //       this.updateMovement(data.params);
      //       break;
      //     case "staticElements":
      //       this.updateStaticElements(data.params);
      //       break;
      //     case "movingElements":
      //       this.updateMovingElements(data.params);
      //       break;
      //   }
      // } catch (e) {
      //   console.error(e);
      // }

      broadcast(msg);
      console.log(msg);
    });
  }

  sendMovingElements(ws) {
    let elems = [];
    for (let i = 0; i < this.game.entitys.length; i++) {
      let entity = this.game.entitys[i];
      if (!entity.model.static) {
        elems.push(entity);
      }
    }

    this.send(ws, elems);
  }

  send(ws, data) {
    ws.send(JSON.stringify(data));
  }
}
