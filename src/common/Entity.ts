import Body from "./Body";
import V from "./Vector";
import Model from "./Model";

export default class Entity extends Body {
  public velocity: V;
  public force: V;
  private spritePositon: number;

  constructor(position: V, model: Model, force: V = new V(0, 0), velocity: V = new V(0, 0)) {
    super(position, model);

    this.velocity = velocity;
    this.force = force;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.spritePositon == undefined || Math.ceil(this.spritePositon) >= this.model.spriteMax) {
      this.spritePositon = 0;
    }

    // get direction
    let rad = Math.atan2(this.velocity.x, this.velocity.y);
    let a = Math.round(rad * (4 / Math.PI));
    let direction = (a < -0 ? a * (-1) + 4 : a);
    let speed = 0;
    switch (direction) {
      case 0:
        speed = this.velocity.y;
        break;
      case 1:
        speed = (this.velocity.x + this.velocity.y) / 2
        break;

      case 2:
        speed = this.velocity.x;
        break;

      case 3:
        speed = (this.velocity.x + (this.velocity.y * -1)) / 2
        break;

      case 8:
      case 4:
        speed = this.velocity.y * -1
        break;

      case 5:
        speed = ((this.velocity.x * -1) + this.velocity.y) / 2
        break;

      case 6:
        speed = this.velocity.x * -1
        break;

      case 7:
        speed = ((this.velocity.x + this.velocity.y) / 2) * -1
        break;
    }
    this.spritePositon += speed / 1000;
    
    ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.spritePositon), 0, this.model.texture.width/this.model.spriteMax, this.model.texture.height, this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y);
  }
}
