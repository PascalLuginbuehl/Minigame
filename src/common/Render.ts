import Game from "./Game";
import Entity from "./Entity";
let dat = require("./dat.gui.js");

/** render class */
export default class Render {
  private game: Game;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private mapCanvas: HTMLCanvasElement;
  private mapContext: CanvasRenderingContext2D;
  private cameraEntity: Entity;

  /**
   * constructor for render, creates canvas, attaches eventlisteners for size, creates renderinterval
   * @param  {Game}        game              game with map and stuff
   * @param  {HTMLElement} canvasParent      parent of canvas on which canvas gets appended
   * @param  {Function}    getRenderPosition function which returns vector which offset it needs
   */
  constructor(game: Game, canvasParent: HTMLElement, getRenderPosition: Function, cameraEntity: Entity) {
    this.game = game;
    this.cameraEntity = cameraEntity;

    this.canvas = document.createElement('canvas');
    canvasParent.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');


    this.canvas.height = document.documentElement.clientHeight;
    this.canvas.width = document.documentElement.clientWidth;


    // Map canvas
    this.mapCanvas = document.createElement('canvas');
    this.mapCanvas.height = this.game.map.size.x;
    this.mapCanvas.width = this.game.map.size.y;

    this.mapContext = this.mapCanvas.getContext('2d');


    window.addEventListener('resize', () => {
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight;
    });


    // Preloading images
    let texturesToLoad = Object.keys(this.game.models).length + 1;
    let loadedTextures = 0;

    // load global background
    let background = new Image();
    background.src = "assets/images/grass.png";
    background.addEventListener('load', () => {
      loadedTextures++;
      this.game.map.background = this.context.createPattern(background, "repeat");
      if (loadedTextures >= texturesToLoad) {
        this.paintBlocks();
        setInterval(this.renderLoop.bind(this), 16);
      }
    })

    for (let modelName in this.game.models) {
      let model = this.game.models[modelName];
      model.texture = new Image();
      model.texture.src = model.texturePath;

      model.texture.addEventListener('load', () => {
        loadedTextures++;
        if (model.hasPattern) {
          model.pattern = this.context.createPattern(model.texture, "repeat");
        }
        if (loadedTextures >= texturesToLoad) {
          this.paintBlocks();
          setInterval(this.renderLoop.bind(this), 16);
        }
      })
    }
    // setInterval(this.renderLoop.bind(this), 16);
  }

  public paintBlocks(): void {
    this.mapContext.rect(0, 0, this.mapCanvas.height, this.mapCanvas.width);
    this.mapContext.fillStyle = this.game.map.background;
    this.mapContext.fill();

    for (let i = 0; i < this.game.map.blocks.length; i++) {
      this.game.map.blocks[i].render(this.mapContext);
    }
  }

  /**
   * Renderloop, goes throug all blocks and entitys and draws them on canvas
   */
  private renderLoop(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();

    this.context.translate(Math.round(this.cameraEntity.position.x) * -1 + Math.round(this.canvas.width/2), Math.round(this.cameraEntity.position.y) * -1  + Math.round(this.canvas.height/2));

    this.context.drawImage(this.mapCanvas, 0, 0);

    for (let i = 0; i < this.game.map.entitys.length; i++) {
      this.game.map.entitys[i].render(this.context);
    }

    this.context.restore();
    requestAnimationFrame(() => {});
  }
}
