import Cell from '../objects/Cell';
import { CellWidth } from "../constants"

class Grid extends Phaser.Group {

	constructor(game, nbRow, nbColumn, cellSize, xOrigin = 0, yOrigin = 0, cellColor = 0xFFFFFFF, gridColor = 0x000000) {
		super(game);
		this.nbRow = nbRow;
		this.nbColumn = nbColumn;
		for(let y = 0; y < nbColumn; ++y) {
			for(let x = 0; x < nbRow; ++x) {
				this.add( new Cell(game, x * cellSize + xOrigin, y * cellSize + yOrigin, cellSize, cellSize, cellColor, gridColor) );
			}
		}
	}

	getCell(rowIndex, columnIndex) {
		if(rowIndex > this.nbRow || columnIndex > this.nbColumn) {
			console.error("Grid::getCell out of border");
			return null;
		}
		const index = rowIndex + columnIndex * this.nbColumn;
		return this.getAt( index );
	}

	getCellAtPosition(x, y) {
		const indexX = Math.trunc( x / CellWidth );
		const indexY = Math.trunc( y / CellWidth );
		return this.getCell( indexX, indexY );
		
	}

  setStates(arrayState) {
    arrayState.forEach((value, index) => {
      this.children[index].checked = value;
      this.children[index].draw(); 
    });
  }

	getCellsArray() {
		return this.children.map(cell => {
			return cell.checked;
		});
	}

}

export default Grid;