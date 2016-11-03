import V from "./Vector";
import Hitbox from "./Hitbox";
import Model from "./Model";

/** Body class with basic parameters for positon and hitbox, it also provides a function for cehcking collision */
export default class Body {
  public position: V;
  protected model: Model;

  /**
   * constructor for Body
   * @param  {V}      positon position where it should be
   * @param  {Hitbox} hitbox  hitbox
   * @return {[type]}         [description]
   */
  constructor(positon: V, model: Model) {
    this.position = positon;
    this.model = model;
  }

  /**
   * Checks for collsions between two Bodys
   * @param  {Body}   the other body which colsion has to get checked
   * @return {boolean}      returns a boolean if collsion occured
   */
  public checkCollision(body: Body, newPositon: V = this.position): boolean {
    return this.model.checkCollision(body.position, newPositon, body.model);
  }


  /**
   * function to draw Texture on canvas on position of body
   * @param  {CanvasRenderingContext2D} ctx Canvas context which we can draw on
   */
  public render(ctx: CanvasRenderingContext2D): void {
    if (this.model.hasPattern) {
      var pattern = ctx.createPattern(this.model.texture, "repeat");
      ctx.rect(this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y);
      ctx.fillStyle = pattern;
      ctx.fill();
    } else {
      ctx.drawImage(this.model.texture, 0, 0, this.model.texture.width, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
    }
  }
}
