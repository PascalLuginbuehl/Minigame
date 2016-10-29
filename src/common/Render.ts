import Game from "./Game";

/** render class */
export default class Render {
  private game: Game;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  /**
   * constructor for render, creates canvas, attaches eventlisteners for size, creates renderinterval
   * @param  {Game}        game              game with map and stuff
   * @param  {HTMLElement} canvasParent      parent of canvas on which canvas gets appended
   * @param  {Function}    getRenderPosition function which returns vector which offset it needs
   */
  constructor(game: Game, canvasParent: HTMLElement, getRenderPosition: Function) {
    this.canvas = document.createElement('canvas');
    canvasParent.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');
    this.game = game;


    this.canvas.height = document.documentElement.clientHeight;
    this.canvas.width = document.documentElement.clientWidth;


    window.addEventListener('resize', () => {
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight;
    });

    setInterval(this.renderLoop.bind(this), 16);
  }

  /**
   * Renderloop, goes throug all blocks and entitys and draws them on canvas
   */
  private renderLoop(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);


    for (let i = 0; i < this.game.map.blocks.length; i++) {
      this.game.map.blocks[i].render(this.context);
    }

    for (let i = 0; i < this.game.map.entitys.length; i++) {
      this.game.map.entitys[i].render(this.context);
    }
  }
}
