import GameState from './states/GameState';
import { WidthCanvas, HeighCanvas}  from './constants';

class Game extends Phaser.Game {

	constructor() {
		super(WidthCanvas, HeighCanvas, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
	}

}

new Game();
