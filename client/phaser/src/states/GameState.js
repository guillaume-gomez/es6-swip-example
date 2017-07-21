import { CellWidth, ElapsedTime, SizeTerrain, WidthCanvas, HeighCanvas } from '../constants';

const CameraVelocity = 10;
const Bounds = CellWidth * SizeTerrain;

class GameState extends Phaser.State {

	create() {
		this.game.world.setBounds(0, 0, Bounds, Bounds);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.stage.backgroundColor = '#80d735';
    	//this.initCamera();
    	this.ball =  { x: 50, y: 50, radius: 10, speedX: 0, speedY: 0 };
    	this.hole = { x: 200, y: 200, radius: 15 };
    	this.drawBall(this.ball);
    	this.drawHole(this.hole);
	}

  initCamera() {
    this.game.camera.x = this.game.world.width / 2 - WidthCanvas / 2;
    this.game.camera.y = this.game.world.height / 2 - HeighCanvas / 2;
  }

	update() {

	    if (this.cursors.up.isDown)
	    {
	      this.game.camera.y -= CameraVelocity;
	    }
	    else if (this.cursors.down.isDown)
	    {
	      this.game.camera.y += CameraVelocity;
	    }

	    if (this.cursors.left.isDown)
	    {
	    	this.game.camera.x -= CameraVelocity;
	    }
	    else if (this.cursors.right.isDown)
	    {
	    	this.game.camera.x += CameraVelocity;
	    }
	}

	drawBall (ball) {
	const bmd = this.game.add.bitmapData(100, 100);

    bmd.ctx.fillStyle = '#fff';
    bmd.ctx.shadowBlur = 10;
    bmd.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';

    bmd.ctx.beginPath();
    bmd.ctx.arc(ball.radius, ball.radius, ball.radius, 0, 2 * Math.PI);
    bmd.ctx.fill();

    const sprite = this.game.add.sprite(ball.x, ball.y, bmd);
    console.log(sprite)
  }

  drawHole (hole) {
    const bmd = this.game.add.bitmapData(300, 300);

    bmd.ctx.fillStyle = 'black';
    bmd.ctx.strokeStyle = '#4b7f1f';
    bmd.ctx.lineWidth = 2;

    bmd.ctx.beginPath();
    bmd.ctx.arc(hole.radius, hole.radius, hole.radius, 0, 2 * Math.PI);
    bmd.ctx.fill();
    bmd.ctx.stroke();

    const sprite = this.game.add.sprite(hole.x, hole.y, bmd);
  }

	render() {
		//this.game.debug.spriteBounds(this.ant);
		//this.game.debug.pointer( this.game.input.activePointer );
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
	}


}

export default GameState;
