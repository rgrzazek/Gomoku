import Groove from './Groove';


export default class Row {
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