import Row from './Row';
import Groove from './Groove';

enum STATUS {
  EMPTY = 'empty',
  BLACK = 'black',
  WHITE = 'white',
}

export default class Board {
  element: HTMLDivElement;
  numRows: number = 5;
  numCols: number = 5;
  numGrooves: number = this.numRows*this.numCols;
  rows: Row[];
  currentPlayer: STATUS = STATUS.WHITE;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('board');
    
    this.rows = Array.from({length: this.numRows}).map((_,index) => {
      return new Row(index, this.numCols, this);
    })
    this.element.append(...this.rows.map((row) => row.element));
  }

  placeStone (seatId: number) {
    let place: Groove = this.getSeatById(seatId);
    if (place.status !== STATUS.EMPTY) return;
    place.updatePiece(this.currentPlayer);
    if (this.checkWin(this.currentPlayer)) {
      console.log("Winner");
      return; // not a draw
    }
    
    if (!this.rows.some(
      (row) => row.grooves.some(
        (groove) => groove.status === STATUS.EMPTY
      )
    )) {
      console.log("Draw");
      return; // not the next player's turn
    };

    this.currentPlayer = 
      this.currentPlayer===STATUS.WHITE ? STATUS.BLACK : STATUS.WHITE;

  }

  getSeatById (id: number): Groove {
    const row = Math.floor(id/this.numCols);
    const col = id%this.numCols;
    return this.rows[row].grooves[col];
  }

  // Not optimised, brute force the whole board for whoever placed a piece
  checkWin (player: STATUS): boolean {
    let count: number = 0; // try to get the counter to 5
    let target: number = 5;
    // Check rows
    for (let row: number = 0; row < this.numRows; row++) {
      for (let i: number = 0; i < this.numCols; i++) {
        if (this.rows[row].grooves[i].status === player)
          count++;
        else 
          count = 0;
        if (count>=target) return true;
      }
      count = 0; // reset after each row
    }
    // Check columns
    for (let col: number = 0; col < this.numCols; col++) {
      for (let i: number = 0; i < this.numRows; i++) {
        if (this.rows[i].grooves[col].status === player)
          count++;
        else 
          count = 0;
        if (count>=target) return true;
      }
      count = 0; // reset after each column
    }
    // Check down-right diagonals
    // Working with two dimensions so logic is a little different
    // Start on the left edge, 5th from the bottom, go up the left edge
    // then along the top edge
    let row: number = this.numRows-target;
    let col: number = 0;
    while (col<=this.numCols-target) {
      for (let i: number = 0; col+i<this.numCols && row+i<this.numRows; i++) {
        if (this.rows[row+i].grooves[col+i].status === player)
          count++;
        else
          count = 0;
        if (count>=target) return true;
      }
      // Diagonal is checked, move to next diagonal
      if (row>0) {
        row--; // walk up left edge
      } else {
        col++; // row[0], walking along the top
      }
      count = 0;
    }

    // Check down left diagonals
    row = this.numRows-target;
    col = this.numCols-1;
    while (col>=target-1) {
      for (let i: number = 0; col-i >= 0 && row+i<this.numRows; i++) {
        if (this.rows[row+i].grooves[col-i].status === player)
          count++;
        else
          count = 0;
        if (count>=target) return true;
      }

      // Diagonal is checked, move to next diagonal
      if (row>0) {
        row--; // walk up right edge
      } else {
        col--; // row[0], walking along the top
      }
      count = 0;
    }
    return false;
  }
}