import Row from './Row';



export default class Board {
  element: HTMLDivElement;
  numRows: number = 15;
  numCols: number = 30;
  rows: Row[];

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('board');
    
    this.rows = Array.from({length: this.numRows}).map((_,index) => {
      return new Row(index, this.numCols);
    })
    this.element.append(...this.rows.map((row) => row.element));
  }

  getStatusBySeatId (id: number) {
    const row = Math.floor(id/length);
    const col = id%length;
    return this.rows[row].grooves[col].status;
  }

  checkWin () {
    for (let i: number = 0; i < this.numRows; i++) {

    }
  }
}