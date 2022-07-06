enum STATUS {
  EMPTY = 'empty',
  BLACK = 'black',
  WHITE = 'white',
}

class Groove {
  element: HTMLDivElement;
  id: number;
  colour: STATUS;

  constructor(id: number) {
    this.id = id;
    this.element = document.createElement('div');
    this.colour = STATUS.EMPTY;
    this.element.classList.add('groove');
    this.element.classList.add(this.colour.toLowerCase());

    this.element.addEventListener('click', () => {
      this.handleClick()
    });

  }
  handleClick() {
    this.element.classList.remove(this.colour.toLowerCase())
    switch(this.colour) {
      case STATUS.EMPTY: this.colour = STATUS.WHITE;break;
      case STATUS.WHITE: this.colour = STATUS.BLACK;break;
      case STATUS.BLACK: this.colour = STATUS.EMPTY;break;
    }
    this.element.classList.add(this.colour.toLowerCase())
  }

}

class Row {
  element: HTMLDivElement;
  id: number;
  rowLength: number;
  grooves: Groove[];

  constructor(id: number, rowLength: number) {
    this.id = id;
    this.rowLength = rowLength;
    this.element = document.createElement('div');
    this.element.classList.add('row');
    this.grooves = Array.from({length: rowLength}).map((_,index) => {
      const grooveId = rowLength*id + index;
      return new Groove(grooveId);
    })

    console.log("Row constructor called.");
    this.element.append(...this.grooves.map((groove) => groove.element));
  }
}

class Board {
  element: HTMLDivElement;
  rows: Row[];

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('board');

    this.rows = Array.from({length: 10}).map((_,index) => {
      return new Row(index, 10);
    })
    this.element.append(...this.rows.map((row) => row.element));



  }

}
document
.getElementById('game')?.append(new Board().element);

