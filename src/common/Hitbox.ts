import V from "./Vector";
import Rectangle from "./Rectangle";

export default class Hitbox {
  protected rectangles: Array<Rectangle>;
  public collisionBox: Rectangle;


  /**
   * Constructor callculates outer Collision box only requerires one param
   * @param  {Array<Rectangle>} rectangles recatangle out of which the collisionbox constist
   */
  constructor(rectangles: Array<Rectangle>) {
    this.rectangles = rectangles;
    this.collisionBox = this.getCollisionBox();
  }

  /**
   * checksCollision between two hitboxes, first unaccurate collsision detection
   * then accurate with looping throug all Rectangles
   * @param  {V}      origin       origin of the Hitbox in the lastHitbox parameter
   * @param  {V}      originHitbox origin of the this hitbos, so the caller of the function
   * @param  {Hitbox} hitbox       hitbox to check collision with
   * @return {boolean}             wheter or not a collision occured
   */
  public checkCollision(origin: V, originHitbox: V, hitbox: Hitbox): boolean {
    // unaccurate collisiondetection for performence reasons
    let collisionBox = new Rectangle(this.collisionBox.min.add(originHitbox), this.collisionBox.max)
    let collisionBox2 = new Rectangle(hitbox.collisionBox.min.add(origin), hitbox.collisionBox.max)
    if (collisionBox.checkCollision(collisionBox2)) {
      // accurate collisionsdetection
      for (let i = 0; i < this.rectangles.length; i++) {
        for (let o = 0; o < hitbox.rectangles.length; o++) {
          let otherRect = hitbox.rectangles[o];
          let thisRect = this.rectangles[i];

          let rect = new Rectangle(thisRect.min.add(originHitbox), thisRect.max);
          let rect2 = new Rectangle(otherRect.min.add(origin), otherRect.max);

          if (rect.checkCollision(rect2)) {
            return true;
          }
        }
      }
    }

    return false;
  }


  /**
   * returns the outer circle of the hitbox so later you only have to check if those collide
   * @return {Rectangle} returns a Rectangle with the outes collsionBox
   */
  private getCollisionBox(): Rectangle {
    let max = new V(0, 0);

    for (let i = 0; i < this.rectangles.length; i++) {
      let hitbox = this.rectangles[i];

      max = max.biggest(hitbox.min.add(hitbox.max));
    }

    let min = new V(max.x, max.y);

    for (let i = 0; i < this.rectangles.length; i++) {
      min = min.smalest(this.rectangles[i].min);
    }

    return new Rectangle(min, max);
  }
}
