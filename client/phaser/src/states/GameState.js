import { CellWidth, ElapsedTime, SizeTerrain, WidthCanvas, HeighCanvas } from '../constants';

const CameraVelocity = 10;
const Bounds = WidthCanvas;//CellWidth * SizeTerrain;

class GameState extends Phaser.State {

	create() {
		this.game.world.setBounds(0, 0, WidthCanvas, HeighCanvas);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.stage.backgroundColor = '#80d735';
    	//this.initCamera();
    	this.ball =  { x: 50, y: 50, radius: 10, speedX: 0, speedY: 0 };
    	this.hole = { x: 200, y: 200, radius: 15 };
    	this.client = {
    		id: 'htm970h',
    		size: { width: WidthCanvas, height: HeighCanvas },
    		transform: { x: 0, y: 0 },
    		adjacentClientIDs: [],
    		clusterID: 'r8x2vaa',
    		openings: { top: [], bottom: [], right: [], left: [] },
    		data: { rotationX: 0, rotationY: 0 }
    	}

    	this.drawBall(this.ball);
    	this.drawHole(this.hole);
    	this.drawWalls(this.client)
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

  drawWalls (client) {
  	//TODO openings
    const openings = client.openings;
    const transformX = client.transform.x;
    const transformY = client.transform.y;
    const width = client.size.width;
    const height = client.size.height;

    const lineWidth = 40

    const bmdLeft = this.game.add.bitmapData(lineWidth/2, height);
    bmdLeft.ctx.lineWidth = lineWidth;
    bmdLeft.ctx.shadowColor = '#dba863';
    bmdLeft.ctx.shadowBlur = 10;
    bmdLeft.ctx.strokeStyle = '#ffde99';

    // left
    bmdLeft.ctx.beginPath();
    bmdLeft.ctx.moveTo(transformX, transformY);

    openings.left.sort(this.openingSort).forEach(function (opening) {
      bmdLeft.ctx.lineTo(transformX, opening.start + transformY);
      bmdLeft.ctx.stroke();
      bmdLeft.ctx.beginPath();
      bmdLeft.ctx.moveTo(transformX, opening.end + transformY);
    });

    bmdLeft.ctx.lineTo(transformX, height + transformY);
    bmdLeft.ctx.stroke();

    this.left = this.game.add.sprite(0, 0, bmdLeft);
    this.right = this.game.add.sprite(width - lineWidth/2, 0, bmdLeft);

    // top
    const bmdTop = this.game.add.bitmapData(width, lineWidth/2);
    bmdTop.ctx.lineWidth = lineWidth;
    bmdTop.ctx.shadowColor = '#dba863';
    bmdTop.ctx.shadowBlur = 10;
    bmdTop.ctx.strokeStyle = '#ffde99';
    bmdTop.ctx.beginPath();
    bmdTop.ctx.moveTo(transformX, transformY);

    openings.top.sort(this.openingSort).forEach(function (opening) {
      bmdTop.ctx.lineTo(opening.start + transformX, transformY);
      bmdTop.ctx.stroke();
      bmdTop.ctx.beginPath();
      bmdTop.ctx.moveTo(opening.end + transformX, transformY);
    });

    bmdTop.ctx.lineTo(width + transformX, transformY);
    bmdTop.ctx.stroke();
    this.top = this.game.add.sprite(0, 0, bmdTop);
    this.bottom = this.game.add.sprite(0, height - lineWidth/2, bmdTop);
  }

  openingSort (openingA, openingB) {
    return openingB.start - openingA.start;
  }

	render() {
		//this.game.debug.spriteBounds(this.ant);
		//this.game.debug.pointer( this.game.input.activePointer );
		this.game.debug.spriteBounds(this.right, "#AAAAAA", false);
	  this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
	}


}

export default GameState;
