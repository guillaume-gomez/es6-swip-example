import { CellWidth, ElapsedTime, SizeTerrain, WidthCanvas, HeighCanvas, initialStateMock } from '../constants';

const CameraVelocity = 10;
const Bounds = WidthCanvas;//CellWidth * SizeTerrain;

class GameState extends Phaser.State {

  initSwip(game) {
    return (client) => {
      let converter = client.converter;
      let stage = client.stage;
      let ctx = stage.getContext('2d');
      const transform = {x: 0, y: 0};

      const hole = { x: 200, y: 200, radius: 15 };
      let state = {client: initialStateMock};
      let dragPosition = null;
      let dragging = false;

      game.drawHole(hole, converter, transform);
      client.onClick((evt) => {
        var hole = { x: evt.position.x, y: evt.position.y };
        client.emit('setHole', hole);
      });

      const myFn = (game) => {
        return (evt) => {
          state = evt;
          const client = state.client;
          const { ball, hole } = state.cluster.data;
          // if(game.holeSprite.position.x !== game.toDevicePixel(converter,hole.x)) {
          //   alert(game.toDevicePixel(converter,hole.x), game.toDevicePixel(converter,hole.y));
          // }
          //console.log(game.toDevicePixel(converter,hole.x), game.toDevicePixel(converter,hole.y));
          game.holeSprite.position.setTo(game.toDevicePixel(converter,hole.x), game.toDevicePixel(converter,hole.y));
        };
      }

      client.onUpdate(myFn(game));
    }
  }

  init() {
    this.socket = io.connect();
    swip.init({ socket: this.socket, container: document.getElementsByTagName("canvas")[0], type: "custom" }, this.initSwip(this));
  }

  create() {
    this.game.world.setBounds(0, 0, WidthCanvas, HeighCanvas);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.stage.backgroundColor = '#80d735';
      //this.initCamera();
      this.ball =  { x: 50, y: 50, radius: 10, speedX: 0, speedY: 0 };
      this.hole = { x: 200, y: 200, radius: 15 };
      this.client = initialStateMock;
      this.drawBall(this.ball);
      this.drawWalls(this.client);

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

  applyTransform (ctx, converter, transform) {
    ctx.translate(- this.toDevicePixel(converter, transform.x), -this.toDevicePixel(converter, transform.y));
    ctx.scale(this.toDevicePixel(converter, 1), this.toDevicePixel(converter, 1));

  }

  toDevicePixel (converter, value) {
    return value / converter.scalingFactor;
  }

  drawHole (hole, converter, transform) {
    const bmd = this.game.add.bitmapData(300, 300);
    this.applyTransform(bmd.ctx, converter, transform)
    bmd.ctx.fillStyle = 'black';
    bmd.ctx.strokeStyle = '#4b7f1f';
    bmd.ctx.lineWidth = 2;

    bmd.ctx.beginPath();
    bmd.ctx.arc(hole.radius, hole.radius, hole.radius, 0, 2 * Math.PI);
    bmd.ctx.fill();
    bmd.ctx.stroke();

    this.holeSprite = this.game.add.sprite(hole.x, hole.y, bmd);
  }

  drawLeft(openings, transformX, transformY, width, height, lineWidth = 40) {
    const bmdLeft = this.game.add.bitmapData(lineWidth/2, height);
    bmdLeft.ctx.lineWidth = lineWidth;
    bmdLeft.ctx.shadowColor = '#dba863';
    bmdLeft.ctx.shadowBlur = 10;
    bmdLeft.ctx.strokeStyle = '#ffde99';

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
  }

  drawRight(openings, transformX, transformY, width, height, lineWidth = 40) {
    const bmdRight = this.game.add.bitmapData(lineWidth/2, height);
    bmdRight.ctx.lineWidth = lineWidth;
    bmdRight.ctx.shadowColor = '#dba863';
    bmdRight.ctx.shadowBlur = 10;
    bmdRight.ctx.strokeStyle = '#ffde99';

    bmdRight.ctx.beginPath();
    bmdRight.ctx.moveTo(transformX, transformY);

    openings.right.sort(this.openingSort).forEach(function (opening) {
      bmdRight.ctx.lineTo(transformX, opening.start + transformY);
      bmdRight.ctx.stroke();
      bmdRight.ctx.beginPath();
      bmdRight.ctx.moveTo(transformX, opening.end + transformY);
    });

    bmdRight.ctx.lineTo(transformX, height + transformY);
    bmdRight.ctx.stroke();
    this.right = this.game.add.sprite(width - lineWidth/2, 0, bmdRight);
  }

  drawTop(openings, transformX, transformY, width, height, lineWidth = 40) {
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
  }

  drawBottom(openings, transformX, transformY, width, height, lineWidth = 40) {
    const bmdBottom = this.game.add.bitmapData(width, lineWidth/2);
    bmdBottom.ctx.lineWidth = lineWidth;
    bmdBottom.ctx.shadowColor = '#dba863';
    bmdBottom.ctx.shadowBlur = 10;
    bmdBottom.ctx.strokeStyle = '#ffde99';
    bmdBottom.ctx.beginPath();
    bmdBottom.ctx.moveTo(transformX, transformY);

    openings.bottom.sort(this.openingSort).forEach(function (opening) {
      bmdBottom.ctx.lineTo(opening.start + transformX, transformY);
      bmdBottom.ctx.stroke();
      bmdBottom.ctx.beginPath();
      bmdBottom.ctx.moveTo(opening.end + transformX, transformY);
    });

    bmdBottom.ctx.lineTo(width + transformX, transformY);
    bmdBottom.ctx.stroke();
    this.top = this.game.add.sprite(0, height - lineWidth/2, bmdBottom);
  }

  drawWalls (client) {
    //TODO openings
    const openings = client.openings;
    const transformX = client.transform.x;
    const transformY = client.transform.y;
    const width = client.size.width;
    const height = client.size.height;

    const lineWidth = 40
    this.drawLeft(openings, transformX, transformY, width, height, lineWidth);
    this.drawRight(openings, transformX, transformY, width, height, lineWidth);
    this.drawTop(openings, transformX, transformY, width, height, lineWidth);
    this.drawBottom(openings, transformX, transformY, width, height, lineWidth);
  }

  openingSort (openingA, openingB) {
    return openingB.start - openingA.start;
  }

  render() {
    //this.game.debug.pointer( this.game.input.activePointer );
    //this.game.debug.spriteBounds(this.right, "#AAAAAA", false);
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
  }


}

export default GameState;
