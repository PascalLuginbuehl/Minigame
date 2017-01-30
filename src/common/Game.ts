import V from "./Vector";
import Map from "./Map";
import Entity from "./Entity";
import Block from "./Block";
import Model from "./Model";
import Hitbox from "./Hitbox";
import Rectangle from "./Rectangle";
import Body from "./Body";

interface AllModels {
   [s: string]: Model;
};

/** Class representing a point. */
export default class Game {
  public map: Map;
  public models: AllModels;

  constructor() {
    this.models = {
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
        10,
        false,
        4,
      )
    };

    this.map = new Map(this, 1000, 1000);


    setInterval(this.gameLoop.bind(this), 16);
  }

  public attack(index: number) {
    let entity = this.map.entitys[index];
    let attacked: Array<Entity> = [];

    for (let i = 0; i < this.map.entitys.length; i++) {
      let entity2 = this.map.entitys[i];
      if (entity != entity2) {
        entity.inDirectionRange(entity2) ? attacked.push(entity2) : null;
      }
    }

    console.log(attacked);
  }

  /**
   * function to handle collisiondetection and movement
   */
  private gameLoop(): void {
    let delay = 16 / 1000;


    for (let i = 0; i < this.map.entitys.length; i++) {
      let entity: Entity = this.map.entitys[i];
      if (entity) {
        let acceleration: V = entity.force.scale(1500);
        let friction: number = .91;
        // let friction: number = .92;

        entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(friction).round();

        // new position (now check for collision)
        let position: V = entity.position.add(entity.velocity.scale(delay));

        let collision: Array<Body> = [];

        for (let o = 0; o < this.map.blocks.length; o++) {
          let block: Block = this.map.blocks[o];
          if (block) {

            if (block.collision) {
              // Collision detection
              if (entity.checkCollision(block, position)) {
                collision.push(block);
              }
            }
          }
        }

        for (let o = 0; o < this.map.entitys.length; o++) {
          let entity2: Entity = this.map.entitys[o];
          if (entity2 && entity != entity2) {

            // Collision detection
            if (entity.checkCollision(entity2, position)) {
              collision.push(entity2);
            }
          }
        }

        // sets new position or keeps last depending on collision
        if (new Rectangle(new V(0, 0), this.map.size).checkCollision(new Rectangle(position, entity.model.hitbox.collisionBox.max))) {
          if (collision.length > 0) {
              let newPosition: V = new V(position.x, position.y);
              let newVelocity: V = new V(entity.velocity.x, entity.velocity.y);

              for (let i = 0; i < collision.length; i++) {
                let body = collision[i];
                let ret = entity.getCollisionPosition(newPosition, newVelocity, body)
                newPosition = ret.position;
                newVelocity = ret.velocity;
              }
              entity.position = newPosition;
              entity.velocity = newVelocity;
          } else {
            entity.position = position;
          }
        } else {
          entity.velocity = entity.velocity.scale(.1);
        }

        entity.lastDirection = entity.getDirection();
        // console.log(entity.lastDirection);
      }
    }
  }
}
