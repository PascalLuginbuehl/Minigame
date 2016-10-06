/// <reference path="./Vector" />

namespace Minigame {
  export class Rectangle {
    max: V;
    min: V;

    constructor({x: x = 0, y: y = 0, w: w = 0, h: h = 0, min: min, max: max}) {
      if (min != undefined && max != undefined) {
        this.min = min;
        this.max = max;
      } else {
        this.min = new V(x, y);
        this.max = new V(w, h);
      }
      // this._rotation = 0;
      // let rotation = 5;
      // this.center = new V(0, 0);
    }

    // get rotation() {
    //   console.log(rotation, "asd");
    //   return rotation;
    // }

    // set rotation(rotation) {
    //   this._rotation = rotation;
    // }

    checkCollision(origin, originRect, rect) {
      let rectMin = rect.min.add(originRect);

      // let thisMin = rect.min.add(origin).add(rect.min);
      let thisMin = this.min.add(origin);

      if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
        return true;
      }
      return false;
    }

    drawRect(position, ctx) {
      ctx.save();

      // add center to it so it can rotate from center
      // ctx.translate(this.position.x + this.center.x, this.position.y + this.center.y);
      position = position.add(this.min);
      ctx.translate(position.x, position.y);
      // ctx.rotate(this.angle);
      ctx.fillStyle = "rgba(0, 0, 0, .3)";
      ctx.fillRect(0, 0, this.max.x, this.max.y);

      // ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, this.size.x, this.size.y);
      ctx.restore();
    };
  }
}
