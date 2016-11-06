import Body from "./Body";
import V from "./Vector";
import Model from "./Model";
import Rectangle from "./Rectangle";
import Hitbox from "./Hitbox";

interface attackRangeObject {
  0: Hitbox,
  1: Hitbox,
  "-1": Hitbox,
  2: Hitbox,
  "-2": Hitbox,
  3: Hitbox,
  "-3": Hitbox,
  4: Hitbox,
  "-4": Hitbox,
}

export default class Entity extends Body {
  public velocity: V;
  public force: V;
  private spritePositon: number;
  public lastDirection: number;
  public attackRangeObject: attackRangeObject;

  constructor(position: V, model: Model, force: V = new V(0, 0), velocity: V = new V(0, 0)) {
    super(position, model);

    this.velocity = velocity;
    this.force = force;
    this.lastDirection = 0;

    let attackRange = 16;
    this.attackRangeObject = {
      0: new Hitbox([
        new Rectangle(new V(0, this.model.hitbox.collisionBox.max.y), new V(attackRange, attackRange)),
      ]),
      1: new Hitbox([
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y), new V(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y))
      ]),
      "-1": new Hitbox([
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x * -1, this.model.hitbox.collisionBox.max.y / 2), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x * -1, this.model.hitbox.collisionBox.max.y), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
        new Rectangle(new V(0, this.model.hitbox.collisionBox.max.y), new V(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y))
      ]),
      2: new Hitbox([
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, 0), new V(attackRange, attackRange)),
      ]),
      "-2":new Hitbox([
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x * -1, 0), new V(attackRange, attackRange)),
      ]),
      3: new Hitbox([
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y * -1), new V(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y * -1), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2))
      ]),
      "-3": new Hitbox([
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y * -1), new V(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y * -1), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
        new Rectangle(new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y), new V(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2))
      ]),
      4: new Hitbox([
        new Rectangle(new V(0, this.model.hitbox.collisionBox.max.y * -1), new V(attackRange, attackRange)),
      ]),
      "-4": new Hitbox([
        new Rectangle(new V(0, this.model.hitbox.collisionBox.max.y * -1), new V(attackRange, attackRange)),
      ]),
    }
  }

  public inDirectionRange(body: Body): boolean {
    return this.attackRangeObject[this.lastDirection].checkCollision(body.position, this.position, body.model.hitbox);
  }

  public getDirection(): number {
    if (Math.floor(Math.abs(this.velocity.x)) < 10 && Math.floor(Math.abs(this.velocity.y)) < 10) {
      return this.lastDirection;
    } else {
      let rad = Math.atan2(this.velocity.x, this.velocity.y);
      return Math.round(rad / Math.PI * 4)
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.spritePositon == undefined || Math.ceil(this.spritePositon) >= this.model.spriteMax) {
      this.spritePositon = 0;
    }

    let speed = Math.sqrt(this.velocity.y*this.velocity.y + this.velocity.x * this.velocity.x);;

    let direction = this.lastDirection;

    this.spritePositon += speed / 1000;
    ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.spritePositon), 0, this.model.texture.width / this.model.spriteMax, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
    // console.log(this.attackRangeObject[this.lastDirection]);
    this.attackRangeObject[this.lastDirection].drawHitbox(this.position, ctx);
  }
}
