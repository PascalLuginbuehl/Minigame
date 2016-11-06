import V from "./Vector";

/** Rectangle class with relative position and size */
export default class Rectangle {
  public min: V;
  public max: V;

  /**
   * Creates a Rectangle from two vectors
   * @param  {V}      min relative position of the rectangle
   * @param  {V}      max size of the rectangle measured from first param
   */
  constructor(min: V, max: V) {
    this.min = min;
    this.max = max;
  }


  /**
   * Checks collision between two rectangles
   * @param  {V}         origin     origin of rectange provided as 3. param
   * @param  {V}         originRect origin of own rectangle
   * @param  {Rectangle} rect       Rectangle to check collision with
   * @return {boolean}              wheater or wheater not they collided
   */
  public checkCollision(rect: Rectangle): boolean {
    let rectMin = rect.min;
    let thisMin = this.min;

    if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
      return true;
    }

    return false;
  }


  public drawRectangle(origin: V, ctx: CanvasRenderingContext2D) {
    ctx.fillRect(origin.x + this.min.x, origin.y + this.min.y, this.max.x, this.max.y)
    ctx.fillStyle = "rgba(0, 0, 0, .5)"
    ctx.fill();
  }
}
