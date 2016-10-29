import V from "./Vector";
import Map from "./Map";
import Entity from "./Entity";
import Block from "./Block";


/** Class representing a point. */
export default class Game {
  public map: Map;

  constructor() {
    this.map = new Map();


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
        if (collision) {
          entity.velocity = entity.velocity.scale(.1);
        } else {
          entity.position = position;
        }
      }
    }
  }
}
