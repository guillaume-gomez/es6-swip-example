import { CellWidth, ElapsedTime, SizeTerrain, WidthCanvas, HeighCanvas } from '../constants';

const CameraVelocity = 10;
const Bounds = CellWidth * SizeTerrain;

class GameState extends Phaser.State {

	create() {
		this.game.world.setBounds(0, 0, Bounds, Bounds);
		this.cursors = this.game.input.keyboard.createCursorKeys();
    this.initCamera();
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
		var bmd = game.add.bitmapData(128,128);
    //ctx.save();

    bmd.ctx.fillStyle = '#fff';
    bmd.ctx.shadowBlur = 10;
    bmdd.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';

    bmd.ctx.beginPath();
    bmd.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    bmd.ctx.fill();

    var sprite = game.add.sprite(200, 200, bmd);
  }

  
  drawHole (hole) {
    var bmd = game.add.bitmapData(128,128);

    bmd.ctx.fillStyle = 'black';
    bmd.ctx.strokeStyle = '#4b7f1f';
    bmd.ctx.lineWidth = 2;

    bmd.ctx.beginPath();
    bmd.ctx.arc(hole.x, hole.y, hole.radius, 0, 2 * Math.PI);
    bmd.ctx.fill();
    bmd.ctx.stroke();
  }

	render() {
		//this.game.debug.spriteBounds(this.ant);
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
	}


}

export default GameState;
