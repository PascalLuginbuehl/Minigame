import Block from "./Block";
import Entity from "./Entity";
import V from "./Vector";
import Model from "./Model";
import Hitbox from "./Hitbox";
import Rectangle from "./Rectangle";
import Game from "./Game";

export default class Map {
  public entitys: Array<Entity>;
  public blocks: Array<Block>;
  public size: V;
  public background: CanvasPattern;

  constructor(game: Game, sizeX: number = 1000, sizeY: number = 1000) {
    this.size = new V(sizeX, sizeY);

    this.blocks = [
      new Block(
        new V(20, 20),
        game.models["dirt"],
      ),
    ];

    this.entitys = [
      new Entity(
        new V(100, 123),
        game.models["player"],
      ),
      new Entity(
        new V(123, 123),
        game.models["player"],
      )
    ];
  }
}
