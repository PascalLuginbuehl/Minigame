let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");


class V {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v = new V(0, 0)) {
    return new V(v.x + this.x, v.y + this.y);
  }

  subtract(v = new V(0, 0)) {
    return new V(this.x - v.x, this.y - v.y);
  }

  scale(s = 0) {
    return new V(this.x * s, this.y * s);
  }

  dot(v = new V(0, 0)) {
    return (this.x * v.x + this.y * v.y);
  }

  cross(v = new V(0, 0)) {
    return (this.x * v.y - this.y * v.x);
  }

  rotate(angle, vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    let x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
    let y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));

    return new V(x_prime, y_prime);
  }
}
