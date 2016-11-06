import Game from "./Game";
import V from "./Vector";
import Entity from "./Entity";
import Rectangle from "./Rectangle";


class Render {
  canvas: any;
  ctx: CanvasRenderingContext2D;
  positionFn: Function;
  game: Game;
  debugging: any;


  constructor(game, canvasParent, debugging, positionFn) {

    this.canvas = document.createElement('canvas');
    this.canvas.height = this.canvas.height = document.documentElement.clientHeight;
    this.canvas.width = this.canvas.width = document.documentElement.clientWidth;

    canvasParent.appendChild(this.canvas);

    this.canvas.style.imageRendering = "pixelated";

    this.ctx = this.canvas.getContext("2d");

    this.positionFn = positionFn;

    // preload images
    this.game = game;

    this.debugging = debugging;


    for (let name in this.game.models) {
      let img = new Image();
      let texture = this.game.config.textures[name];

      img.src = "assets/images/" + texture.texture;

      this.game.models[name].spriteMax = texture.spriteMax;
      this.game.models[name].texture = img;
      this.game.models[name].textureSize = new V(texture.w, texture.h);
    }

    window.addEventListener('resize', () => {
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight;
    });




    // this.render();
    // setTimeout(this.render.bind(this), 1);

    // standard Interval
    setInterval(this.render.bind(this), Math.round(1000 / 60));
  }


  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.positionFn().x * -1 + this.canvas.width/2, this.positionFn().y * -1 + this.canvas.height/2);
    // Clear old stuff


    for (let i = 0; i < this.game.entitys.length; i++) {
      let entity = this.game.entitys[i];
      if (entity) {
        entity.renderTexture(this.ctx);
        for (let i = 0; i < entity.model.hitbox.hitboxes.length; i++) {
          entity.model.hitbox.hitboxes[i].drawRect(entity.position, this.ctx);
        }
      }
    }
    this.ctx.restore();
  }
}
export default Render;
