import Row from './Row';
import Groove from './Groove';

enum STATUS {
  EMPTY = 'empty',
  BLACK = 'black',
  WHITE = 'white',
}

export default class Board {
  element: HTMLDivElement;
  numRows: number = 15;
  numCols: number = 15;
  numGrooves: number = this.numRows*this.numCols;
  rows: Row[] = [];
  currentPlayer: STATUS = STATUS.WHITE;
  gameOver: boolean = false;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('board');
    this.reset(this.numRows, this.numCols)    
  }

  reset (rows: number, cols: number) {
    this.element.innerHTML="";
    this.numRows = rows;
    this.numCols = cols;
    this.rows = Array.from({length: this.numRows}).map((_,index) => 
      new Row(index, this.numCols, this)
    );
    this.element.append(...this.rows.map((row) => row.element));
    this.gameOver = false;
    this.message();
  }

  placeStone (place: Groove) {
    if (this.gameOver || place.status !== STATUS.EMPTY) return;

    place.updatePiece(this.currentPlayer);
    if (this.checkWin(this.currentPlayer)) {
      this.message("Game over. "+this.currentPlayer+" wins.");
        this.gameOver = true;
      return;
    }
    
    if (!this.rows.some(
      (row) => row.grooves.some(
        (groove) => groove.status === STATUS.EMPTY
      )
    )) {
      this.message("This is a draw");
      this.gameOver = true;
      return; // not the next player's turn
    };

    this.currentPlayer = 
      this.currentPlayer===STATUS.WHITE ? STATUS.BLACK : STATUS.WHITE;
    this.message();
  }

  message (text: string = "Next move: " + this.currentPlayer) {
    const el = document.getElementById("messages");
    if (!el) return;
    // Print the message given as parameter or default message of who's next
    el.innerHTML = text;
  }

  /** 
   * Check whether a player has won the game.
   * Brute force the whole board for whoever placed a piece
   * @param player The player that we are checking for a win
   *
   */
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
    // Check all diagonals in a down-right direction
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
      // Line is checked, move to next diagonal
      if (row>0) {
        row--; // walk up left edge
      } else {
        col++; // row[0], walk along the top
      }
      count = 0; // reset after each line
    }

    // Check all diagonals in a down-left direction
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
      // Line is checked, move to next diagonal
      if (row>0) {
        row--; // walk up right edge
      } else {
        col--; // row[0], walk along the top
      }
      count = 0;// reset after each line
    }
    // default: not a win
    return false;
  }
}