import V from "./Vector";
import Map from "./Map";
import Entity from "./Entity";
import Block from "./Block";
import Model from "./Model";
import Hitbox from "./Hitbox";
import Rectangle from "./Rectangle";

interface AllModels {
   [s: string]: Model;
};

/** Class representing a point. */
export default class Game {
  public map: Map;
  public models: AllModels;

  constructor() {
    this.models = {
      grass: new Model(
        new Hitbox(
          [
            new Rectangle(
              new V(0, 0),
              new V(10, 10),
            ),
          ]
        ),
        "assets/images/grass.png",
        "grass",
        new V(100000, 500),
        1,
        true,
      ),
      dirt: new Model(
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
        1,
      ),
      player: new Model(
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
    };

    this.map = new Map(this, 1000, 1000);


    setInterval(this.gameLoop.bind(this), 16);
  }

  /**
   * function to handle collisiondetection and movement
   */
  private gameLoop(): void {
    let delay = 16 / 1000;


    for (let i = 0; i < this.map.entitys.length; i++) {
      let entity: Entity = this.map.entitys[i];
      if (entity) {
        let acceleration: V = entity.force.scale(2000);
        let friction: number = .92;

        entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(friction);

        // new position (now check for collision)
        let position: V = entity.position.add(entity.velocity.scale(delay));

        let collision: boolean = false;

        for (let o = 0; o < this.map.blocks.length; o++) {
          let block: Block = this.map.blocks[o];
          if (block) {

            // Collision detection
            if (block.collision) {
              if (entity.checkCollision(block, position)) {
                collision = true;
              }
            }
          }
        }

        for (let o = 0; o < this.map.entitys.length; o++) {
          let entity2: Entity = this.map.entitys[o];
          if (entity2 && entity != entity2) {

            // Collision detection
            if (entity.checkCollision(entity2, position)) {
              collision = true;
            }
          }
        }

        // sets new position or keeps last depending on collision
        if (collision || !new Rectangle(new V(0, 0), this.map.size).checkCollision(new Rectangle(position, entity.model.hitbox.collisionBox.max))) {
          entity.velocity = entity.velocity.scale(.1);
        } else {
          entity.position = position;
        }
      }
    }
  }
}
