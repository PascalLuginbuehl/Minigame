import Game from "../../common/Game";
import Render from "../../common/Render";
import V from "../../common/Vector";
import Input from "../../common/Input";
import Player from "../../common/Player";

let game = new Game();

document.addEventListener('DOMContentLoaded', () => {
  let render = new Render(game, document.body, function() {
    return new V(0, 0);
  }, game.map.entitys[1]);

  let input = new Input(game);
  let player = new Player(input, 1, render);
});
