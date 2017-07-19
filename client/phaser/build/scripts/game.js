(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.convertToNumberColor = convertToNumberColor;
var CellWidth = exports.CellWidth = 50;
var ElapsedTime = exports.ElapsedTime = 500;
var SizeTerrain = exports.SizeTerrain = 51;
var AntsColor = exports.AntsColor = ["brown", "red", "yellow", "grey"];

function convertToNumberColor(color) {
	if (!AntsColor.includes(color)) {
		return 0;
	}
	return AntsColor.indexOf(color);
}

var WidthCanvas = exports.WidthCanvas = 800;
var HeighCanvas = exports.HeighCanvas = 600;

},{}],2:[function(require,module,exports){
'use strict';

var _GameState = require('./states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _constants = require('./constants');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _constants.WidthCanvas, _constants.HeighCanvas, Phaser.AUTO, 'content', null));

		_this.state.add('GameState', _GameState2.default, false);
		_this.state.start('GameState');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"./constants":1,"./states/GameState":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _constants = require("../constants");

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Tilt = 90;

var Ant = function (_Phaser$Sprite) {
  _inherits(Ant, _Phaser$Sprite);

  function Ant(game, x, y) {
    var antColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.AntsColor[0];

    _classCallCheck(this, Ant);

    var convertToColorFn = function convertToColorFn(number) {
      return (0, _constants.convertToNumberColor)(antColor) * 3 + number;
    };

    var _this = _possibleConstructorReturn(this, (Ant.__proto__ || Object.getPrototypeOf(Ant)).call(this, game, x, y, "ant", convertToColorFn(0)));

    _this.antRotation = 90;

    var downArray = [0, 1, 2].map(convertToColorFn);
    var leftArray = [12, 13, 14].map(convertToColorFn);
    var rightArray = [24, 25, 26].map(convertToColorFn);
    var upArray = [36, 37, 38].map(convertToColorFn);

    _this.animations.add('down', downArray, 10, true);
    _this.animations.add('left', leftArray, 10, true);
    _this.animations.add('right', rightArray, 10, true);
    _this.animations.add('up', upArray, 10, true);

    _this.game = game;
    return _this;
  }

  _createClass(Ant, [{
    key: "rotate",
    value: function rotate(direction) {
      var newRotation = direction > 0 ? this.antRotation + Tilt : this.antRotation - Tilt;
      this.antRotation = (0, _utils.mod)(newRotation, 360);
    }
  }, {
    key: "goTo",
    value: function goTo(xPos, yPos) {
      this.animations.stop("down");
      this.animations.stop("up");
      this.animations.stop("left");
      this.animations.stop("right");
      this.x = xPos;
      this.y = yPos;
    }
  }, {
    key: "updateAnt",
    value: function updateAnt(cell) {
      if (cell.isChecked()) {
        this.rotate(1);
      } else {
        this.rotate(-1);
      }
      switch (this.antRotation) {
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
  }, {
    key: "goDown",
    value: function goDown() {
      var position = this.y + _constants.CellWidth;
      this.game.add.tween(this).to({ y: position }, window.ElapsedTime || _constants.ElapsedTime, Phaser.Easing.Linear.None, true);
      this.animations.play("down", 45, true);
      this.animations.stop("up");
      this.animations.stop("left");
      this.animations.stop("right");
    }
  }, {
    key: "goUp",
    value: function goUp() {
      var position = this.y - _constants.CellWidth;
      this.game.add.tween(this).to({ y: position }, window.ElapsedTime || _constants.ElapsedTime, Phaser.Easing.Linear.None, true);
      this.animations.play("up", 45, true);
      this.animations.stop("down");
      this.animations.stop("left");
      this.animations.stop("right");
    }
  }, {
    key: "turnLeft",
    value: function turnLeft() {
      var position = this.x - _constants.CellWidth;
      this.game.add.tween(this).to({ x: position }, window.ElapsedTime || _constants.ElapsedTime, Phaser.Easing.Linear.None, true);
      this.animations.play("left", 45, true);
      this.animations.stop("down");
      this.animations.stop("up");
      this.animations.stop("right");
    }
  }, {
    key: "turnRight",
    value: function turnRight() {
      var position = this.x + _constants.CellWidth;
      this.game.add.tween(this).to({ x: position }, window.ElapsedTime || _constants.ElapsedTime, Phaser.Easing.Linear.None, true);
      this.animations.play("right", 45, true);
      this.animations.stop("down");
      this.animations.stop("left");
      this.animations.stop("up");
    }
  }]);

  return Ant;
}(Phaser.Sprite);

exports.default = Ant;

},{"../constants":1,"../utils":8}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GreyColor = 0xCAC8C8;
var WhiteColor = 0xFFFFFFF;

var Cell = function (_Phaser$Graphics) {
  _inherits(Cell, _Phaser$Graphics);

  function Cell(game, x, y, width, height) {
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0xFFFFFFF;
    var lineColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0x000000;

    _classCallCheck(this, Cell);

    var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, game, 0, 0));

    _this.beginFill(color);
    _this.lineStyle(2, lineColor, 1);
    _this.drawRect(x, y, width, height);
    _this.checked = false;
    _this.realPosition = { x: x, y: y };
    _this.lineColor = lineColor;
    _this.color = color;
    return _this;
  }

  _createClass(Cell, [{
    key: "toggle",
    value: function toggle() {
      this.checked = !this.checked;
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var newColor = this.checked ? GreyColor : WhiteColor;
      this.beginFill(newColor);
      this.lineStyle(2, this.lineColor, 1);
      this.drawRect(this.realPosition.x, this.realPosition.y, this.width, this.height);
    }
  }, {
    key: "isChecked",
    value: function isChecked() {
      return this.checked;
    }
  }]);

  return Cell;
}(Phaser.Graphics);

exports.default = Cell;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _Cell = require("../objects/Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _constants = require("../constants");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Grid = function (_Phaser$Group) {
	_inherits(Grid, _Phaser$Group);

	function Grid(game, nbRow, nbColumn, cellSize) {
		var xOrigin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
		var yOrigin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
		var cellColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0xFFFFFFF;
		var gridColor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0x000000;

		_classCallCheck(this, Grid);

		var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, game));

		_this.nbRow = nbRow;
		_this.nbColumn = nbColumn;
		for (var y = 0; y < nbColumn; ++y) {
			for (var x = 0; x < nbRow; ++x) {
				_this.add(new _Cell2.default(game, x * cellSize + xOrigin, y * cellSize + yOrigin, cellSize, cellSize, cellColor, gridColor));
			}
		}
		return _this;
	}

	_createClass(Grid, [{
		key: "getCell",
		value: function getCell(rowIndex, columnIndex) {
			if (rowIndex > this.nbRow || columnIndex > this.nbColumn) {
				console.error("Grid::getCell out of border");
				return null;
			}
			var index = rowIndex + columnIndex * this.nbColumn;
			return this.getAt(index);
		}
	}, {
		key: "getCellAtPosition",
		value: function getCellAtPosition(x, y) {
			var indexX = Math.trunc(x / _constants.CellWidth);
			var indexY = Math.trunc(y / _constants.CellWidth);
			return this.getCell(indexX, indexY);
		}
	}, {
		key: "setStates",
		value: function setStates(arrayState) {
			var _this2 = this;

			arrayState.forEach(function (value, index) {
				_this2.children[index].checked = value;
				_this2.children[index].draw();
			});
		}
	}, {
		key: "getCellsArray",
		value: function getCellsArray() {
			return this.children.map(function (cell) {
				return cell.checked;
			});
		}
	}]);

	return Grid;
}(Phaser.Group);

exports.default = Grid;

},{"../constants":1,"../objects/Cell":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

//only work for one ant
var History = function () {
  function History() {
    _classCallCheck(this, History);

    this.record = [];
    this.isRecording = false;
  }

  _createClass(History, [{
    key: "start",
    value: function start() {
      this.isRecording = true;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.record = [];
      this.isRecording = false;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isRecording = false;
    }
  }, {
    key: "recordStep",
    value: function recordStep(step, ant, gridArray) {
      var x = ant.x,
          y = ant.y;

      if (this.isRecording) {
        this.record[step] = { x: x, y: y, grid: gridArray };
      }
    }
  }, {
    key: "getTo",
    value: function getTo(step) {
      if (!this.record[step]) {
        return null;
      }
      return this.record[step];
    }
  }]);

  return History;
}();

exports.default = History;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _Grid = require('../objects/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Ant = require('../objects/Ant');

var _Ant2 = _interopRequireDefault(_Ant);

var _History = require('../objects/History');

var _History2 = _interopRequireDefault(_History);

var _constants = require('../constants');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CameraVelocity = 10;
var Bounds = _constants.CellWidth * _constants.SizeTerrain;

var GameState = function (_Phaser$State) {
	_inherits(GameState, _Phaser$State);

	function GameState() {
		_classCallCheck(this, GameState);

		return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
	}

	_createClass(GameState, [{
		key: 'create',
		value: function create() {
			this.game.world.setBounds(0, 0, Bounds, Bounds);
			this.gridLayout = new _Grid2.default(this.game, Bounds / _constants.CellWidth, Bounds / _constants.CellWidth, _constants.CellWidth);
			this.cursors = this.game.input.keyboard.createCursorKeys();

			this.ant = new _Ant2.default(this.game, 0, 0, "red");
			this.game.add.existing(this.ant);

			this.textStep = this.game.add.text(this.game.world.width * 0.01, this.game.world.height * 0.01, "Steps: ", { font: "18px Arial", fill: "#0000FF", align: "center" });
			this.textStep.fixedToCamera = true;
			this.setAntCenter();

			this.steps = 0;
			this.timer = this.game.time.create(false);
			this.timer.add(window.ElapsedTime || _constants.ElapsedTime, this.updatePosition, this);
			this.timer.start();

			this.game.time.advancedTiming = true;

			this.replay = new _History2.default();
			this.replay.start();
			this.replay.recordStep(this.steps, this.ant, this.gridLayout.getCellsArray());

			this.initCamera();
		}
	}, {
		key: 'initCamera',
		value: function initCamera() {
			this.game.camera.x = this.game.world.width / 2 - _constants.WidthCanvas / 2;
			this.game.camera.y = this.game.world.height / 2 - _constants.HeighCanvas / 2;
		}
	}, {
		key: 'setAntCenter',
		value: function setAntCenter() {
			var indexX = Math.trunc(Bounds / _constants.CellWidth / 2);
			var indexY = Math.trunc(Bounds / _constants.CellWidth / 2);
			this.setAntOnCell(indexX, indexY);
		}
	}, {
		key: 'setAntOnCell',
		value: function setAntOnCell(indexX, indexY) {
			var cell = this.gridLayout.getCell(indexX, indexY);
			this.ant.x = cell.realPosition.x + _constants.CellWidth / 2 - this.ant.width / 2;
			this.ant.y = cell.realPosition.y + _constants.CellWidth / 2 - this.ant.height / 2;
		}
	}, {
		key: 'preload',
		value: function preload() {
			this.game.stage.disableVisibilityChange = true;
			this.game.load.spritesheet('ant', 'res/ants.png', 32, 32);
		}
	}, {
		key: 'updatePosition',
		value: function updatePosition() {
			var cell = this.gridLayout.getCellAtPosition(this.ant.x, this.ant.y);
			this.ant.updateAnt(cell);
			cell.toggle();
			this.steps += 1;
			this.textStep.text = "Steps :" + this.steps;
			this.timer.add(window.ElapsedTime || _constants.ElapsedTime, this.updatePosition, this);
			this.replay.recordStep(this.steps, this.ant, this.gridLayout.getCellsArray());
		}
	}, {
		key: 'setSimulationTo',
		value: function setSimulationTo(step) {
			var simulationData = this.replay.getTo(step);
			this.gridLayout.setStates(simulationData.grid);
			this.ant.goTo(simulationData.x, simulationData.y);
			this.steps = step;
		}
	}, {
		key: 'update',
		value: function update() {

			if (this.cursors.up.isDown) {
				this.game.camera.y -= CameraVelocity;
			} else if (this.cursors.down.isDown) {
				this.game.camera.y += CameraVelocity;
			}

			if (this.cursors.left.isDown) {
				this.game.camera.x -= CameraVelocity;
			} else if (this.cursors.right.isDown) {
				this.game.camera.x += CameraVelocity;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			//this.game.debug.spriteBounds(this.ant);
			this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
		}
	}]);

	return GameState;
}(Phaser.State);

exports.default = GameState;

},{"../constants":1,"../objects/Ant":3,"../objects/Grid":5,"../objects/History":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mod = mod;
function mod(a, b) {
    return (a % b + b) % b;
}

},{}]},{},[2])
//# sourceMappingURL=game.js.map
