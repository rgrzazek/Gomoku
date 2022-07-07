import Board from "./Board";

enum STATUS {
  EMPTY = 'empty',
  BLACK = 'black',
  WHITE = 'white',
}

export default class Groove {
  element: HTMLDivElement;
  id: number;
  status: STATUS;
  boardRef: Board;

  constructor(id: number, boardRef: Board) {
    this.boardRef = boardRef;
    this.id = id;
    this.element = document.createElement('div');
    this.status = STATUS.EMPTY;
    this.element.classList.add('groove');
    this.element.classList.add(this.status.toLowerCase());

    this.element.addEventListener('click', () => {
      boardRef.placeStone(this);
    });

  }
  updatePiece(colour: STATUS) {
    this.element.classList.remove(this.status.toLowerCase())
    this.status = colour;
    this.element.classList.add(this.status.toLowerCase())
  }

}