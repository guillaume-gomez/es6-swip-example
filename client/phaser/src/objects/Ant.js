import { CellWidth, ElapsedTime, AntsColor, convertToNumberColor } from '../constants';
import { mod } from "../utils";

const Tilt = 90;
class Ant extends Phaser.Sprite{

  constructor(game, x, y, antColor = AntsColor[0]) {
    const convertToColorFn = (number) => {
      return convertToNumberColor(antColor) * 3 + number;
    };

    super(game, x, y, "ant", convertToColorFn(0));
    this.antRotation = 90;

    const downArray = [0, 1, 2].map(convertToColorFn);
    const leftArray = [12, 13, 14].map(convertToColorFn);
    const rightArray = [24, 25, 26].map(convertToColorFn);
    const upArray = [36, 37, 38].map(convertToColorFn);

    this.animations.add('down', downArray, 10, true);
    this.animations.add('left', leftArray, 10, true);
    this.animations.add('right', rightArray, 10, true);
    this.animations.add('up', upArray , 10, true);

    this.game = game;
	}

  rotate(direction) {
    const newRotation = direction > 0 ? (this.antRotation + Tilt) : (this.antRotation - Tilt);
    this.antRotation = mod(newRotation, 360);
  }

  goTo(xPos, yPos) {
    this.animations.stop("down");
    this.animations.stop("up");
    this.animations.stop("left");
    this.animations.stop("right");
    this.x = xPos;
    this.y = yPos;
    
  }

  updateAnt(cell) {
    if(cell.isChecked()) {
      this.rotate(1);
    } else {
      this.rotate(-1);
    }
    switch(this.antRotation) {
      case 0:
        this.turnRight();
      break;
      case 90:
        this.goUp();
      break;
      case 180:
        this.turnLeft();
      break;
      case 270:
        this.goDown();
      break;
    }
  }

  goDown() {
    const position = this.y + CellWidth;
    this.game.add.tween(this).to( { y: position }, window.ElapsedTime || ElapsedTime, Phaser.Easing.Linear.None, true);
    this.animations.play("down", 45, true);
    this.animations.stop("up");
    this.animations.stop("left");
    this.animations.stop("right");
  }

  goUp() {
    const position = this.y - CellWidth;
    this.game.add.tween(this).to( { y: position }, window.ElapsedTime || ElapsedTime, Phaser.Easing.Linear.None, true);
    this.animations.play("up", 45, true);
    this.animations.stop("down");
    this.animations.stop("left");
    this.animations.stop("right");
  }

  turnLeft() {
    const position = this.x - CellWidth;
    this.game.add.tween(this).to( { x: position }, window.ElapsedTime || ElapsedTime, Phaser.Easing.Linear.None, true);
    this.animations.play("left", 45, true);
    this.animations.stop("down");
    this.animations.stop("up");
    this.animations.stop("right");
  }

  turnRight() {
    const position = this.x + CellWidth;
    this.game.add.tween(this).to( { x: position }, window.ElapsedTime || ElapsedTime, Phaser.Easing.Linear.None, true);
    this.animations.play("right", 45, true);
    this.animations.stop("down");
    this.animations.stop("left");
    this.animations.stop("up");
  }
}

export default Ant;