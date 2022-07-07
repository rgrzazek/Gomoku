import Board from './Board';

type inputs = {
  rows: number,
  cols: number
}

function resetGame(): void {
  const input = validate();
  board.reset(input.rows, input.cols);
}

function validate(): inputs {
  let rows: number = parseInt((<HTMLInputElement>document.getElementById("rows"))?.value);
  let cols: number = parseInt((<HTMLInputElement>document.getElementById("cols"))?.value);

  if (rows<5) rows = 5;
  if (cols<5) cols = 5;  
  return {
    rows: rows, 
    cols: cols
  };
}

const board: Board = new Board();
document.getElementById("game")?.append(board.element);
document.getElementById("resetButton")?.addEventListener("click", resetGame);
