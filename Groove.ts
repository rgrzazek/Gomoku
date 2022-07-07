enum STATUS {
  EMPTY = 'empty',
  BLACK = 'black',
  WHITE = 'white',
}

export default class Groove {
  element: HTMLDivElement;
  id: number;
  status: STATUS;

  constructor(id: number) {
    this.id = id;
    this.element = document.createElement('div');
    this.status = STATUS.EMPTY;
    this.element.classList.add('groove');
    this.element.classList.add(this.status.toLowerCase());

    this.element.addEventListener('click', () => {
      this.handleClick()
    });

  }
  handleClick() {
    this.element.classList.remove(this.status.toLowerCase())
    switch(this.status) {
      case STATUS.EMPTY: this.status = STATUS.WHITE;break;
      case STATUS.WHITE: this.status = STATUS.BLACK;break;
      case STATUS.BLACK: this.status = STATUS.EMPTY;break;
    }
    this.element.classList.add(this.status.toLowerCase())
  }

}