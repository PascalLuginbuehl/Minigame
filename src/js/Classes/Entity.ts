/// <reference path="./Vector" />
/// <reference path="./Model" />

namespace Minigame {
  export class Entity {
    model: Model;
    force: V;
    velocity: V;
    position: V;
    lastSprite: number;

    constructor({positionX = 0, positionY = 0, texture = 0, solid = false, static: staticElem = false, model: model}) {
      // position
      // left top of hitbox
      this.position = new V(positionX, positionY);

      // velocity for movement
      this.velocity = new V(0, 0);

      // pulls into Direction
      this.force = new V(0, 0);

      // IDEA: z-index

      // Textures and rest is safed in here
      this.model = model;
    }

    renderTexture(ctx) {
      if (this.lastSprite == undefined || this.lastSprite >= this.model.spriteMax) {
        this.lastSprite = 0;
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


      this.lastSprite += speed / 500;
      // get direction
      // get speed into direction
      // Get texture
      // Add to last sprite
      // render

      ctx.save();

      // add center to it so it can rotate from center
      // ctx.translate(this.position.x + this.center.x, this.position.y + this.center.y);
      ctx.translate(this.position.x, this.position.y);
      // ctx.rotate(this.angle);

      ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.lastSprite), 0, this.model.textureSize.x, this.model.textureSize.y, 0, 0, this.model.textureSize.x, this.model.textureSize.y);
      // ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, this.size.x, this.size.y);
      ctx.restore();
    }
  }
}
