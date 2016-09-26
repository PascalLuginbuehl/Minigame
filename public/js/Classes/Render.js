class Render {
  constructor(game, canvasParent, debugging) {
    this.canvas = document.createElement('canvas');
    this.canvas.height = game.height;
    this.canvas.width = game.width;
    canvasParent.appendChild(this.canvas);

    this.canvas.style.imageRendering = "pixelated";

    this.ctx = this.canvas.getContext("2d");

    // preload images
    this.game = game;

    this.debugging = debugging;


    for (var name in this.game.models) {
      let img = new Image();
      let texture = this.game.config.textures[name];

      img.src = "assets/images/" + texture.texture;

      this.game.models[name].texture = img;
      this.game.models[name].textureSize = new V(texture.size.x, texture.size.y);
    }




    Entity.prototype.renderTexture = function (ctx) {
      ctx.save();

      // add center to it so it can rotate from center
      // ctx.translate(this.position.x + this.center.x, this.position.y + this.center.y);
      ctx.translate(this.position.x, this.position.y);
      // ctx.rotate(this.angle);

      ctx.drawImage(this.model.texture, 0, 0, this.model.textureSize.x, this.model.textureSize.y);
      // ctx.drawImage(this.texture, 0 - this.center.x, 0 - this.center.y, this.size.x, this.size.y);
      ctx.restore();
    }


    Rectangle.prototype.drawRect = function (position, ctx) {
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


    // this.render();
    // setTimeout(this.render.bind(this), 1);

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }


  render() {

    // Clear old stuff
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < game.entitys.length; i++) {
      let entity = game.entitys[i];

      entity.renderTexture(this.ctx);
      for (let i = 0; i < entity.model.hitbox.hitboxes.length; i++) {
        entity.model.hitbox.hitboxes[i].drawRect(entity.position, this.ctx);
      }
    }
  }
}
