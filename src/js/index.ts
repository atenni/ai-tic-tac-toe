import { Game, Player, Board } from './models';
import handleClick from './controller';

let game = new Game();
game.init();

document.addEventListener('click', handleClick, { passive: true });
