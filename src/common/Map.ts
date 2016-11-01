import Block from "./Block";
import Entity from "./Entity";
import V from "./Vector";
import Model from "./Model";
import Hitbox from "./Hitbox";
import Rectangle from "./Rectangle";

export default class Map {
  public entitys: Array<Entity>;
  public blocks: Array<Block>;

  constructor() {
    this.entitys = [
      new Entity(
        new V(20, 20),
        new Model(
          new Hitbox(
            [
              new Rectangle(
                new V(0, 0),
                new V(10, 10),
              ),
            ]
          ),
          "assets/images/dirt.png",
          "dirt",
          new V(10, 10),
        ),
        new V(0, 0),
      ),

      new Entity(
        new V(123, 123),
        new Model(
          new Hitbox(
            [
              new Rectangle(
                new V(0, 0),
                new V(16, 18)
              )
            ]
          ),
          "assets/images/player.png",
          "player",
          new V(16, 18),
          4,
        )
      )
    ];

    this.blocks = [];

    console.log(this.entitys);
  }
}
