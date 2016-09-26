class Rectangle {
  constructor({x: x, y: y, w: w, h: h, min: min, max: max}) {
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
}
